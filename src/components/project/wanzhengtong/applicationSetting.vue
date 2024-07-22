<template>
	<div class="selectAppBox">
		<van-nav-bar title="管理常用服务" left-text="取消" right-text="完成" @click-left="cancel" @click-right="done" />
    <div class="candan-item">
      <div class="title">
        <span>常用服务</span>
        <span style="float:right;font-size: var(--font_size_4);color:#666">
            长按拖动排序
        </span>
      </div>
      <div class="myAppBox">
        <draggable v-model="myMenus" :move="onMove" :options='dragOptions' @start='chooseFn' @end='chooseFn'>
          <transition-group type="transition" class="cells" tag="div" name="flip-list">
            <div :key="subItem.guid" v-for="(subItem,subIndex) in myMenus" class="item-cell">
              <van-icon name="add-o" size="50" color="#ddd" v-if="subItem.empty" />
              <img :src="subItem.img" v-if="!subItem.empty" :class="{shaky:isShaky}" />
              <div class="right">
                <p class="name" v-html="subItem.name"></p>
								<p class="sub elps">{{subItem.gntsyText}}</p>
              </div>
              <!-- <p v-if="!subItem.empty">{{subItem.name}}</p> -->
              <!-- <van-icon name="cross" size="18" @mousedown.stop="deleteSelect(subItem,subIndex)" class="cell-num" v-if="!subItem.empty" /> -->
              <div class="icon-container">
                <van-icon name="clear" @mousedown.stop="deleteSelect(subItem,subIndex)" color="#F55540" v-if="!subItem.empty" />
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
		<div class="f_b">
			<!-- <scroller style="position: relative;" class="contacts-list"> -->
				<div class="candan-item" :key="index" v-for="(item,index) in mainMenu">
					<div class="title" v-if="item.child.length>0">
						<span>{{item.name}}</span>
					</div>
					<div class="cells" v-if="item.child.length>0">
						<div :key="subIndex" v-for="(subItem,subIndex) in item.child" class="item-cell" v-show="subItem.isshow" @click="add(subItem,subIndex,item)">
							<img :src="subItem.img" />
							<div class="right">
                <p class="name" v-html="subItem.name"></p>
								<p class="sub elps">{{subItem.gntsyText}}</p>
              </div>
							<!-- <van-icon name="plus" size="18" class="cell-num" v-if="!subItem.empty" /> -->
							<div class="icon-container">
								<van-icon name="add" v-if="!subItem.empty" color="#188CF9" />
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
		props: ["menus","commonMenus"],
		data() {
			return {
				dragOptions: {
					delay: 50,
					scrollFn: this.scrollFn,
				},
				isShaky: false,
				myMenus: this.commonMenus,
				mainMenu: []
			}
		},
		components: {
      "draggable": () => import("vuedraggable"),
		},
		mounted() {
			let needAddEmpty = this.myMenus.length;
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
				// this.myMenus.push({
				// 	name: "",
				// 	empty: true,
				// 	fixed: true,
				// 	guid: this.guid()
				// });
				console.log("tag", this.myMenus.length);
			},

			add(subItem, subIndex, item) { //自定义菜单最多8个
				// if (
				// 	this.myMenus.filter(item => {
				// 		return item.empty != true;
				// 	}).length == 8
				// ) {
				// 	dsf.layer.toast(`最多新增8个自定义菜单`, false);
				// 	return;
				// }
				subItem.isshow = false;
				// var emptyIndex = this.myMenus.findIndex((value, index, arr) => {
				// 	return value.empty == true;
				// });

				// this.$set(this.myMenus, emptyIndex, subItem);
        this.myMenus.push(subItem);
				console.log("tag", this.myMenus.length);
			},
			done() {
				store.saveToLocalStore(
					"mySetting",
					this.myMenus.filter(item => {
						return item.empty != true;
					})
				);
				// console.log(this.myMenus)
				dsf.http.post('fn/newFile/setUserShortcutDing', {
					ids: this.myMenus.map(item => item.id).join(','),
					pageId: this.$route.query.currentPortalId
				}).then(res => {
					if(res.data.code == 200) {
						this.$emit("done");
					}
				})
			},
			cancel() {
				this.$emit("cancel");
			},
		}
	}
</script>

<style lang='scss' scoped>
	@import "@/assets/styles/themes.scss";
	@import "@/assets/styles/mixin.scss";

	::v-deep .van-nav-bar__title {
		font-weight: bolder;
	}

	.selectAppBox {
		// width: 100%;
		height: 100%;
		font-size: var(--font_size_3);
		background-color: #fff;
		img {
			display: inline-block;
		}
	}

  .candan-item {
        margin: 15px;
        .title {
            padding-bottom: 15px;
            font-size: var(--font_size_2);
            font-weight: 600;
        }
    }
    .cells {
        background-color: #fff;
        box-shadow: 0 1px 20px 0 rgba(166,201,235,0.26);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px;

        .item-cell {
            width: 49%;
            display: flex;
            padding: 10px 0;
            position: relative;
            img {
                width: 34px;
                height: 34px;
                padding-right: 5px;
                box-sizing: content-box;
            }
            .right {
                flex: 1;
                overflow: hidden;
                .name {
                    font-weight: 600;
                }
                .sub {
                    font-size: 11px;
                    color: #999;
                }
            }
        }

    }
	.icon-container {
		position: absolute;
		// top: -0.2rem;
		right: 0.02rem;
		border-radius: 50%;
		height: 25px;
		background-color: #F5F5F5;

		::v-deep .van-icon{
			font-size: 25px;
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
