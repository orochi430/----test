<template>
<div 
  class="tree-node" 
  v-show="node.visible" 
  :class="{ 'is-hidden': !node.visible, 'is-expanded': expanded }" 
  role="treeitem" 
  tabindex="-1" 
  @click.stop="handleClick" @contextmenu="($event) => this.handleContextMenu($event)"
  :aria-expanded="expanded"
  :aria-disabled="node.disabled"
  :aria-checked="node.checked"
>
  <div class="tree-node_content" :style="{ 'padding-left': (node.level - 1) * 0.3 + 'rem' }">
    <van-checkbox 
      v-show="showCheckbox && !node.disabled"
      v-model="node.checked"
      :disabled="!!node.disabled"
      @click.native.stop
      @change="handleCheckChange(null, node)"
    >
    </van-checkbox>
    <node-content :node="node" ></node-content>
    <span class="isShowChiled" @click.stop="handleExpandIconClick" v-if="!node.isLeaf">
        <span class="r_line"></span>
        <span class="r_span">{{ expanded ? "收起" : "展开" }}</span>
        <van-icon :name="expanded ? 'arrow-up' : 'arrow-down'" />
    </span>
  </div>
  <transition name="fade">
    <div 
      class="tree-node__children"
      v-if="!renderAfterExpand || childNodeRendered"
      v-show="expanded"
      role="group"
    >
      <!-- <div>全选下级</div> -->
      <tree-node
        v-for="child in node.childNodes"
        :key="getNodeKey(child)"
        :node="child"
        :props="props"
        :show-checkbox="showCheckbox"
        :render-after-expand="renderAfterExpand"
        @node-expand="handleChildNodeExpand"
      >
      </tree-node>
    </div>
  </transition>
</div>
</template>

<script>
import { getNodeKey, findNearestComponent } from './model/util'
export default {
  name: 'treeNode',
  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;
        const { data, store } = node;
        return (
          parent.renderContent
            ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store })
            : tree.$scopedSlots.default
              ? tree.$scopedSlots.default({ node, data })
              : <span class="tree-node__label">{ node.label }</span>
        );
      }
    }
  },
  props: {
      node: {
        default() {
          return {};
        }
      },
      props: {},
      renderContent: Function,
      renderAfterExpand: {
        type: Boolean,
        default: true
      },
      showCheckbox: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        tree: null,
        expanded: false,
        childNodeRendered: false,
        oldChecked: null,
        oldIndeterminate: null
      };
    },

    watch: {
      'node.indeterminate'(val) {
        this.handleSelectChange(this.node.checked, val);
      },

      'node.checked'(val) {
        this.handleSelectChange(val, this.node.indeterminate);
      },

      'node.expanded'(val) {
        this.$nextTick(() => this.expanded = val);
        if (val) {
          this.childNodeRendered = true;
        }
      }
    },

    methods: {
      getNodeKey(node) {
        return getNodeKey(this.tree.nodeKey, node.data);
      },

      handleSelectChange(checked, indeterminate) {
        if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
          this.tree.$emit('check-change', this.node.data, checked, indeterminate);
        }
        this.oldChecked = checked;
        this.indeterminate = indeterminate;
      },

      handleClick() {
        const store = this.tree.store;
        store.setCurrentNode(this.node);
        this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
        this.tree.currentNode = this;
        if (this.tree.expandOnClickNode) {
          this.handleExpandIconClick();
        }
        if (this.tree.checkOnClickNode && !this.node.disabled) {
          this.handleCheckChange(null, {
            checked: !this.node.checked 
          });
        }
        this.tree.$emit('node-click', this.node.data, this.node, this);
        console.log(this.node)
      },

      handleContextMenu(event) {
        if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
          event.stopPropagation();
          event.preventDefault();
        }
        this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
      },

      handleExpandIconClick() {
        if (this.node.isLeaf) return;
        if (this.expanded) {
          this.tree.$emit('node-collapse', this.node.data, this.node, this);
          this.node.collapse();
        } else {
          this.node.expand();
          this.$emit('node-expand', this.node.data, this.node, this);
        }
      },

      handleCheckChange(value, ev) {
        this.node.setChecked(ev.checked, !this.tree.checkStrictly);
        // else this.node.setChecked(value, !this.tree.checkStrictly);
        this.$nextTick(() => {
          const store = this.tree.store;
          this.tree.$emit('check', this.node.data, {
            checkedNodes: store.getCheckedNodes(),
            checkedKeys: store.getCheckedKeys(),
            halfCheckedNodes: store.getHalfCheckedNodes(),
            halfCheckedKeys: store.getHalfCheckedKeys(),
          });
        });
      },

      handleChildNodeExpand(nodeData, node, instance) {
        this.broadcast('treeNode', 'tree-node-expand', node);
        this.tree.$emit('node-expand', nodeData, node, instance);
      },

      broadcast(componentName, eventName, params) {
          function broadcast(componentName, eventName, params) {
            this.$children.forEach(child => {
              var name = child.$options.componentName;

              if (name === componentName) {
                child.$emit.apply(child, [eventName].concat(params));
              } else {
                broadcast.apply(child, [componentName, eventName].concat([params]));
              }
            });
          }
          broadcast.call(this, componentName, eventName, params);
      }
    },

    created() {
      const parent = this.$parent;

      if (parent.isTree) {
        this.tree = parent;
      } else {
        this.tree = parent.tree;
      }

      const tree = this.tree;
      if (!tree) {
        console.warn('Can not find node\'s tree.');
      }

      const props = tree.props || {};
      const childrenKey = props['children'] || 'children';

      this.$watch(`node.data.${childrenKey}`, () => {
        this.node.updateChildren();
      });

      if (this.node.expanded) {
        this.expanded = true;
        this.childNodeRendered = true;
      }

      if(this.tree.accordion) {
        this.$on('tree-node-expand', node => {
          if(this.node !== node) {
            this.node.collapse();
          }
        });
      }
    }
}
</script>
<style lang='scss' scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.tree-node {
  background-color: #fff;
  .tree-node_content {
    display: flex;
    align-items: center;
    min-height: 44px;
    font-size: var(--font_size_2);
    border-bottom: 1px solid #ddd;
    .tree-node__label {
      flex: 1;
    }
    .isShowChiled {
        height: 100%;
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 43px;
        @include font-theme("normal");
        .r_line {
            width: 1px;
            @include background-theme('normal');
            display: inline-block;
            height: 22px;
            margin-top: 2px;
        }
        .r_span {
            line-height: 43px;
            margin: 0px 6px 0px 15px;
        }
    }
  }
}

</style>