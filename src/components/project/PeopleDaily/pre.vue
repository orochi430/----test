<template>
<div>
    <div class="content">
        <div class="title">个人疫情防控承诺书</div>
        <div class="text">
            <p>　　为实现新冠肺炎疫情的联防联控、群防群控，在入社前本人郑重承诺:</p>
            <p>1、无新冠肺炎感染的症状。</p>
            <p>2、未与新冠肺炎确诊人员及疑似人员直接接触。</p>
            <p>3、十四天内未到过疫情中、高风险地区，未接触疫情中、高风险地区人员。</p>
            <p>4、十四天内未出现发烧、流涕、咳嗽等疑似情况。</p>
            <p>5、入校后，严格遵守学校的各项规章制度，配合老师做好体温检测工作，保持个人卫生等。</p>
            <p>6、积极学习新冠肺炎疫情防控知识，不造谣、不信谣、不传谣。</p>
            <p>7、已详细阅读以上条款，如隐报、乱报个人信息，造成的一切后果由本人承担。</p>
        </div>
        <div class="sign">
            <br />
            <br />
            <br />
            <p>日期：{{ nowDate }}</p>
        </div>
    </div>

    <div style="height: 1.2rem">
        <div class="btn-container">
            <van-button type="info" @click="agree()">同 意</van-button>
            <!-- <van-button type="info" @click="disagree()">拒 绝</van-button> -->
        </div>
    </div>
</div>
</template>

<script>
// import store from "@/common/util";
export default {
    data() {
        return {
            nowDate: dsf.date.format(new Date(), "yyyy-mm-dd"),
            // uid: this.$route.params.uid,
            paras: this.$route.query.paras
        };
    },
    created() {},
    mounted() {},
    methods: {
        agree() {
            let self = this;
            self.$router.push(`/commonForm/211026160337WA4njkw5gy5g2YRhfeE?paras=${self.paras}`);
        },
        disagree(){
            let self = this;
            self.$router.go(-1);
            try{
                window.close();
            }catch(e){
                console.log(e);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.content {
    padding: 16px;

    .title {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        padding-bottom: 10px;
    }

    .text {
        font-size: var(--font_size_2);
        // text-indent: 2rem;
    }

    .sign {
        text-align: right;
    }
}

.btn-container {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .van-button {
        flex: 1;

        &:not(:first-child) {
            margin-left: 10px;
        }
    }
}
</style>
