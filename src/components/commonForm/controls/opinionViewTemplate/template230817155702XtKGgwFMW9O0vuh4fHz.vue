<template>
<div class="controlOpinionView">
    <div class="opinionBox" v-for="(item, index) in opinion" :key="index">
        <div class="opinionContent">
            <p v-if="item.isOpinionValid == -1 && item.nextHandleType == 4">{{item.userName}}：退回（原因：{{item.backReason}}）。</p>
            <p v-else>{{item.userName}}：同意。</p>
            <p>{{item.time.split(" ")[0]}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["metaData"],
    data() {
        return {
            dataTree: {}
        }
    },
    computed: {
        opinion() {
            let tempOpinion = []
            if (this.metaData.extra.list) {
                tempOpinion = this.metaData.extra.list.filter(item => item.nodeId != "QHQexxQdTtH1r7K");
            }
            console.log(tempOpinion)
            return tempOpinion
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.opinionBox {
    position: relative;
    margin: 10px 0 5px;
    color: #333;

    .opinionContent {
        padding: 6px 0;

        p {
            font-size: var(--font_size_2);
            color: #333;

            &:last-child {
                text-align: right;
                margin-top: 5px;
            }
        }
    }

    &:not(:first-child)::before {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 0;
        top: -5px;
        left: 0;
        border-bottom: 1px solid #ebedf0;
    }
}
</style>
