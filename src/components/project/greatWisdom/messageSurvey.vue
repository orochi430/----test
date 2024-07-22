<template>
  <!-- 智慧人大，信息监测 -->
  <div class="message_survey">
    <div class="content_body">
      <div class="base">
        <p class="title">基础信息</p>
        <div class="content">
          <p>
            <span>姓名</span>
            <span>{{ user_message.name }}</span>
          </p>
          <p class="identity">
            <span>身份证</span>
            <van-field
              v-model="user_message.identity"
              placeholder="请输入身份证号"
              clearable
            />
          </p>
          <p>
            <span>手机号</span>
            <span>{{ user_message.phone }}</span>
          </p>
          <p>
            <span>上传日期</span>
            <span>{{ user_message.date }}</span>
          </p>
        </div>
      </div>

      <div class="health">
        <p class="title">健康信息</p>
        <div class="content">
          <div v-for="(items, i) in health_message" :key="i">
            <!-- 单选 -->
            <div v-if="items.type == 'radio'" class="type_radio">
              <span>{{ i + 1 }}.{{ items.title }}</span>
              <div class="radio_group">
                <div
                  v-for="item in items.select_list"
                  :key="item.value"
                  class="radio_select"
                >
                  <input
                    :name="items.id"
                    :id="item.value"
                    :checked="items.select_value"
                    :value="item.value"
                    v-model="items.select_value"
                    type="radio"
                  />
                  <label :for="item.value" class="radio_test">
                    <span class="icon"></span>
                    <span class="word">
                      {{ item.word }}
                    </span>
                  </label>
                </div>
              </div>
              <!-- <van-radio-group
              v-model="items.select_value"
              direction="horizontal"
            >
              <van-radio
                v-for="item in items.select_list"
                :name="item.value"
                :key="item.value"
              >
                {{ item.word }}
              </van-radio>
            </van-radio-group> -->
            </div>
            <!-- 多选 -->
            <div v-if="items.type == 'checkbox'" class="type_checkbox">
              <p>{{ i + 1 }}.{{ items.title }}</p>
              <!-- <van-checkbox-group
                v-model="items.select_value"
                direction="horizontal"
              >
                <van-checkbox
                  v-for="item in items.select_list"
                  :name="item.value"
                  :key="item.value"
                >
                  {{ item.word }}
                </van-checkbox>
              </van-checkbox-group> -->
              <div class="check_group">
                <div
                  v-for="item in items.select_list"
                  :key="item.value"
                  class="check_select"
                >
                  <input
                    :name="items.id"
                    :id="item.value"
                    :value="item.value"
                    :checked="items.select_value"
                    v-model="items.select_value"
                    type="checkbox"
                  />
                  <label :for="item.value" class="check_test">
                    <span class="icon"></span>
                    <span class="word">
                      {{ item.word }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <!-- 下拉框 -->
            <div v-if="items.type == 'drop_down'" class="type_drop_down">
              <span>{{ i + 1 }}.{{ items.title }}</span>
              <div @click="showSelectPicker(items, i)">
                <span>{{ items.select_value || '请选择' }}</span>
                <van-icon name="arrow-down" />
              </div>
            </div>
            <!-- 文本框 -->
            <div v-if="items.type == 'textarea'" class="type_textarea">
              <p>{{ i + 1 }}.{{ items.title }}</p>
              <van-field
                v-model="items.select_value"
                :placeholder="items.select_list[0].word"
                rows="3"
                autosize
                type="textarea"
                clearable
              />
            </div>
          </div>
        </div>
      </div>

      <div class="go">
        <p class="title">出行信息</p>
        <div class="content">
          <div v-for="(items, i) in travel_message" :key="i">
            <!-- 单选 -->
            <div v-if="items.type == 'radio'" class="type_radio">
              <span>{{ i + 1 }}.{{ items.title }}</span>
              <div class="radio_group">
                <div
                  v-for="item in items.select_list"
                  :key="item.value"
                  class="radio_select"
                >
                  <input
                    :name="items.id"
                    :id="item.value"
                    :value="item.value"
                    :checked="items.select_value"
                    v-model="items.select_value"
                    type="radio"
                  />
                  <label :for="item.value" class="radio_test">
                    <span class="icon"></span>
                    <span class="word">
                      {{ item.word }}
                    </span>
                  </label>
                </div>
              </div>
              <!-- <van-radio-group
              v-model="items.select_value"
              direction="horizontal"
            >
              <van-radio
                v-for="item in items.select_list"
                :name="item.value"
                :key="item.value"
              >
                {{ item.word }}
              </van-radio>
            </van-radio-group> -->
            </div>
            <!-- 多选 -->
            <div v-if="items.type == 'checkbox'" class="type_checkbox">
              <p>{{ i + 1 }}.{{ items.title }}</p>
              <!-- <van-checkbox-group
              v-model="items.select_value"
              direction="horizontal"
            >
              <van-checkbox
                v-for="item in items.select_list"
                :name="item.value"
                :key="item.value"
              >
                {{ item.word }}
              </van-checkbox>
            </van-checkbox-group> -->
              <div class="check_group">
                <div
                  v-for="item in items.select_list"
                  :key="item.value"
                  class="check_select"
                >
                  <input
                    :name="items.id"
                    :id="item.value"
                    :value="item.value"
                    :checked="items.select_value"
                    v-model="items.select_value"
                    type="checkbox"
                  />
                  <label :for="item.value" class="check_test">
                    <span class="icon"></span>
                    <span class="word">
                      {{ item.word }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <!-- 下拉框 -->
            <div v-if="items.type == 'drop_down'" class="type_drop_down">
              <span>{{ i + 1 }}.{{ items.title }}</span>
              <div @click="showSelectPicker(items, i)">
                <span>{{ items.select_value || '请选择' }}</span>
                <van-icon name="arrow-down" />
              </div>
            </div>
            <!-- 文本框 -->
            <div v-if="items.type == 'textarea'" class="type_textarea">
              <p>{{ i + 1 }}.{{ items.title }}</p>
              <van-field
                v-model="items.select_value"
                :placeholder="items.select_list[0].word"
                rows="3"
                autosize
                type="textarea"
                clearable
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="operate">
      <van-button :disabled="no_submit" type="info" @click="submitMessage">
        提交
      </van-button>
    </div>

    <!-- 下拉框对应的picker -->
    <van-popup v-model="show_select_picker" round position="bottom">
      <van-picker
        :columns="picker_column"
        show-toolbar
        @cancel="show_select_picker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'message_survey',
  data() {
    return {
      date: new Date().toLocaleDateString().replace(/\//g, '-'),
      no_submit: false,
      radio: '',
      show_select_picker: false, //显示选择弹层
      picker_column: [], //下拉选择的列数据
      //   drop_down_index: 0,  //选择的是第几个下拉
      health_message: [], //健康信息
      travel_message: [], //出行信息
      user_message: [], //用户信息
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      //获取数据
      dsf.http
        .get('action?EpidemicAppAction=7', {
          userId: dsf.util.loadSessionStore('user').user_id,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.health_message = []
            this.travel_message = []
            this.user_message = JSON.parse(JSON.stringify(data.data))
            delete this.user_message.question
            this.no_submit = this.user_message.flag
            if (!this.user_message.date) {
              let temp = new Date()
              this.user_message.date = `${temp.getFullYear()}-${
                temp.getMonth() + 1 > 9
                  ? temp.getMonth() + 1
                  : '0' + (temp.getMonth() + 1)
              }-${temp.getDate() > 9 ? temp.getDate() : '0' + temp.getDate()}`
            }
            data.data.question.forEach((ele) => {
              switch (ele.type) {
                case 'drop_down':
                  if (ele.select_value) {
                    ele.select_value = ele.select_list.filter((ele2) => {
                      return ele2.value == ele.select_value
                    })[0].word
                  }
                  break
                case 'checkbox':
                  if (ele.select_value) {
                    ele.select_value = ele.select_value.split(',')
                  } else {
                    ele.select_value = []
                  }
                  break
                default:
                  break
              }
              if (ele.sort == '健康信息') {
                this.health_message.push(ele)
              } else {
                this.travel_message.push(ele)
              }
            })
          }
        })
    },
    showSelectPicker(item, i) {
      //显示下拉框弹层
      console.log(item)
      this.drop_down_index = i
      this.picker_column = []
      this.sort = item.sort
      item.select_list.forEach((ele) => {
        this.picker_column.push(ele.word)
      })
      this.show_select_picker = true
    },
    onConfirm(value) {
      if (this.sort == '健康信息') {
        this.health_message[this.drop_down_index].select_value = value
      } else {
        this.travel_message[this.drop_down_index].select_value = value
      }
      this.show_select_picker = false
    },
    submitMessage() {
      //提交信息监测
      console.log(this.health_message, this.travel_message)
      let question_result = []
      let flag = false
      let temp_list = [...this.health_message, ...this.travel_message]
      console.log(temp_list)
      let total = temp_list.length
      for (let i = 0; i < total; i++) {
        let ele = temp_list[i]
        console.log(
          ele.select_value,
          ele.select_value.length,
          !ele.select_value || !ele.select_value.length,
        )
        if (!ele.select_value || !ele.select_value.length) {
          //如果没有select_value，或者多选选项0，证明有没填的，不予请求
          flag = true
          break
        }
        let obj = { question: ele.id, value: ele.select_value }

        switch (ele.type) {
          case 'drop_down':
            obj.value = ele.select_list.filter((ele2) => {
              return ele2.word == ele.select_value
            })[0].value
            break
          case 'checkbox':
            obj.value = ele.select_value.toString()
            break
          default:
            break
        }
        question_result.push(obj)
      }
      if (flag) {
        dsf.layer.toast('请将健康信息或出行信息填写完整')
        return
      }
      dsf.http
        .get('action?EpidemicAppAction=8', {
          userId: dsf.util.loadSessionStore('user').user_id,
          id: this.user_message.id,
          name: this.user_message.name,
          phone: this.user_message.phone,
          identity: this.user_message.identity,
          date: this.user_message.date,
          question: JSON.stringify(question_result),
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.alert(
              {
                title: '温馨提示',
                message: res.data.message,
              },
              () => {
                this.$router.back()
              },
            )
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.message_survey {
  background: #fff;
}
.content_body {
  height: calc(100vh - 0.92rem - 0.88rem - 20px);
  overflow-y: auto;
}
.title {
  padding: 10px 15px;
  background: #f2f2f2;
  font-size: var(--font_size_3);
  color: #666;
}
.content {
  > p,
  > div {
    padding: 15px 0;
    margin: 0 15px;
    border-bottom: 1px solid #cfcfcf;
    &:last-child {
      border-bottom: none;
    }
  }
  > p,
  .type_radio {
    display: flex;
    justify-content: space-between;
  }
  .type_radio {
    flex-direction: column;
    ::v-deep .van-radio {
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .radio_group,
  .check_group {
    display: flex;
    margin: 10px 0 0;
    input {
      width: 18px;
      height: 18px;
      display: none;
    }
    .icon {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #999; //默认为边框
      display: inline-block;
      display: inline-block;
    }
    /* + 是兄弟选择器,获取选中后的label元素*/
    input:checked + label > .icon {
      background: url('../../../../static/images/greatWisdom/radio_check.png')
        no-repeat; //直接借助背景图片
      border: none;
      background-position: center;
      background-size: cover;
      width: 21px;
      height: 21px;
      display: inline-block;
    }
    /*设置禁用的radio的样式*/
    input:checked[disabled] + label > .icon {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #999; //默认为边框
      display: inline-block;
      display: inline-block;
    }
    .radio_select,
    .check_select {
      display: flex;
      align-items: center;
      margin-right: 15px;
      &:last-child {
        margin-right: 0px;
      }
      .word {
        margin-left: 6px;
      }
    }
    .radio_test,
    .check_test {
      display: flex;
      align-items: center;
    }
  }
}
.identity {
  > span {
    flex: 1;
  }
  .van-field {
    flex: 1.5;
    padding: 0;
    ::v-deep input {
      text-align: right;
    }
  }
}
.type_checkbox .van-checkbox-group {
  margin-top: 15px;
  justify-content: space-between;
}
.type_drop_down {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.operate {
  background: #ffffff;
  box-shadow: 0px -7px 9px 0px rgba(171, 177, 182, 0.12);
  width: 100%;
  //   position: fixed;
  //   bottom: 0;
  //   top: 0;
  padding: 10px 0;
  .van-button {
    width: 90%;
    margin: 0 5%;
    border-radius: 4px;
  }
}
</style>
