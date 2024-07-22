<template>
	<div class="selectAppBox">
    <div class="card">
      <div class="title showIcon">
        <span>{{myMenusName}}</span>
        <span class="flex ac" style="float:right;font-size: var(--font_size_3);color:#666" @click="done">
            <van-icon name="success" />完成
        </span>
        <span class="flex ac" style="float:right;font-size: var(--font_size_3);color:#666;padding-right: 0.2rem;" @click="restore">
            <van-icon name="replay" />恢复默认
        </span>
      </div>
      <div class="myAppBox">
        <draggable v-model="myMenus" :move="onMove" :options='dragOptions' @start='chooseFn' @end='chooseFn'>
          <transition-group type="transition" class="dsf-list cells" tag="div" name="flip-list">
            <div :key="subItem.guid" v-for="(subItem,subIndex) in myMenus" :class="['menu', `menu_${rowNum}`]" :style="{width: `${100/rowNum}%`}">
              <img :src="subItem.img" :class="{shaky:isShaky}" />
              <p>{{subItem.name}}</p>
              <div class="icon-container" style="background-color: #cfcfcf;">
                <van-icon name="minus" @mousedown.stop="deleteSelect(subItem,subIndex)" color="#fff" />
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
		<div class="f_b">
				<div class="card candan-item" :key="index" v-for="(item,index) in mainMenu" v-if="item.child.length>0">
					<div class="title showIcon">
						<span>{{item.name}}</span>
					</div>
					<div class="dsf-list cells">
						<div :key="subIndex" v-for="(subItem,subIndex) in item.child" :class="['menu', `menu_${rowNum}`]" @click="add(subItem,subIndex,item)" :style="{width: `${100/rowNum}%`}">
							<img :src="subItem.img" />
							<p>{{subItem.name}}</p>
							<div class="icon-container" v-show="!subItem.hasMyMenu" >
								<van-icon name="plus" color="#fff" />
							</div>
						</div>
					</div>
				</div>
		</div>
	</div>

</template>

<script>
	// import draggable from "vuedraggable";
	import store from "@/common/util";
	export default {
		// props: ["menus", "rowNum"],
		data() {
			return {
				dragOptions: {
					delay: 50,
					scrollFn: this.scrollFn,
				},
				isShaky: false,
				myMenus: [],
        mainMenu: [],
        myMenusTemp: [],
        mainMenuTemp: [],
        isRepeatShow: !!dsf.config.appSelect?.isRepeatShow,
        isSetUserShortcutDing: !!dsf.config.appSelect.setUserShortcutDing, // 是否后台存储我的应用
        myMenusName: dsf.config.appSelect?.selectName || "我的应用"
			}
		},
		components: {
      "draggable": () => import("vuedraggable"),
		},
    computed: {
      rowNum() {
        return this.$store.state.applications.rowNum
      },
	  countTotal(){
		if(this.$route.query.num){
			return this.$route.query.num
		}else{
			return this.rowNum * 2
		}
	  }
    },
  mounted() {
      if (this.isSetUserShortcutDing) {
        this.myMenus = dsf.util.deepCopy(this.$store.state.applications.myMenus)
      } else if (store.loadLocalStore("mySetting")) {
				this.myMenus = store.loadLocalStore("mySetting");
			}
      this.myMenusTemp = dsf.util.deepCopy(this.myMenus)
      this.mainMenu = dsf.util.deepCopy(this.$store.state.applications.menus)
      this.mainMenuTemp = dsf.util.deepCopy(this.mainMenu)
		},
    methods: {
      restore() {
        this.mainMenu = dsf.util.deepCopy(this.mainMenuTemp)
        this.myMenus = dsf.util.deepCopy(this.myMenusTemp)
      },
			scrollFn(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) {
				return
				console.log(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl)
			},
			onMove({
				relatedContext,
				draggedContext
			}) {
				const relatedElement = relatedContext.element;
				const draggedElement = draggedContext.element;
				return (
					(!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
				);
			},
			chooseFn() {
				this.isShaky = !this.isShaky
			},
			guid() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
					c
				) {
					var r = (Math.random() * 16) | 0,
						v = c == "x" ? r : (r & 0x3) | 0x8;
					return v.toString(16);
				});
			},
			deleteSelect(subItem, subIndex) {
				this.myMenus.splice(subIndex, 1);
				subItem.isshow = true;
				this.mainMenu.forEach(item => {
					item.child.forEach(nowItem => {
						if (nowItem.name == subItem.name) {
              nowItem.hasMyMenu = false;
							nowItem.isshow = true;
						}
					});
				});
			},

      add(subItem, subIndex, item) { //自定义菜单最多8个
        if (!subItem.hasMyMenu) {
          if (this.myMenus.length == this.countTotal) {
            dsf.layer.toast(`最多新增${this.countTotal}个自定义菜单`, false);
            return;
          }
          this.myMenus.push(dsf.util.deepCopy(subItem))
          subItem.hasMyMenu = true;
          subItem.isshow = this.isRepeatShow
        }
			},
      done() {
        if (this.isSetUserShortcutDing) {
          dsf.http.post('fn/newFile/setUserShortcutDing', {
            ids: this.myMenus.map(item => item.id).join(',')
          }).then(res => {
            if(res.data.code == 200) {
              this.$router.back()
            }
          })
          this.$store.dispatch('applications/setMyMenus', this.myMenus)
        } else {
          store.saveToLocalStore( "mySetting", this.myMenus );
          this.$router.back()
        }
        this.$store.dispatch('applications/setMenus', this.mainMenu)
			},

		}
	}
