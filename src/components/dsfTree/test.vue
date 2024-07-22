<template>
<div>
  <dsf-tree
    ref="tree"
    lazy
    :data="data"
    :load="loadNode"
    :props="defaultProps"
    :showCheckbox="true"
  >
    <span class="custom-tree-node tree-node__label" slot-scope="{ node, data }">
      <van-icon v-if="data.isuser" name="user-circle-o" size="0.4rem" style="vertical-align: sub"/>
      <span>{{ node.label }}</span>
    </span>
  </dsf-tree>
  <div @click="show">确认</div>
</div>
</template>

<script>
import dsfTree from '@/components/dsfTree/tree'
export default {
  components: { dsfTree },
  data() {
    return {
      data: [{
          label: '一级 1',
          disabled: true,
          children: [{
            label: '二级 1-1',
            disabled: true,
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'CHILDREN',
          label: 'TITLE',
          isLeaf: 'isuser'
        }
    }
  },
  created() {
    // dsf.http.post('/fn/contacts/contactList',{
    //   type: 1
    // }).then(res => {
    //   this.data = res.data.data
    // })
  },
  methods: {
    loadNode(node, resolve) {
        if (node.level === 0) {
          dsf.http.post('/fn/contacts/contactList',{
            type: 2
          }).then(res => {
            res.data.data.forEach(item => {
              // item.disabled = true
            })
            return resolve(res.data.data);
          })
        }
        if (node.level == 1) {
          // console.log(node)
          node.data.CHILDREN.forEach(item => {
              // item.disabled = true
            })
          resolve(node.data.CHILDREN)
        }
        if (node.level > 1) {
          // console.log(node)
          // resolve(node.data.CHILDREN)
          dsf.http.post('/fn/contacts/findUserAndDept',{
            type: 2,
            id: node.data.ID
          }).then(res => {
            res.data.data.USER.forEach(item => {
              item.isuser = true
            })
            res.data.data.DEPT.forEach(item => {
              item.disabled = true
            })
            return resolve(res.data.data.USER.concat(res.data.data.DEPT));
          })
        }
      },
      show() {
        console.log(this.$refs.tree.getCheckedNodes())
      }
  }
}
</script>
<style lang='scss' scoped>
</style>