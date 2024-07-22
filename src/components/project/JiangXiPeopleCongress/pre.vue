<template>
<div class="card-contaniner">
    <div v-if="errored" class="init-div">
        您进行了未授权的访问,请重新登录！
    </div>
    <div v-for="item in cards" v-else :key="item.id" class="card" @click="go(item)">
        <img :src="item.img" alt="" />
    </div>
</div>
</template>

<script>
// import { cards } from "./test";
export default {
    data() {
        return {
            cards: [],
            loading: null,
            errored: false
        };
    },
    created() {
        let self = this;
        dsf.util.removeSessionStore("meeting");
        if (!dsf.util.loadSessionStore("user")) {
            // self.errored = true;
            self.$router.replace("/errorPeopleCongress/401");
        }
        if (!self.errored) {
            self.getMeetingList();
        }
    },
    mounted() {
        if (!this.errored) {
            this.loading = dsf.layer.loading();
        }
    },
    methods: {
        go(item) {
            this.$router.push({
                name: "peopleCongress",
                params: {
                    key: item.id
                }
            });
        },
        getMeetingList() {
            let self = this;
            dsf.http
                .get(`fn/peopleCongress/meetingType`)
                .done(result => {
                    // result = result.data;
                    if (result.code == 200) {
                        result.data.map(item => {
                            switch (item.id) {
                                case '1':
                                    item.img = 'static/images/peopleCongress/img_meeting1.png';
                                    break;
                                case '2':
                                    item.img = 'static/images/peopleCongress/img_meeting2.png';
                                    break;
                                case '3':
                                    item.img = 'static/images/peopleCongress/img_meeting3.png';
                                    break;
                                case '4':
                                    item.img = 'static/images/peopleCongress/img_meeting4.png';
                                    break;
                                default:
                                    item.img = '';
                            }
                            self.cards.push(item);
                        })
                        // self.cards = result.data;
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.init-div {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -20px;
    top: 50%;
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
}
.card-contaniner{
    min-height: 95vh;
    // height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.card {
    width: 6.5rem;
    height: 3.6rem;
    // height: calc(100%/4);
    // max-height: 3.6rem;
    margin: 0 auto;

    &:first-child {
        margin-top: 0.4rem;
    }

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