</script>

<style lang='scss' scoped>
@import "./application.scss";

	::v-deep .van-nav-bar__title {
		font-weight: bolder;
	}

	.dsf-list {
		box-sizing: border-box;
		padding: 0 0px 0.64rem;
		width: 100%;
		height: 100%;
	}

	.myAppBox {
		// height: 180px;
		overflow: hidden;
	}
	.card .cells {
		position: relative;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10px 10px 0;
		overflow: hidden;
	}

	.icon-container {
    width: fit-content;
    position: absolute;
    left: calc(50% + 0.2rem);
    top: -0.16rem;
    font-size: var(--font_size_4);
		background-color: var(--normal);
    color: #FFF;
    border-radius: 10px;
    line-height: 0.32rem;
    height: 0.32rem;
    min-width: 0.32rem;
    display: flex;
    align-items: center;
    justify-content: center;

		::v-deep .van-icon{
			font-size: var(--font_size_4);
		}
	}


	.shaky {
		display: inline-block;
		padding: 1px;
		font-size: var(--font_size_4);
		-webkit-transform-origin: center center;
		-ms-transform-origin: center center;
		transform-origin: center center;
		-webkit-animation-name: shaky-slow;
		-ms-animation-name: shaky-slow;
		animation-name: shaky-slow;
		-webkit-animation-duration: 4s;
		-ms-animation-duration: 4s;
		animation-duration: 4s;
		-webkit-animation-iteration-count: infinite;
		-ms-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-timing-function: ease-in-out;
		-ms-animation-timing-function: ease-in-out;
		animation-timing-function: ease-in-out;
		-webkit-animation-delay: 0s;
		-ms-animation-delay: 0s;
		animation-delay: 0s;
		-webkit-animation-play-state: running;
		-ms-animation-play-state: running;
		animation-play-state: running;
	}

	@-webkit-keyframes shaky-slow {
		0% {
			-webkit-transform: translate(0px, 0px) rotate(0deg);
		}

		2% {
			-webkit-transform: translate(-1px, 1.5px) rotate(1.5deg);
		}

		4% {
			-webkit-transform: translate(1.3px, 0px) rotate(-0.5deg);
		}

		6% {
			-webkit-transform: translate(1.4px, 1.4px) rotate(-2deg);
		}

		8% {
			-webkit-transform: translate(-1.3px, -1px) rotate(-1.5deg);
		}

		10% {
			-webkit-transform: translate(1.4px, 0px) rotate(-2deg);
		}

		12% {
			-webkit-transform: translate(-1.3px, -1px) rotate(-2deg);
		}

		14% {
			-webkit-transform: translate(1.5px, 1.3px) rotate(1.5deg);
		}

		16% {
			-webkit-transform: translate(1.5px, -1.5px) rotate(-1.5deg);
		}

		18% {
			-webkit-transform: translate(1.3px, -1.3px) rotate(-2deg);
		}

		20% {
			-webkit-transform: translate(1px, 1px) rotate(-0.5deg);
		}

		22% {
			-webkit-transform: translate(1.3px, 1.5px) rotate(-2deg);
		}

		24% {
			-webkit-transform: translate(-1.4px, -1px) rotate(2deg);
		}

		26% {
			-webkit-transform: translate(1.3px, -1.3px) rotate(0.5deg);
		}

		28% {
			-webkit-transform: translate(1.6px, -1.6px) rotate(-2deg);
		}

		30% {
			-webkit-transform: translate(-1.3px, -1.3px) rotate(-1.5deg);
		}

		32% {
			-webkit-transform: translate(-1px, 0px) rotate(2deg);
		}

		34% {
			-webkit-transform: translate(1.3px, 1.3px) rotate(-0.5deg);
		}

		36% {
			-webkit-transform: translate(1.3px, 1.6px) rotate(1.5deg);
		}

		38% {
			-webkit-transform: translate(1.3px, -1.6px) rotate(1.5deg);
		}

		40% {
			-webkit-transform: translate(-1.4px, -1px) rotate(-0.5deg);
		}

		42% {
			-webkit-transform: translate(-1.4px, 1.3px) rotate(-0.5deg);
		}

		44% {
			-webkit-transform: translate(-1.6px, 1.4px) rotate(0.5deg);
		}

		46% {
			-webkit-transform: translate(-2.1px, -1.3px) rotate(-0.5deg);
		}

		48% {
			-webkit-transform: translate(1px, 1.6px) rotate(1.5deg);
		}

		50% {
			-webkit-transform: translate(1.6px, 1.6px) rotate(1.5deg);
		}

		52% {
			-webkit-transform: translate(-1.4px, 1.6px) rotate(0.5deg);
		}

		54% {
			-webkit-transform: translate(1.6px, -1px) rotate(-2deg);
		}

		56% {
			-webkit-transform: translate(1.3px, -1.6px) rotate(-2deg);
		}

		58% {
			-webkit-transform: translate(-1.3px, -1.6px) rotate(0.5deg);
		}

		60% {
			-webkit-transform: translate(1.3px, 1.6px) rotate(-0.5deg);
		}

		62% {
			-webkit-transform: translate(0px, 0px) rotate(-1.5deg);
		}

		64% {
			-webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg);
		}

		66% {
			-webkit-transform: translate(1.6px, -1.6px) rotate(0.5deg);
		}

		68% {
			-webkit-transform: translate(0px, -1.6px) rotate(-2deg);
		}

		70% {
			-webkit-transform: translate(-1.6px, 1px) rotate(1.5deg);
		}

		72% {
			-webkit-transform: translate(-1.6px, 1.6px) rotate(2deg);
		}

		74% {
			-webkit-transform: translate(1.3px, -1.6px) rotate(-0.5deg);
		}

		76% {
			-webkit-transform: translate(1.4px, 1px) rotate(-0.5deg);
		}

		78% {
			-webkit-transform: translate(-1px, 1.4px) rotate(2deg);
		}

		80% {
			-webkit-transform: translate(1.4px, 1.6px) rotate(2deg);
		}

		82% {
			-webkit-transform: translate(-1.6px, -1.6px) rotate(-0.5deg);
		}

		84% {
			-webkit-transform: translate(-1.4px, 1.4px) rotate(-2deg);
		}

		86% {
			-webkit-transform: translate(1px, 1.4px) rotate(-2deg);
		}

		88% {
			-webkit-transform: translate(-1.4px, 1.4px) rotate(-1.5deg);
		}

		90% {
			-webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg);
		}

		92% {
			-webkit-transform: translate(-1.6px, 1.6px) rotate(2deg);
		}

		94% {
			-webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg);
		}

		96% {
			-webkit-transform: translate(-1.4px, 1.3px) rotate(-2deg);
		}

		98% {
			-webkit-transform: translate(1.3px, 1px) rotate(-0.5deg);
		}
	}

	@keyframes shaky-slow {
		0% {
			transform: translate(0px, 0px) rotate(0deg);
		}

		2% {
			transform: translate(-1px, 1.5px) rotate(1.5deg);
		}

		4% {
			transform: translate(1.3px, 0px) rotate(-0.5deg);
		}

		6% {
			transform: translate(1.4px, 1.4px) rotate(-2deg);
		}

		8% {
			transform: translate(-1.3px, -1px) rotate(-1.5deg);
		}

		10% {
			transform: translate(1.4px, 0px) rotate(-2deg);
		}

		12% {
			transform: translate(-1.3px, -1px) rotate(-2deg);
		}

		14% {
			transform: translate(1.5px, 1.3px) rotate(1.5deg);
		}

		16% {
			transform: translate(1.5px, -1.5px) rotate(-1.5deg);
		}

		18% {
			transform: translate(1.3px, -1.3px) rotate(-2deg);
		}

		20% {
			transform: translate(1px, 1px) rotate(-0.5deg);
		}

		22% {
			transform: translate(1.3px, 1.5px) rotate(-2deg);
		}

		24% {
			transform: translate(-1.4px, -1px) rotate(2deg);
		}

		26% {
			transform: translate(1.3px, -1.3px) rotate(0.5deg);
		}

		28% {
			transform: translate(1.6px, -1.6px) rotate(-1.5deg);
		}

		30% {
			transform: translate(-1.3px, -1.3px) rotate(-1.5deg);
		}

		32% {
			transform: translate(-1px, 0px) rotate(2deg);
		}

		34% {
			transform: translate(1.3px, 1.3px) rotate(-0.5deg);
		}

		36% {
			transform: translate(1.3px, 1.6px) rotate(1.5deg);
		}

		38% {
			transform: translate(1.3px, -1.6px) rotate(1.5deg);
		}

		40% {
			transform: translate(-1.4px, -1px) rotate(-0.5deg);
		}

		42% {
			transform: translate(-1.4px, 1.3px) rotate(-0.5deg);
		}

		44% {
			transform: translate(-1.6px, 1.4px) rotate(0.5deg);
		}

		46% {
			transform: translate(-2.1px, -1.3px) rotate(-0.5deg);
		}

		48% {
			transform: translate(1px, 1.6px) rotate(1.5deg);
		}

		50% {
			transform: translate(1.6px, 1.6px) rotate(1.5deg);
		}

		52% {
			transform: translate(-1.4px, 1.6px) rotate(0.5deg);
		}

		54% {
			transform: translate(1.6px, -1px) rotate(-2deg);
		}

		56% {
			transform: translate(1.3px, -1.6px) rotate(-2deg);
		}

		58% {
			transform: translate(-1.3px, -1.6px) rotate(0.5deg);
		}

		60% {
			transform: translate(1.3px, 1.6px) rotate(-0.5deg);
		}

		62% {
			transform: translate(0px, 0px) rotate(-1.5deg);
		}

		64% {
			transform: translate(-1.6px, -1.6px) rotate(-2deg);
		}

		66% {
			transform: translate(1.6px, -1.6px) rotate(0.5deg);
		}

		68% {
			transform: translate(0px, -1.6px) rotate(-2deg);
		}

		70% {
			transform: translate(-1.6px, 1px) rotate(1.5deg);
		}

		72% {
			transform: translate(-1.6px, 1.6px) rotate(2deg);
		}

		74% {
			transform: translate(1.3px, -1.6px) rotate(-0.5deg);
		}

		76% {
			transform: translate(1.4px, 1px) rotate(-0.5deg);
		}

		78% {
			transform: translate(-1px, 1.4px) rotate(2deg);
		}

		80% {
			transform: translate(1.4px, 1.6px) rotate(2deg);
		}

		82% {
			transform: translate(-1.6px, -1.6px) rotate(-0.5deg);
		}

		84% {
			transform: translate(-1.4px, 1.4px) rotate(-2deg);
		}

		86% {
			transform: translate(1px, 1.4px) rotate(-2deg);
		}

		88% {
			transform: translate(-1.4px, 1.4px) rotate(-1.5deg);
		}

		90% {
			transform: translate(-1.6px, -1.6px) rotate(-2deg);
		}

		92% {
			transform: translate(-1.4px, 1.6px) rotate(2deg);
		}

		94% {
			transform: translate(-1.6px, -1.6px) rotate(-2deg);
		}

		96% {
			transform: translate(-1.4px, 1.3px) rotate(-2deg);
		}

		98% {
			transform: translate(1.3px, 1px) rotate(-0.5deg);
		}
	}
</style>
