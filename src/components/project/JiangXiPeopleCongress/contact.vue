<template>
  <div>
    <template v-if="tabs.length > 0">
      <van-tabs v-model="active">
        <van-tab v-for="(tab, index) in tabs" :key="index" :title="tab.group">
          <template v-if="tab.users.length > 0">
            <van-search v-model="keyword" placeholder="请输入搜索关键词" />
            <div v-for="(user, idx) in onSearch(keyword, tab.users)" :key="idx" class="user flex jb ac">
              <img src="static/images/peopleCongress/icon_head.png" alt="" class="icon-head" />
              <div style="flex: 1">
                <div class="name">{{ user.name }} ({{ user.tel }})</div>
                <div class="dept">{{ user.dept }}</div>
              </div>
              <van-icon v-if="user.tel" name="phone" @click="phoneTo(user.tel)" size="0.5rem" class="icon-phone" />
              <!-- <img src="static/images/peopleCongress/lxr-information.png" alt="" style="width:0.72rem"> -->
            </div>
          </template>
          <template v-else>
            <commonempty :image="require('static/images/peopleCongress/img_empty.png')" class="file-empty"
              description="暂无数据" />
          </template>
        </van-tab>
      </van-tabs>
    </template>
    <template v-else>
      <commonempty :image="require('static/images/peopleCongress/img_empty.png')" class="file-empty"
        description="暂无数据" />
    </template>
  </div>
</template>

<script>
import store from "@/common/util";
export default {
  data() {
    return {
      active: 0,
      keyword: "",
      tabs: [],
      loading: null,
      meetingInfo: store.loadSessionStore("meeting")
    };
  },
  created() {
    let self = this;
    self.getContact();
  },
  methods: {
    getContact() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .post(`fn/peopleCongress/contact`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.code == 200 && result.data) {
            self.tabs = result.data;
          }
        })
        .error(error => { })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    },
    onSearch(keyword, users) {
      // 检索
      // return users.filter(user => `${user.name}${user.dept}${user.tel}`.includes(keyword));
      return users.filter(user => {
        for (let key in user) {
          if (user[key].includes(keyword)) {
            return user;
          }
        }
      });
    },
    phoneTo(tel) {
      window.location.href = `tel:${tel}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.user {
  background-color: #fff;
  padding: 16px;
  position: relative;

  img:not(:last-of-type) {
    margin-right: 16px;
  }

  .icon-head {
    width: 0.96rem;
    border-radius: 50%;
    margin-right: 0.2rem;
    @include background-theme("normal");
    @include border-color-theme("normal");
  }

  .icon-phone {
    border-radius: 50%;
    border: 1px solid #ddd;
    padding: 0.1rem;
    @include font-theme("normal");
  }

  .name {
    font-size: var(--font_size_2);
  }

  .dept {
    line-height: 26px;
    color: #999;
  }

  &:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0.32rem;
    bottom: 0;
    left: 1.5rem;
    border-bottom: 1px solid #cfcfcf;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

.van-search {
  ::v-deep .van-field__control {
    font-size: 0.3rem;
  }
}

.file-empty {
  padding: 4rem 0;

  ::v-deep .van-empty__image {
    flex: none;
    height: 2.2rem;
  }

  ::v-deep .van-empty__description {
    padding: 0;
  }
}
</style>
