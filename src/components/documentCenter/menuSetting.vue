<template>
	<div class="selectAppBox">
		<!-- <van-nav-bar title="管理我的应用" left-text="取消" right-text="完成" @click-left="cancel" @click-right="done" /> -->
    <div class="card">
      <div class="title showIcon">
        <span>我的应用</span>
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
            <div :key="subItem.guid" v-for="(subItem,subIndex) in myMenus" :class="['menu', `menu_${rowNum}`]" :style="{width: `${100/rowNum}%`}" v-if="!subItem.empty">
              <!-- <van-icon name="add-o" size="50" color="#ddd" v-if="subItem.empty" /> -->
              <img :src="subItem.img" :class="{shaky:isShaky}" />
              <p>{{subItem.name}}</p>
              <!-- <van-icon name="cross" size="18" @mousedown.stop="deleteSelect(subItem,subIndex)" class="cell-num" v-if="!subItem.empty" /> -->
              <div class="icon-container" style="background-color: #cfcfcf;">
                <van-icon name="minus" @mousedown.stop="deleteSelect(subItem,subIndex)" color="#fff" v-if="!subItem.empty" />
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
		<div class="f_b">
			<!-- <scroller style="position: relative;" class="contacts-list"> -->
				<div class="card candan-item" :key="index" v-for="(item,index) in mainMenu" v-if="item.child.length>0">
					<div class="title showIcon">
						<span>{{item.name}}</span>
					</div>
					<div class="dsf-list cells">
						<div :key="subIndex" v-for="(subItem,subIndex) in item.child" :class="['menu', `menu_${rowNum}`]" @click="add(subItem,subIndex,item)" :style="{width: `${100/rowNum}%`}">
							<img :src="subItem.img" />
							<p>{{subItem.name}}</p>
							<!-- <van-icon name="plus" size="18" class="cell-num" v-if="!subItem.empty" /> -->
							<div class="icon-container" v-show="subItem.isshow" >
								<van-icon name="plus" v-if="!subItem.empty" color="#fff" />
							</div>
						</div>
					</div>
				</div>
			<!-- </scroller> -->
		</div>
	</div>

</template>

<script>
	// import draggable from "vuedraggable";
	import store from "@/common/util";
	export default {
		props: ["menus", "rowNum"],
		data() {
			return {
				dragOptions: {
					delay: 50,
					scrollFn: this.scrollFn,
				},
				isShaky: false,
				myMenus: [],
				mainMenu: []
			}
		},
		components: {
      "draggable": () => import("vuedraggable"),
		},
		mounted() {
			if (store.loadLocalStore("mySetting")) {
				this.myMenus = store.loadLocalStore("mySetting");
			} else {
				this.myMenus = [];
			}
			let needAddEmpty = this.myMenus.length;
			for (let i = 0; i < 8 - needAddEmpty; i++) {
				this.myMenus.push({
					name: "",
					empty: true,
					fixed: true,
					guid: this.guid()
				});
			}
			this.menus.forEach(item => {
				item.child.forEach(subItem => {
					let hasMenus = this.myMenus.filter(mymenuItem => {
						return mymenuItem.name == subItem.name;
					});
					if (hasMenus.length > 0) {
						subItem.isshow = false;
					} else {
						subItem.isshow = true;
					}
					subItem.guid = this.guid();
				});
			});
			this.mainMenu = JSON.parse(JSON.stringify(this.menus));
		},
    methods: {
      async restore() {
        let self = this
        await dsf.http.post("fn/newFile/shortcutDing", { type: 'common' }).then((res) => {
            // console.log(res);
            let mySettingMenu = res.data.data.map(item => {
                return {
                    name: item.shortcutName,
                    badge: item.tip,
                    router: item.actUrl ? item.actUrl.trim() : '',
                    img: item.shortcutIcon,
                    props: item.agentId,
                    type: item.shortcutType,
                    showClickTip: item.gntsyText,
                    child: [],
                    style: (dsf.config.homePage.menuSetting && dsf.config.homePage.menuSetting.itemStyle) ? dsf.config.homePage.menuSetting.itemStyle : "{}",
                    isshow: true,
                    badgeNum: item.badgeNum,
                    guid: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                        var r = (Math.random() * 16) | 0,
                            v = c == "x" ? r : (r & 0x3) | 0x8;
                        return v.toString(16);
                    }),
                }
            })
            mySettingMenu.forEach((subItem) => {
                subItem.isshow = true;
                subItem.badgeNum = 0;
                if (subItem.badge && subItem.badge != "") {
                    dsf.http.post(subItem.badge, {}).then((result) => {
                        subItem.badgeNum = result.data.badge;
                    });
                }
            });
          this.$set(this, 'myMenus', mySettingMenu)
            dsf.util.saveToLocalStore("mySetting", this.myMenus);
            let needAddEmpty = this.myMenus.length;
            for (let i = 0; i < 8 - needAddEmpty; i++) {
              this.myMenus.push({
                name: "",
                empty: true,
                fixed: true,
                guid: this.guid()
              });
            }
        })
        dsf.http.post("fn/newFile/shortcutDing", {}).then((res) => {
            let mainMenuNow = [];
                let result = res.data;
                // 递归菜单
                let forFunc = function (list, menu) {
                    list.forEach(item => {
                        if (item.displayPosition.indexOf("work") < 0) return
                        let agentId = item.agentid;
                        try {
                            if (agentId) {
                                agentId = JSON.parse(agentId);
                            }
                        } catch (e) {
                            agentId = {};
                        }
                        let child = {
                            name: item.shortcutName,
                            badge: item.tip,
                            router: item.actUrl ? item.actUrl.trim() : '',
                            img: item.shortcutIcon,
                            props: agentId,
                            type: item.shortcutType,
                            showClickTip: item.gntsyText,
                            child: [],
                            guid: self.guid()
                        };
                        child.hasMyMenu = self.myMenus.filter(
                            (mymenuItem) => {
                                return mymenuItem.name == child.name;
                            }
                        ).length
                        child.isshow = child.hasMyMenu <= 0
                        menu.push(child)
                        if (item.children.length > 0) forFunc(item.children, child.child)
                    })
                }
                forFunc(result.data, mainMenuNow)
                this.$set(this, 'mainMenu', mainMenuNow)
                // this.mainMenu = JSON.parse(JSON.stringify(mainMenuNow))
            });
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
							nowItem.isshow = true;
						}
					});
				});
				this.myMenus.push({
					name: "",
					empty: true,
					fixed: true,
					guid: this.guid()
				});
				console.log("tag", this.myMenus.length);
			},

      add(subItem, subIndex, item) { //自定义菜单最多8个
        if (subItem.isshow) {
          if (
            this.myMenus.filter(item => {
              return item.empty != true;
            }).length == this.rowNum * 2
          ) {
            dsf.layer.toast(`最多新增${this.rowNum * 2}个自定义菜单`, false);
            return;
          }
          subItem.isshow = false;
          var emptyIndex = this.myMenus.findIndex((value, index, arr) => {
            return value.empty == true;
          });

          this.$set(this.myMenus, emptyIndex, subItem);
          console.log("tag", this.myMenus.length);
        }
			},
			done() {
				store.saveToLocalStore(
					"mySetting",
					this.myMenus.filter(item => {
						return item.empty != true;
					})
				);
				this.$emit("done");
			},
			cancel() {
				this.$emit("cancel");
			},
		}
	}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/applicationCenter.scss";
