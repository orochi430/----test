<template>
<div>
    <div v-if="errored" class="init-div">{{ errorMsg }}</div>
    <div v-else class="initial-div">
        <!-- <div v-if="loading">正在登录...</div>
        <div v-else>
            登录成功！
        </div> -->
        <div class="text">
            登记成功，请您按时来访！<br>
            <!-- 您的来访码是：{{ code }}。 -->
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            errored: false,
            errorMsg: "发生错误！",
            code: this.$route.params.code
        };
    },
    created() {
        this.preventBack();
    },
    mounted() {},
    methods: {
        // 阻止返回
        preventBack() {
            history.pushState(null, null, document.URL);
            window.addEventListener("popstate", function () {
                history.pushState(null, null, document.URL);
            });
        }
    }
};
</script>

<style scoped>
.initial-div {
    /* position: absolute; */
    width: 100%;
    height: 100vh;
    line-height: 20px;
    /* margin-top: -20px; */
    /* top: 50%; */
    left: 0;
    font-size: 28px;
    color: #7f7a7a;
    text-align: center;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
