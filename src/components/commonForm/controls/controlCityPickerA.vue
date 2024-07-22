<template>
  <div class="controlCityPickerA">
    <div class="">
      <div class="" @click="showPicker">
        <van-field :name="metaData.metaId" readonly v-model="val1" placeholder="请选择"></van-field>
      </div>
    </div>
    <van-popup :get-container="getContainer" v-model="pickerShow" position="bottom" round>
      <van-picker ref="picker" show-toolbar :columns="columns" @confirm="confirmData" @cancel="showPicker">
        <template #option="option">
          {{ option.name }}
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  name: 'controlCityPickerA',
  mixins: [propMixin],
  props: ["formData", "parameters", "subFormIndex", "formId"],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      val1: '',
      defaultVal: this.value.value,
      pickerShow: false,
      columns: [],
      controlData: {
        readonly: false,
        placeholder: ""
      },
      cityPickerData: [],
      indexA: 0,
      indexB: 0,
      indexC: 0
    }
  },
  created() {
    let self = this
    dsf.http.post("/fn/cityPickerData/get").then(({ data }) => {
      self.cityPickerData = data.data
      self.initData()
    })
  },
  mounted() {
  },
  methods: {
    initData() {
      //format大于0显示省份选择框，大于1显示地市选择框，大于2显示区县选择框
      let selectArr = []
      let temp = {}
      let self=this
      //初始化默认值
      if (this.value.value) {
        selectArr = this.value.value.split(',')
      } else if (JSON.stringify(this.metaData.defaultValue) != "{}") {
        selectArr = this.metaData.defaultValue.value.split(',')
      }

      this.checkFormat(() => {
        self.columns = self.cityPickerData.filter(item => item.fid == -1)//获取省级数据
        if (selectArr.length > 0) {
          temp = self.columns.find(item => item.id == selectArr[0])
          self.indexA = self.columns.findIndex(item => item.id == selectArr[0])
          if (temp) {
            self.val1 += temp.name
          }
        }
      }, () => {
        self.columns.forEach(element => {
          element.children = self.cityPickerData.filter(item => item.fid == element.id)//获取市级数据
        });
        if (selectArr.length > 1) {
          self.indexB = temp.children.findIndex(item => item.id == selectArr[1])
          temp = temp.children.find(item => item.id == selectArr[1])
          if (temp) {
            self.val1 += "/" + temp.name
          }
        }
      }, () => {
        self.columns.forEach(element => {
          element.children.forEach(city => {
            city.children = self.cityPickerData.filter(item => item.fid == city.id)//获取县级数据
          });
        });
        if (selectArr.length > 2) {
          self.indexC = temp.children.findIndex(item => item.id == selectArr[2])
          temp = temp.children.find(item => item.id == selectArr[2])
          if (temp) {
            self.val1 += "/" + temp.name
          }
        }
      })

    },
    showPicker() {
      if (this.readonly) return
      this.pickerShow = !this.pickerShow

      this.$nextTick(() => {
        this.checkFormat(() => {
          this.$refs["picker"].setColumnIndex(0, this.indexA)
        }, () => {
          this.$refs["picker"].setColumnIndex(1, this.indexB)
        }, () => {
          this.$refs["picker"].setColumnIndex(2, this.indexC)
        })
      })
    },
    checkFormat(f1, f2, f3) {
      if (Number(this.metaData.extra.format) > 0 && f1) {
        f1()
      }
      if (Number(this.metaData.extra.format) > 1 && f2) {
        f2()
      }
      if (Number(this.metaData.extra.format) > 2 && f3) {
        f3()
      }
    },
    confirmData(val, index) {
      this.val1 = ""
      let selval = ""
      let seltext = ""
      let selectVals = this.$refs["picker"].getValues()
      let selectIndexs = this.$refs["picker"].getIndexes()
      console.log(selectVals, selectIndexs)
      this.checkFormat(() => {
        this.indexA = selectIndexs[0]
      }, () => {
        this.indexB = selectIndexs[1]
      }, () => {
        this.indexC = selectIndexs[2]
      })

      selectVals.forEach((pickerelement, index) => {
        this.val1 += pickerelement.name
        seltext += pickerelement.name
        selval += pickerelement.id
        if (index < selectVals.length - 1) {
          this.val1 += "/"
          seltext += ","
          selval += ","
        }
      });

      var obj = this.value
      obj.value = selval
      obj.text = seltext
      this.$emit('input', obj)

      this.$bus.emit("changeCityBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      });
      this.showPicker()
    },
    getContainer() {
      return document.querySelector("body")
    },
  }
}
</script>

<style lang='scss' scoped>
.controlCityPickerA {
  box-sizing: border-box;
  width: 100%;
  font-size: var(--font_size_2);

}
</style>