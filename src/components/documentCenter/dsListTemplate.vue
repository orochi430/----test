<script>
  import Vue from "vue";
  import { Icon ,Collapse, CollapseItem} from "vant";
  import ControlProgress from "./controlProgress";
  export default {
    name: 'dsListTemplate',
    components: {
        Icon,Collapse, CollapseItem
    },
    props: {
      html: String,//字符串模板
      dataValue: {//值
        type: Object,
        default: { }
      },
    },
    data () {
      return {
      }
    },
    mounted() {
      // console.log(this.html)
    },
    methods: {
      /* 字符串转Function */
    },
    render(h) {
      let self = this
      const com = Vue.extend({
        template: self.html,
        components: { ControlProgress },
        data () {
          return {
            dataValue: self.dataValue,
            activeName: '1',
          }
        },
        methods: {
          column(key) {
            self.$emit('columnClick', {dataValue: self.dataValue}, key)
          },
          getDateFieldContent(time) {
            let serverTime = new Date().getTime();
            const itemTime = new Date(time).getTime();
            const diff = parseInt((serverTime - itemTime) / 1000);
            let str = '';
            const level1 = 60,
                level2 = 60 * 60,
                level3 = 60 * 60 * 24,
                level4 = 60 * 60 * 24 * 4;
            if (diff < level1) {
                str = '1分钟内';
            } else if (diff >= level1 && diff < level2) {
                str = `${parseInt(diff / level1)}分钟前`;
            } else if (diff >= level2 && diff < level3) {
                str = `${parseInt(diff / (level2))}小时前`;
            } else if (diff >= level3 && diff < level4) {
                str = `${parseInt(diff / (level3))}天前`;
            } else if (diff >= level4) {
                str = time.split(' ')[0]
            }
            return str;
          }
        }
      });
      return h(com, {});
    }
  }
</script >

