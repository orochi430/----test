<template>
  <div class="ds-enclosure-item"  @click="openFile">
    <div class="__file_icon">
      <i :class="[typeConfig[type]]" class="iconfont"></i>
    </div>
    <div class="__file_body">
      <div class="__file_title">
        <div class="elps">{{ name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filepre',
    props: {
      name: {
        type: String,
        require: true
      },
      size: {
        type: String,
        default: ''
      },
      url: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        typeConfig: {
          'IMAGE': 'iconIMAGE',
          'TXT': 'iconTXT',
          'PDF': 'iconPDF',
          'WORD': 'iconWORD',
          'EXCEL': 'iconEXCEL',
          'PPT': 'iconPPT',
          'OTHER': 'iconOTHER'
        },
        fileType: {
          'IMAGE': ['jpeg', 'bmp', 'webp', 'svgz', 'svg', 'gif', 'jpg', 'ico', 'png', 'tif'],
          'PDF': ['pdf'],
          'TXT': ['txt', 'sql', 'xml', 'html', 'css', 'js', 'java', 'php', 'bat', 'log'],
          'WORD': ['docx', 'docm', 'doc', 'dotx', 'dotm', 'dot'],
          'EXCEL': ['xlsx', 'xlsm', 'xlsb', 'xls', 'xltx', 'xltm', 'xlt', 'xlam', 'xla', 'ods'],
          'PPT': ['pptx', 'pptm', 'ppt', 'potx', 'potm', 'pot', 'ppsx', 'ppsm', 'pps', 'ppam', 'ppa']
        }
      };
    },
    computed: {
      suffix () {
        let startIndex = this.name.lastIndexOf('.');
        if(startIndex !== -1)
          return this.name.substring(startIndex + 1, this.name.length).toLowerCase();
        else return '';
      },
      type () {
        for (let key in this.fileType) {
          let value = this.fileType[key];
          if (value.indexOf(this.suffix) > -1) {
            return key
          }
        }
        return 'OTHER';
      }
    },
    methods: {
      openFile () {
        this.$emit('open', this.url);
      }
    }
  };
</script>

<style lang='scss' scoped>
  // @import '../../assets/font/font.css';

  @import '../../assets/styles/themes.scss';

  @import '../../assets/styles/mixin.scss';

  // 附件-悬浮按钮
  .ds-enclosure-item {
    width: 100%;
    height: 64px;
    padding: 12px 62px 12px 56px;
    position: relative;
    .__file {
      &_icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 56px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        i {
          font-size: 36px;
          color: #999;
        }
      }
      &_title {
        line-height: 22px;
        @include font_4();
        color: #333;
        margin-bottom: 3px;
      }
      &_size {
        line-height: 19px;
        @include font_6();
        color: #999;
      }
      &_bt {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 62px;
        @include font_6();
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
      }
      &_button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 22px;
        color: #999;
        border: 1px solid #ebebeb;
        border-radius: 20px;
      }
    }
    .iconIMAGE{
      color: #49C9A7 !important;
    }
    .iconTXT{
      color: #A6A6A6 !important;
    }
    .iconPDF{
      color: #E21607 !important;
    }
    .iconWORD{
      color: #2A5699 !important;
    }
    .iconEXCEL{
      color: #207245 !important;
    }
    .iconPPT{
      color: #D33922 !important;
    }
    .iconOTHER{
      color: #AEBFCD !important;
    }
  }
</style>
