<template>
<div class="dsf-tree">
    <tree-node
        v-for="child in root.childNodes"
        :node="child"
        :key="getNodeKey(child)"
        :props="props"
        :show-checkbox="showCheckbox"
        :render-after-expand="renderAfterExpand"
        :render-content="renderContent"
        @node-expand="handleNodeExpand"
    >
    </tree-node>
</div>
</template>

<script>
import treeNode from './treeNode'
import TreeStore from './model/tree-store';
import { getNodeKey, findNearestComponent } from './model/util'
export default {
    components: { treeNode },
    props: {
        data: {
            type: Array
        },
        nodeKey: { // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            type: String
        },
        lazy: { // 是否懒加载子节点，需与 load 方法结合使用
            type: Boolean,
            default: false
        },
        load: { // 加载子树数据的方法，仅当 lazy 属性为true 时生效
            type: Function
        },
        defaultExpandAll: { // 是否默认展开所有节点
            type: Boolean,
            default: false
        },
        showCheckbox: { // 节点是否可被选择
            type: Boolean,
            default: false
        },
        defaultCheckedKeys: { // 默认勾选的节点的 key 的数组
            type: Array
        },
        multiple: { // 是否可多选
            type: Boolean,
            default: false
        },
        checkStrictly: Boolean, // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
        currentNodeKey: [String, Number], // 当前选中的节点
        defaultExpandedKeys: Array, // 默认展开的节点的 key 的数组
        renderContent: Function,
        // checkDescendants: {
        //     type: Boolean,
        //     default: false
        // },
        filterNodeMethod: Function, // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
        renderAfterExpand: { // 是否在第一次展开某个树节点后才渲染其子节点
            type: Boolean,
            default: true
        },
        props: {
            default() {
                return {
                    children: 'children',
                    label: 'label',
                    disabled: 'disabled'
                };
            }
        },
        checkOnClickNode: { // 节点是否可被选择
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            store: null,
            root: null,
            currentNode: null,
            treeItems: null,
            checkboxItems: [],
        }
    },
    computed: {
        children: {
            set(value) {
                this.data = value;
            },
            get() {
                return this.data;
            }
        },
        treeItemArray() {
            return Array.prototype.slice.call(this.treeItems);
        },
        isEmpty() {
            const { childNodes } = this.root;
            return !childNodes || childNodes.length === 0 || childNodes.every(({visible}) => !visible);
        }
    },
    watch: {
        defaultCheckedKeys(newVal) {
            this.store.setDefaultCheckedKey(newVal);
        },
        defaultExpandedKeys(newVal) {
            this.store.defaultExpandedKeys = newVal;
            this.store.setDefaultExpandedKeys(newVal);
        },
        data(newVal) {
            this.store.setData(newVal);
        },
        checkboxItems(val) {
            Array.prototype.forEach.call(val, (checkbox) => {
                checkbox.setAttribute('tabindex', -1);
            });
        },
        checkStrictly(newVal) {
            this.store.checkStrictly = newVal;
        },
    },
    created() {
        this.isTree = true;
        this.store = new TreeStore({
            key: this.nodeKey,
            data: this.data,
            lazy: this.lazy,
            props: this.props,
            load: this.load,
            currentNodeKey: this.currentNodeKey,
            checkStrictly: this.checkStrictly,
            // checkDescendants: this.checkDescendants,
            defaultCheckedKeys: this.defaultCheckedKeys,
            defaultExpandedKeys: this.defaultExpandedKeys,
            // autoExpandParent: this.autoExpandParent,
            defaultExpandAll: this.defaultExpandAll,
            filterNodeMethod: this.filterNodeMethod
        });
        this.root = this.store.root;
    },
    methods: {
        filter(value) {
            if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
            this.store.filter(value);
        },
        getNodeKey(node) {
            return getNodeKey(this.nodeKey, node.data);
        },
        getNodePath(data) {
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
            const node = this.store.getNode(data);
            if (!node) return [];
            const path = [node.data];
            let parent = node.parent;
            while (parent && parent !== this.root) {
                path.push(parent.data);
                parent = parent.parent;
            }
            return path.reverse();
        },
        getCheckedNodes(leafOnly, includeHalfChecked) {
            return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
        },
        getCheckedKeys(leafOnly) {
            return this.store.getCheckedKeys(leafOnly);
        },
        getCurrentNode() {
            const currentNode = this.store.getCurrentNode();
            return currentNode ? currentNode.data : null;
        },
        getCurrentKey() {
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
            const currentNode = this.getCurrentNode();
            return currentNode ? currentNode[this.nodeKey] : null;
        },
        setCheckedNodes(nodes, leafOnly) {
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
            this.store.setCheckedNodes(nodes, leafOnly);
        },
        setCheckedKeys(keys, leafOnly) {
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
            this.store.setCheckedKeys(keys, leafOnly);
        },
        setChecked(data, checked, deep) {
            this.store.setChecked(data, checked, deep);
        },
        getHalfCheckedNodes() {
            return this.store.getHalfCheckedNodes();
        },
        getHalfCheckedKeys() {
            return this.store.getHalfCheckedKeys();
        },
        setCurrentNode(node) {
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
            this.store.setUserCurrentNode(node);
        },
        setCurrentKey(key) {
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
            this.store.setCurrentNodeKey(key);
        },
        getNode(data) {
            return this.store.getNode(data);
        },
        remove(data) {
            this.store.remove(data);
        },
        append(data, parentNode) {
            this.store.append(data, parentNode);
        },
        insertBefore(data, refNode) {
            this.store.insertBefore(data, refNode);
        },
        insertAfter(data, refNode) {
            this.store.insertAfter(data, refNode);
        },
        handleNodeExpand(nodeData, node, instance) {
            this.broadcast('treeNode', 'tree-node-expand', node);
            this.$emit('node-expand', nodeData, node, instance);
        },
        updateKeyChildren(key, data) {
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
            this.store.updateChildren(key, data);
        },
        initTabIndex() {
            this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
            this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
            const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]');
            if (checkedItem.length) {
                checkedItem[0].setAttribute('tabindex', 0);
                return;
            }
            this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0);
        },
        handleKeydown(ev) {
            const currentItem = ev.target;
            if (currentItem.className.indexOf('el-tree-node') === -1) return;
            const keyCode = ev.keyCode;
            this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
            const currentIndex = this.treeItemArray.indexOf(currentItem);
            let nextIndex;
            if ([38, 40].indexOf(keyCode) > -1) { // up、down
                ev.preventDefault();
                if (keyCode === 38) { // up
                    nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
                } else {
                    nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0;
                }
                this.treeItemArray[nextIndex].focus(); // 选中
            }
            if ([37, 39].indexOf(keyCode) > -1) { // left、right 展开
                ev.preventDefault();
                currentItem.click(); // 选中
            }
            const hasInput = currentItem.querySelector('[type="checkbox"]');
            if ([13, 32].indexOf(keyCode) > -1 && hasInput) { // space enter选中checkbox
                ev.preventDefault();
                hasInput.click();
            }
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
    }
}
</script>
<style lang='scss' scoped>
</style>