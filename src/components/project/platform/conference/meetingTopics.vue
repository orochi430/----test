<template>
    <div :class="{'index':modal !== 'form'}" class="meetIngTopics">
        <topic-item :topics="meetingTopics" @openFile="openFile"></topic-item>
        <commonempty v-if="isNoData"></commonempty>
        <enclosurePopup ref="enclosurePopup"></enclosurePopup>
    </div>
</template>

<script>
import topicItem from "./components/topicItem";
import enclosurePopup from "./components/enclosurePopup";
export default {
    components: {
        topicItem,
        enclosurePopup
    },
    props: {
        allMeetingTopics: {
            type: Array
        },
        meetingId: {
            type: String
        },
        modal: {
            type: String,
            default: 'form'
        }
    },
    data () {
        return {
            activeName: 0,
            loading: null,
            meetingTopics: [],
            isNoData:false
        }
    },
    watch: {
        allMeetingTopics: function (newValue, oldValue) {
            this.meetingTopics = newValue;
        }
    },
    created () {
        this.getMyAgendas();
    },
    mounted () {
    },
    methods: {
        getMyAgendas () {
            this.isNoData = false;
            if (this.allMeetingTopics) { // 首页子组件传参
                this.meetingTopics = this.allMeetingTopics;
            } else { // 点击更多
                this.loading = dsf.layer.loading();
                dsf.http
                    .post(`fn/conferenceMobile/meetingTopics`, {
                        meetingId: this.$route.params.id
                    })
                    .done(result => {
                        //console.log(result);
                        if (result.code == 200 && result.data) {
                            this.meetingTopics = result.data;
                            this.meetingTopics.forEach(topic => {
                                topic.files.forEach(file => {
                                    file.id = file.fileId
                                    file.isHandwrite = '1'
                                })
                            })

                        }else{
                            this.isNoData = true;
                        }
                    })
                    .error(error => {
                        // console.log(error);
                        // dsf.layer.toast("数据获取失败！");
                    })
                    .always(() => {
                        dsf.layer.closeLoading(this.loading);
                    });
            }
        },
        openFile(file) {
            this.$refs.enclosurePopup.open(file)
        }
    }
}
</script>