// @import "../../assets/styles/themes.scss";
// @import "../../assets/styles/mixin.scss";

	::v-deep .van-nav-bar__title {
		font-weight: bolder;
	}

	// .selectAppBox {
	// 	margin: 10px;
	// 	// width: 100%;
	// 	height: 100%;
	// 	font-size: var(--font_size_3);
	// 	background-color: #fff;
	// 	img {
	// 		display: inline-block;
	// 	}
	// }

	.dsf-list {
		box-sizing: border-box;
		padding: 0 0px 0.64rem;
		width: 100%;
		height: 100%;

		// .menu {
		// 	display: inline-block;
		// 	width: 25%;
		// 	text-align: center;
		// 	margin-bottom: 15px;

		// 	img {
		// 		display: inline-block;
		// 		width: 48px;
		// 		vertical-align: middle;
		// 		margin-bottom: 6px;
		// 	}

		// 	p {
		// 		font-size: var(--font_size_2);
		// 		color: #333333;
		// 		letter-spacing: 1px;
		// 	}
		// }

		// .menu:nth-child(n + 4) {
		// 	margin-bottom: 0;
		// }
	}

	// .title {
	// 	padding: 8px 15px;
	// 	box-sizing: border-box;
	// 	position: relative;
	// 	@include font_2;
	// 	font-weight: bold;

	// 	span {
	// 		margin-left: 5px;
	// 		font-size: var(--font_size_1);
	// 		color: #333;
	// 	}

	// 	&::before {
	// 		content: '';
	// 		display: block;
	// 		width: 5px;
	// 		height: 20px;
	// 		position: absolute;
	// 		top: 50%;
	// 		transform: translate(-5px, -50%);
	// 		@include background-theme('normal');
	// 	}
	// }

	.myAppBox {
		// height: 180px;
		overflow: hidden;
	}

	// .f_b {
	// 	position: relative;
	// 	height: 66%;

	// 	.cells {
	// 		padding: 14px;
	// 	}
	// }

	.card .cells {
		position: relative;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10px 10px 0;
		overflow: hidden;
	}

	// .item-cell {
	// 	width: 25%;
	// 	text-align: center;
	// 	color: #333333;
	// 	position: relative;
	// 	margin-bottom: 10px;
	// 	img {
	// 		display: inline-block;
	// 		width: 48px;
	// 		height: 48px;
	// 		vertical-align: middle;
	// 		margin-bottom: 6px;
	// 	}
	// }
	// .menu_5 {
	// 		img {
	// 				width: 40px;
	// 				height: 40px;
	// 		}
	// 		p {
	// 				font-size: var(--font_size_4);
	// 		}
	// }
	// .cell-num {
	// 	position: absolute;
	// 	top: -10px;
	// 	right: 1px;
	// 	border: 1px solid rgb(33, 150, 243);
	// 	border-radius: 12px;
	// 	color: rgb(33, 150, 243);
	// 	padding: 2px;
	// }

	.icon-container {
		position: absolute;
		top: -0.14rem;
		right: 0.08rem;
		border-radius: 50%;
		height: 20px;
    width: 20px;
		background-color: #188CF9;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;

		::v-deep .van-icon{
			font-size: var(--font_size_3);
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
