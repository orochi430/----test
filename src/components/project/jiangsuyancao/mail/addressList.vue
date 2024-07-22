<template>
<div class="dsf-select-mail">
    <van-sticky>
      <van-nav-bar title="通讯录" left-arrow @click-left="$emit('update:show', false)">
        <template #left>
          <van-icon name="arrow-left" /><span>返回</span></template>
      </van-nav-bar>
      <van-search v-model="searchValue" placeholder="搜索" @click="onSearch" v-if="selectType == 0" show-action ref="search" @cancel="showSearch = false"/>
    </van-sticky>
		<div v-show="!showSearch" class="tabs">
			<van-tabs v-model="activeName" animated v-if="selectType == 0" sticky :offset-top="onSearch ? '1.96rem' : '0'">
				<van-tab title="单位" name="单位">
					<dsf-tree ref="tree1" lazy :load="loadNode1" :props="defaultProps" :showCheckbox="true" >
            <span class="custom-tree-node tree-node__label" slot-scope="{ node, data }" :style="{paddingLeft: data.EMAIL ? '' : '0.4rem'}">
              <van-icon v-if="data.isuser" name="user-circle-o" size="0.4rem" style="vertical-align: sub"/>
              <span>{{ node.label }}</span>
              <span v-if="data.isuser" style="color: #999;font-size: var(--font_size_4)">{{ data.EMAIL || '（暂无邮箱）' }}</span>
            </span>
          </dsf-tree>
				</van-tab>
        <van-tab title="全省" name="全省">
					<dsf-tree ref="tree2" lazy :load="loadNode2" :props="defaultProps" :showCheckbox="true" >
            <span class="custom-tree-node tree-node__label" slot-scope="{ node, data }" :style="{paddingLeft: data.EMAIL ? '' : '0.4rem'}">
              <van-icon v-if="data.isuser" name="user-circle-o" size="0.4rem" style="vertical-align: sub"/>
              <span>{{ node.label }}</span>
              <span v-if="data.isuser" style="color: #999;font-size: var(--font_size_4)">{{ data.EMAIL || '（暂无邮箱）' }}</span>
            </span>
          </dsf-tree>
				</van-tab>
        <van-tab title="条线" name="条线">
					<dsf-tree ref="tree3" lazy :load="loadNode3" :props="defaultProps" :showCheckbox="true">
            <span class="custom-tree-node tree-node__label" slot-scope="{ node, data }" :style="{paddingLeft: data.EMAIL ? '' : '0.4rem'}">
              <van-icon v-if="data.isuser" name="user-circle-o" size="0.4rem" style="vertical-align: sub"/>
              <span>{{ node.label }}</span>
              <span v-if="data.isuser" style="color: #999;font-size: var(--font_size_4)">{{ data.EMAIL || '（暂无邮箱）' }}</span>
            </span>
          </dsf-tree>
				</van-tab>
			</van-tabs>
		</div>
		<div v-show="showSearch" style="margin: 0.12rem 0.32rem">
			<dsf-tree ref="searchTree" :data="searchTree" :props="searchProps" :showCheckbox="true" >
        <span class="custom-tree-node tree-node__label" slot-scope="{ node, data }" :style="{paddingLeft: data.EMAIL ? '' : '0.4rem'}">
          <van-icon name="user-circle-o" size="0.4rem" style="vertical-align: sub"/>
          <span>{{ node.label }}</span>
          <span style="color: #999;font-size: var(--font_size_4)">{{ data.EMAIL || '（暂无邮箱）' }}</span>
        </span>
      </dsf-tree>
		</div>
		<div style="height: 1.2rem">
      <div class="footer">
        <van-button class="btn" type="info" @click="selectArr" >确认</van-button>
      </div>
    </div>
	</div>
</template>

<script>
import dsfTree from '@/components/dsfTree/tree'
export default {
  components: { dsfTree },
  props: {
    show: Boolean
  },
  data() {
    return {
      activeName: '部门',
      showSearch: false,
      searchValue: '',
      selectType: 0,
      defaultProps: {
        children: 'CHILDREN',
        label: 'TITLE',
        isLeaf: 'isuser'
      },
      searchProps: {
        children: 'CHILDREN',
        label: 'TITLE'
      },
      navBarSticky: false,
      tabsOffsetTop: 0,
      searchTree: []
    }
  },
  watch: {
    searchValue(newVal) {
        if (newVal) this.onSearch(newVal);
        else this.searchTree = [];
    },
  },
  methods: {
    loadNode1(node, resolve) {
      this.loadNode(node, resolve, 1)
    },
    loadNode2(node, resolve) {
      this.loadNode(node, resolve, 2)
    },
    loadNode3(node, resolve) {
      this.loadNode(node, resolve, 3)
    },
    loadNode(node, resolve, type) {
      if (node.level === 0) {
        dsf.http.post('/fn/contacts/contactList',{
          type: type
        }).then(res => {
          if(res.data.code == 200) {
            res.data.data.forEach(item => {
              item.disabled = true
            })
            return resolve(res.data.data);
          } else {
            return resolve([]);
          }
        })
      }
      if (node.level == 1) {
        if(node.data.CHILDREN) {
          node.data.CHILDREN.forEach(item => {
            item.disabled = true
          })
          resolve(node.data.CHILDREN)
        } else {
          return resolve([]);
        }
      }
      if (node.level > 1) {
        // resolve(node.data.CHILDREN)
        dsf.http.post('/fn/contacts/findUserAndDept',{
          type: type,
          id: node.data.ID,
          isUnit: node.data.IS_UNIT,
        }).then(res => {
          if(res.data.code == 200) {
            res.data.data.USER.forEach(item => {
              item.isuser = true
              if (!item.EMAIL) {
                item.disabled = true
              }
            })
            res.data.data.DEPT.forEach(item => {
              item.disabled = true
            })
            return resolve(res.data.data.USER.concat(res.data.data.DEPT));
          } else {
            return resolve([]);
          }
        }).catch(e => {
          return resolve([]);
        })
      }
    },
    selectArr() {
      let array1 = this.$refs.tree1 ? this.$refs.tree1.getCheckedNodes() : []
      let array2 = this.$refs.tree2 ? this.$refs.tree2.getCheckedNodes() : []
      let array3 = this.$refs.tree3 ? this.$refs.tree3.getCheckedNodes() : []
      let searchArray = this.$refs.searchTree ? this.$refs.searchTree.getCheckedNodes() : []

      let array = Array.from(new Set([...array1, ...array2, ...array3, ...searchArray]))
      console.log(array)
      this.$emit('update:show', false)
      this.$emit('getArray', array)
    },
    onSearch() {
      this.showSearch = true;
      if(this.searchValue) {
        dsf.http.post('/fn/contacts/searchUser', {
          content: this.searchValue
        }).then(res => {
          if(res.data.code == 200) {
            this.searchTree = res.data.data
          }
        })
      }
    },
    back() {

    }
  }
}
</script>
<style lang='scss' scoped>
::v-deep .van-tabs__content {
  margin: 6px 16px;
}
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 12px;
    .btn{
      width: 100%;
    }
}
</style>
