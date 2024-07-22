<template>
  <div class="ds-home">
    <van-field v-model="person" label="选人" right-icon="warning-o" placeholder="选择人员" @click="showPopup" />
    <van-popup v-model="show" :style="{ height: '90%' }" closeable close-icon="close" position="bottom">
      <div>
        <add-tree :person-select-data="personSelectData" @select="getSelect"></add-tree>
        <div v-if="selectList.length>0" class="select_b">
          <div class="select_box">
            <scroller class="contacts-list">
              <div v-for="(inx,index) in selectList" :key="index" class="select_item">
                <span class="select_name">{{ inx.name }}</span>
                <i class="iconfont iconguanbi icondel" @click="delItem(inx)"></i>
              </div>
              <div class="clear"></div>
              <div class="mar_b"></div>
            </scroller>
          </div>
        </div>
        <van-tabbar>
          <van-tabbar-item>
            <van-button round type="info" @click="addPerson()">确定</van-button>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import addTree from '@/components/selectPerson/addTree'

  export default {
    name: 'selectPerson',
    components: {
      addTree
    },
    data() {
      return {
        show: false,
        person: "",
        selectList: [],
        personSelectData: "",
        param: {
          allowEdit: false,
          containUnit: "-1",
          data: "",
          displayFullPath: "-1",
          fullOrganize: false,
          key: "C-RC-0008",
          multiple: true,
          roles: "",
          rootObject: "2",
          schema: "",
          separator: ",",
          tabs: [{
            key: "self_org",
            list: [{
              key: "department",
              name: "本机构"
            }],
            name: "本单位"
          }],
          title: "选择参与人员",
          type: "userselect",
          types: ["person", "department", "post"],
          typesString: "person,department,post",
          value: ""
        }
      }
    },
    created() {
      window.GLOBAL = {}
      window.GLOBAL.personAddList = []
      this.getPersonList(this.param)
    },
    methods: {
      getPersonList(param) {
        window.GLOBAL.personMultiple = param.multiple;
        let that = this;
        let url = "fn/mobileUsedContact/getDeptUserList";
        dsf.http.post(url, {
          action: param.tabs[0].key,
          types: param.typesString,
          rootObject: param.rootObject,
          async: false
        }).then(function (result) {
          result.data.data.departmentList.forEach(toy => {
            that.addPersonDeep(toy, 1);
          });
          that.personSelectData = result.data.data.departmentList;
           that.personSelectData[0].children[0].checked=true
          console.log("人员选择控件", that.personSelectData);
        });
      },
      addPersonDeep(data, start) {
        let self = this;
        this.$set(data, "deep", start);
        this.$set(data, "checked", start < 2 ? true : false);
        if (data.children && data.children.length > 0) {
          data.children.forEach(item => {
            self.addPersonDeep(item, start + 1);
          });
        }
      },

      addPerson() {
        let name = "";
        let val = "";
        let sch = "";
        let temp1 = [];
        let temp2 = [];
        let temp3 = [];
        for (let cell of window.GLOBAL.personAddList) {
          temp1.push(cell.showName);
          temp2.push(cell.attrs.idValue);
          temp3.push(cell.type + "::" + cell.attrs.idValue);
        }
        name = temp1.join(",");
        val = temp2.join(",");
        sch = temp3.join(",");
        this.person = name
        this.show = false;
        this.$emit("getSelectUser", this.selectList);
        console.log("最终选择人", this.selectList);
      },

      //获取选择的人
      getSelect(data) {
        let self = this;
        self.selectList = [];
        for (let i in data) {
          self.selectList.push(data[i]);
        }
        // this.$emit("getSelectUser",self.selectList)
        // console.log("最终选择人", self.selectList);
      },
      showPopup() {
        this.show = true
      }
    }
  }
</script>

<style lang="css">
  .btnlist_btn {
    background: none;
    border: none;
    padding-top: 4px;
    outline: none;
  }

  .th_box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 500;
  }

  .th_box .th_back {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 501;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  .th_box .th_con {
    width: 70%;
    position: absolute;
    left: 16.5%;
    top: 30%;
    z-index: 502;
    background: #ffffff;
    border-radius: 5px;
    overflow: hidden;
  }

  .th_box .th_con textarea {
    width: 100%;
    padding: 5px;
    line-height: 24px;
  }

  .th_box .th_con .title {
    font-size: var(--font_size_0);
    text-align: center;
    padding: 10px 0px;
    border-bottom: 1px solid gainsboro;
    color: #333;
  }

  .th_box .th_btn {
    display: flex;
    font-size: var(--font_size_2);
  }

  .th_box .th_btn .th_i {
    flex: 1;
    text-align: center;
    padding: 10px 0px;
    border-top: 1px solid gainsboro;
  }

  .th_box .th_btn .th_s {
    flex: 1;
    text-align: center;
    padding: 10px 0px;
    color: #fff;
  }

  .select_b {
    background: #fff;
    width: 100%;
    height: 50px;
    padding: 5px 0px;
    position: fixed;
    bottom: 44px;
    z-index: 500;
    left: 0;
  }

  .select_b .select_box {
    width: 95%;
    height: 50px;
    /*border: 1px solid gainsboro;*/
    border-radius: 5px;
    background: #fff;
    margin: 0px 5px;
    overflow: hidden;
    position: relative;
  }

  .select_b .select_box .select_item {
    float: left;
    width: 22%;
    border: 1px solid #666;
    text-align: center;
    font-size: var(--font_size_3);
    color: #666;
    margin: 0px 1.2% 1.2% 1.2%;
    height: 20px;
    line-height: 20px;
    border-radius: 3px;
  }

  .select_b .select_box .select_item .select_name {
    width: 68%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select_b .select_box .select_item .icondel {
    color: #888;
    float: right;
    padding-right: 4px;
  }

  .select_b .select_box .mar_b {
    width: 100%;
    height: 10px;
  }

  .backlog-modal-addbox .part .text {
    height: calc(100% - 20px);
    overflow: auto;
  }

  /*#nodeSure {
  color: #fff !important;
  background: #3cba7b;
}*/
  .no_border {
    border: none;
  }

  .overflowBug-div {
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
    overflow: auto;
    box-sizing: border-box;
  }

  .postMessagePop {
    width: 100%;
    height: calc(100% - 22px);
    box-sizing: border-box;
    margin-top: 22px;
    border-radius: 15px 15px 0px 0px;
    padding-top: 15px;
    padding-bottom: 22px;
  }

  .isHiddenHead {
    display: none;
  }

  .isHiddenHeadTop {
    top: 0px;
  }

  .pdtop {
    padding-top: 44px;
  }
</style>
