<template>
    <div class="form-frame">
        <div class="form-contain">
            <slot name="default"></slot>
        </div>
        <div class="form-footer">
            <DsButtonToolbox :left="leftButtons" :right="rightButtons" @leftClick="handleLeftClick" @rightClick="handleRightClick" />
        </div>
    </div>
    </template>
    
    <script>
    import DsButtonToolbox from '../documentCenter/DsfButtonToolbox';
    export default {
        name: 'FormFrame',
        components: {
            DsButtonToolbox
        },
        props: {
            title: {
                type: String
            }
        },
        data() {
            return {
                leftButtons: [{
                    icon: 'icondianhua',
                    name: 'touch',
                    text: '沟通'
                },{
                    icon: 'icondayin',
                    name: 'print',
                    text: '打印'
                }],
                rightButtons: [{
                    name: 'enclosure',
                    type: 'empty',
                    text: '附件',
                },{
                    name: 'submit',
                    type: 'primary',
                    text: '提交',
                }]
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {
            console.log(this.title)
        },
        destroyed() {},
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            handleLeftClick(name) {
                // eslint-disable-next-line no-console
                console.log(name);
            },
            handleRightClick(name) {
                // eslint-disable-next-line no-console
                console.log(name);
            }
    
        },
    }
    </script>
    