<template>
	<div class="tabForm bianjianbox">
		<!-- <van-nav-bar :title="title" left-text="返回" left-arrow placeholder fixed @click-left="bandlerBack">
    </van-nav-bar> -->
		<van-form class="form" @click="onSubmit">
			<van-cell-group>
				<van-field :label="`主题${hf}：`" v-model="maintitle" :readonly="isdisabled || titledisabled"
					label-width="1.6rem" rows="1" autosize type="textarea" placeholder="请输入">
				</van-field>
				<van-field label="发送人：" v-if="!isCreatForm && TabIndex == 0" v-model="initDate.sendUserName"
					label-width="1.6rem" rows="1" autosize type="textarea" placeholder="" readonly>
				</van-field>
				<van-field label="发送时间：" v-if="!isCreatForm && TabIndex == 0" v-model="initDate.sendTime"
					label-width="1.6rem" rows="1" autosize type="textarea" placeholder="" readonly>
				</van-field>
				<van-field label="收件人：" label-width="1.6rem" right-icon="contact" @click-right-icon="selectPerson">
					<template #input>
						<div class="selectUser">
							<div v-if="!userSchema.length" style="color:#cdcdcd">请选择</div>
							<template v-else>
								<span v-for="(user, index) in selectUsersName" v-if="user" :key="index">{{ user }}
									<van-icon v-if="!isdisabled" name="cross" size="0.28rem" color="red"
										@click="delUser(user, index)" />
								</span>
							</template>

						</div>
					</template>
				</van-field>
				<van-field label="紧急程度：" v-if="isShowUrgency == 1" name="radio" label-width="1.6rem" center>
					<template #input>
						<span v-if="isdisabled && tures">{{ initDate.jjcdText }}</span>
						<van-radio-group v-model="radioVal" direction="horizontal" v-else>
							<van-radio v-for="(item, index) in initDate.jjcdDataList" :disabled="isdisabled && tures"
								:name="item.codeValue" :key="index" class="radioItem" checked="true"
								@click="getRadioVal(item)">{{ item.codeName }}
							</van-radio>
						</van-radio-group>
					</template>
				</van-field>
				<!-- 拿到textareaTextVal值在渲染 -->
				<div class="edit" v-if="isShowContent">
					<div style="padding: 0.32rem 0;">内容：</div>
					<div>
						<textare-edit v-if="(textareaTextVal || isCreatForm) && !isdisabled"
							:textarea-text-val="textareaTextVal" @textareaText="getTextValue"></textare-edit>
						<div v-else class="bandhtml">
							<div v-html="textareaTextVal"></div>
						</div>
					</div>
				</div>
				<div class="flex jb" style="padding: 0.32rem">
					<span>附件：</span>
					<van-uploader v-if="!isdisabled" :after-read="afterRead" :accept="accept" class="upload-btn" result-type="file">
						<i class="iconfont iconattachment"
							style="display: inline-block;transform: rotate(-45deg);font-size: var(--font_size_0)"></i>
					</van-uploader>
				</div>
				<!-- <van-field label="附件：" input-align="right" name="uploader">
                <template #right-icon>
                    <van-uploader v-if="!isdisabled" :after-read="afterRead" :accept="accept" class="upload-btn">
                        <van-icon class="iconfont iconjiahao" />
                    </van-uploader>
                </template>
            </van-field> -->
				<!-- <div class="file" v-for="(item, index) in attach_1" :key="index" @click="openFile(item)"> -->
				<!-- <img :src="file.title | fileType" alt=""> -->
				<!-- <span class="elps">{{ item.fileName }}</span>
                <van-icon name="eye" color="#999999" size="0.32rem" />
                <van-icon v-if="!isCreatForm && isShowDownBtn" color="#999999" name="down" size="0.32rem" style="padding-left: 0.2rem" @click.stop="downFile(item)" />
                <van-icon v-if="!isdisabled" color="#999999" name="cross" size="0.32rem" style="padding-left: 0.2rem" @click.stop="removeFile(item, index)" />
            </div> -->
				<div class="fileList" v-for="(item, index) in attach_1" :key="index">
					<div class="file">
						<div class="fileIcon" @click="openFile(item)" v-if="
						!dsf.config.commonForm.enclosureStyle ||
						dsf.config.commonForm.enclosureStyle == 'complex'">
							<img :src="getIconClass(item.fileName)" alt="" />
						</div>
						<div class="fileBody" @click="openFile(item)">
							<div class="fileTitle"
								:class="{ ellipsis: dsf.config.commonForm.enclosureStyle != 'noIcon', }"
								:style="{ width: '90%' }">
								<img v-if="dsf.config.commonForm.enclosureStyle == 'simple'"
									:src="getIconClass(item.fileName)" alt=""
									style="width: 0.3rem; display: inline-block; vertical-align: sub" />
								{{ item.fileName }}
							</div>
							<div class="fileSize" v-if="
							!dsf.config.commonForm.enclosureStyle ||
							dsf.config.commonForm.enclosureStyle != 'simple'">
								<span>{{ item.showFileSize || "默认尺寸" }}</span>
							</div>
						</div>
						<div class="fileBtn">
							<div class="fileButton" @click.stop="downFile(item)" v-if="!isCreatForm && isShowDownBtn">
								下载
							</div>
							<div class="fileButton" @click.stop="removeFile(item, index)" v-if="!isdisabled">
								删除
							</div>
						</div>
					</div>

				</div>
				<div v-show="isShowSmsSend == 1" class="van-field van-cell">
					<div class="van-cell__title van-field__label"><span>发送短信</span></div>
					<div>
						<van-radio-group v-model="SendStatus" :disabled="isdisabled" direction="horizontal">
							<van-radio name="-1">否</van-radio>
							<van-radio name="1">是</van-radio>
						</van-radio-group>
					</div>
				</div>
				<van-field v-if="SendStatus == 1 && isShowSmsSend == 1" v-model="smsContent" rows="3" autosize
					type="textarea" placeholder="请输入内容">
					<template #label>
						<span>短信内容</span>
					</template>
				</van-field>
				<div v-if="TabIndex != 2 && !isCreatForm && !forwardIds && !replyId && isShowHistoryMsg == 1"
					class="historyBox">
					<van-divider class="fgx" dashed>往来{{ title }}</van-divider>
					<div v-for="(hiy, index) in historyMsg" :key="index" class="historyItem">
						<div class="line">
							<span>发件人：{{ hiy.sendUserName }}</span>
						</div>
						<div class="line">
							<span>发送时间：{{ hiy.sendTime }}</span>
						</div>
						<div class="line">
							<span>主题：{{ hiy.bt }}</span>
						</div>
						<div class="line">
							<span>内容：<span v-html="hiy.content"></span></span>
						</div>
						<div v-if="hiy.attachInfos && hiy.attachInfos.length > 0" class="line">
							<span>附件：<span v-for="(fj, index) in hiy.attachInfos" :key="index" @click="openFile(fj)">{{
								fj.showName
							}}</span></span>
						</div>
					</div>
				</div>
			</van-cell-group>

		</van-form>
		<div style="height: 1.2rem">
			<div class="footer">
				<DsfButtonToolbox :more="true" :is-form-btn="true" :buttons="buttons" size="small"
					@mainClick="handlerBtn" @commonClick="handlerBtn" />
			</div>
		</div>
		<van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
		<van-popup v-model="showPerson" :close-on-click-overlay="true" :get-container="'#app'" lock-scroll
			position="bottom" :style="{ height: '100%' }">
			<!-- <selectPerson :type="0" @getSelectUser="getSelectUser" :extra="extra" @cancePerson="cancePerson"></selectPerson> -->
			<control-user-list :extra="extra" @getSelectUser="getSelectUser" @close="cancePerson"></control-user-list>
		</van-popup>
		<van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom"
			style="height: 100vh">
			<van-nav-bar :title="filename" left-text="返回" left-arrow fixed placeholder @click-left="closeFile">
			</van-nav-bar>
			<enclosure-preview v-if="dsf.config.commonForm.LocalDocPreview" :file="popFile" :form-info="fileData"
				ref="enclosurePreview"></enclosure-preview>
			<file :file-url="fileUrl" :style="{height: `calc(100vh - ${dsf.util.getOffsetTop('0.92rem')})`}" v-else></file>
		</van-popup>
	</div>
</template>

<script>
import {
	Icon,
	Popup,
	Grid,
	GridItem
} from 'vant';
import textareEdit from "../documentCenter/testEdit"
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import controlUserList from "@/components/commonForm/controls/controlUserList";
import DsfButtonToolbox from "@/components/documentCenter/DsfButtonToolbox"
import file from "./file"
import urlJs from "@/common/url";
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";

export default {
	name: "TabCommonForm",
	components: {
		DsfButtonToolbox,
		textareEdit,
		selectPerson,
		file,
		Icon,
		Popup,
		Grid,
		GridItem,
		controlUserList,
		EnclosurePreview
	},
	data() {
		return {
			title: "",
			titledisabled: this.$route.params.pk && this.$route.params.tabIndex != 2 ? true : false,
			tures: true,
			fileUrl: "",
			filename: "",
			fileType: '',
			showFile: false,
			imgPreview: false,
			previewImg: [],
			users: "",
			usersid: "",
			personDate: [],
			maintitle: "",
			textareaContent: "",
			showPerson: false,
			radioVal: "",
			radioText: "",
			SendStatus: "-1",
			sendObj: {},
			smsContent: "",
			moduleId: this.$route.params.moduleId,
			attach_1: [],
			fileObj: {
				attach: []
			},
			initDate: {},
			isCreatForm: this.$route.params.pk ? false : true,
			userSchema: "",
			textareaTextVal: "",
			TabIndex: this.$route.params.tabIndex,
			forwardIds: this.$route.params.forwardIds || "",
			replyId: this.$route.params.replyId || "",
			pk: this.$route.params.pk || "",
			routeKey: this.$route.params.key,
			hf: "",
			buttons: {
				commonButtons: [],
				mainButtons: []
			},
			historyMsg: [],
			isSave: false,
			isAddSend: false,
			isback: false,
			isdisabled: this.$route.params.pk && this.$route.params.tabIndex != 2 ? true : false,
			selectUsersName: [],
			imgType: ['jpeg', 'bmp', 'webp', 'svgz', 'svg', 'gif', 'jpg', 'ico', 'png', 'tif'],
			showBtnNames: dsf.config.setting['SYS-MOBILE-FORM-0006'] || '发送,保存,删除',
			isShowSmsSend: dsf.config.setting['SYS-MOBILE-FORM-0007'] || -1, // 是否显示发送短信
			isShowHistoryMsg: dsf.config.setting['SYS-MOBILE-FORM-0008'] || -1, // 是否显示往来信息
			isShowUrgency: dsf.config.setting['SYS-MOBILE-FORM-0010'] || 1, // 是否显示紧急程度
			isShowContent: dsf.config.setting['SYS-MOBILE-FORM-0020'] || 1,
			accept: (dsf.util.checkSystem() == 'ios' || dsf.util.getClientName().includes('ding')) ? "*" : "image/*, application/*",
			isShowDownBtn: false,
			extra: {
				multiple: true,
				tabs: [{
					"name": "本机构",
					"action": "fn/user/select/data?types=person,department,post,privateGroup,own_group&rootObject=2&action=self_org&async=true&source=share",
					"subTabKey": "department"
				}]
			},
			fileTypes: {
				pdf: ["pdf"],
				img: [
					"jpeg",
					"bmp",
					"webp",
					"svgz",
					"svg",
					"gif",
					"jpg",
					"ico",
					"png",
					"tif",
				],
				txt: [
					"txt",
					"sql",
					"xml",
					"html",
					"css",
					"js",
					"java",
					"php",
					"bat",
					"log",
				],
				word: ["docx", "docm", "doc", "dotx", "dotm", "dot"],
				xls: [
					"xlsx",
					"xlsm",
					"xlsb",
					"xls",
					"xltx",
					"xltm",
					"xlt",
					"xlam",
					"xla",
					"ods",
				],
				ppt: [
					"pptx",
					"pptm",
					"ppt",
					"potx",
					"potm",
					"pot",
					"ppsx",
					"ppsm",
					"pps",
					"ppam",
					"ppa",
				],
			},
			hasFilePng: [
				"ai",
				"cloud",
				"html",
				"img",
				"jpg",
				"mp3",
				"mp4",
				"pdf",
				"png",
				"ppt",
				"psd",
				"rar",
				"txt",
				"word",
				"wps",
				"xls",
				"zip",
				"ofd",
			],
			popFile: {},
			fileData: {},

		}
	},
	watch: {
		"$route"(newVal, oldVal) {
			if (newVal.params.replyId || newVal.params.forwardIds) {
				this.titledisabled = newVal.params.pk ? true : false
				this.isdisabled = !newVal.params.pk && newVal.params.tabIndex != 2 ? true : false
				this.replyId = newVal.params.replyId == '0' ? "" : newVal.params.replyId
				this.forwardIds = newVal.params.forwardIds == '0' ? "" : newVal.params.forwardIds

				this.pk = ""
				this.tures = this.replyId || this.forwardIds ? false : true
				this.textareaTextVal = ""
				this.hf = this.replyId ? "(回复)" : ""
				this.buttons.mainButtons.forEach(item => {
					item.show = false
					if (item.type == 'send') {
						item.show = true
					}
				})
				this.initForm()
			}

		}
	},
	created() {

		if (dsf.util.checkSystem() != 'ios'&&(dsf.util.getClientName() == "app" || dsf.config.ddSetting.isDing) && !dsf.config.commonForm.NoDownload) {
			this.isShowDownBtn = true
		}
		if (dsf.config.setting.hasOwnProperty('SYS-MOBILE-FORM-0014') && dsf.config.setting["SYS-MOBILE-FORM-0014"] != "") {
			this.extra.tabs = JSON.parse(dsf.config.setting["SYS-MOBILE-FORM-0014"])
		}

		this.initForm();

		if(this.$route.query.formType == 'fileTask'){
			this.getTaskDetailAndInitPersonAndTitle()
		}
	},
	methods: {
		initButtons() {
			if (this.isCreatForm) { //拟稿
				this.buttons.mainButtons.push({
					name: "发送",
					action: "send",
					icon: "iconsend"
				}, {
					name: "保存",
					action: "save",
					icon: "iconbaocun"
				})
			} else {
				if (this.TabIndex == 2) { //草稿箱
					this.buttons.mainButtons.push({
						name: "发送",
						action: "send",
						icon: "iconsend"
					}, {
						name: "保存",
						action: "save",
						icon: "iconbaocun"
					})
					this.buttons.commonButtons.push({
						name: "删除",
						action: "del",
						icon: "icondelete"
					})
				} else if (this.TabIndex == 1) { //发件箱
					this.buttons.mainButtons.push({
						name: "转发",
						action: "forward",
						icon: "iconshare"
					}, {
						name: "增发",
						action: "addsend",
						icon: "iconshare"
					})
					this.buttons.commonButtons.push({
						name: "删除",
						action: "del",
						icon: "icondelete"
					}, {
						name: "讨论",
						action: "discuss",
						icon: "iconcomment-processing-outline"
					})
				} else { // 收件箱
					this.buttons.mainButtons.push({
						name: "回复",
						action: "replay",
						icon: "iconreply"
					}, {
						name: "转发",
						action: "forward",
						icon: "iconshare"
					}, {
						name: "阅读情况",
						action: "readStatus",
						icon: "iconemail-open"
					}, {
						name: "转发情况",
						action: "forwardStatus",
						icon: "iconcontact-mail"
					})
					this.buttons.commonButtons.push({
						name: "删除",
						action: "del",
						icon: "icondelete"
					}), {
						name: "讨论",
						action: "discuss",
						icon: "iconcomment-processing-outline"
					}
				}
				if (this.forwardIds || this.replyId) { //转发
					this.isdisabled = false
					this.buttons.mainButtons = []
					this.buttons.commonButtons = []
					this.buttons.mainButtons.push({
						name: "发送",
						action: "send",
						icon: "iconsend"
					}, {
						name: "保存",
						action: "save",
						icon: "iconbaocun"
					})
				}
				if (!dsf.config.ddSetting.isDing) {
					this.removeDiscussBtn();
				}

				// if (self.initDate.userId ) {
				//     this.buttons.commonButtons=this.buttons.commonButtons.filter(item=>item.action!="del");
				// }
				this.getHistoryMsg();
			}
			// this.showBtnNames = "发送,保存,删除,讨论,转发";
			//根据配置显示按钮
			this.buttons.commonButtons = this.buttons.commonButtons.filter((item) => {
				return (',' + this.showBtnNames + ',').includes(',' + item.name + ',')
			})
			this.buttons.mainButtons = this.buttons.mainButtons.filter((item) => {
				return (',' + this.showBtnNames + ',').includes(',' + item.name + ',')
			})
		},
		//移除讨论按钮
		removeDiscussBtn() {
			this.buttons.mainButtons.forEach((item, index) => {
				if (item.action == 'discuss') {
					this.buttons.mainButtons.splice(index, 1)
				}
			})
			this.buttons.commonButtons.forEach((item, index) => {
				if (item.action == 'discuss') {
					this.buttons.commonButtons.splice(index, 1)
				}
			})
		},
		delUser(username, userindex) {
			let self = this
			self.usersid = self.usersid.split(',').filter((item, index) => {
				return index != userindex
			}).join(",");
			self.users = self.users.split(',').filter((item, index) => {
				return index != userindex
			}).join(",");
			self.selectUsersName.splice(userindex, 1);
			self.userSchema = self.userSchema.split(',').filter((item, index) => {
				return index != userindex
			}).join(",");
		},
		//初始化数据
		initForm() {
			let self = this
			let obj = {
				moduleId: self.moduleId,
				pk: self.pk
			}
			if (self.forwardIds.length > 1) {
				delete obj.pk
				obj.forwardIds = self.forwardIds
			}
			if (self.replyId.length > 1) {
				delete obj.pk
				obj.replyId = self.replyId
			}
			if (this.$route.query.formType) {
				obj.formType = this.$route.query.formType
			}
			if (this.$route.query.formPk) {
				obj.formPk = this.$route.query.formPk
			}
			dsf.http.post("fn/mobileNote/getNotepaperById", obj).then((data) => {
				self.title = data.data.title || "便笺";
				urlJs.setTitle(self.title);
				self.initDate = data.data
				self.users = self.isCreatForm ? "" : self.initDate.rangeName
				self.usersid = self.initDate.range || ""
				self.users = self.initDate.rangeName || ""
				self.selectUsersName = self.users.split(",")
				self.userSchema = self.initDate.rangeSchema || ""
				self.maintitle = self.initDate.noteTitle || ""
				if (self.initDate.jjcd != undefined) {
					self.radioVal = self.isCreatForm ? "" : String(self.initDate.jjcd)
					self.radioText = self.isCreatForm ? "" : String(self.initDate.jjcdText)
				} else {
					self.radioVal = ""
				}
				self.textareaTextVal = self.isCreatForm ? "" : (self.initDate.content ? String(self.initDate.content) : " ")
				self.textareaContent = self.textareaTextVal
				self.attach_1 = self.initDate.file ? self.initDate.file.attach : []
				self.attach_1.sort(function (a, b) {
					return Date.parse(b.time) - Date.parse(a.time);
				}); //根据上传时间倒序排序
				if (self.pk) {
					self.SendStatus = self.isCreatForm ? "" : (self.initDate.isSms ? String(self.initDate.isSms) : "");
				}
				self.initButtons()

				self.$eventBus.refreshBadge(self, 0);//加载完数据刷新角标，去除已读角标
			})
		},
		//获取往来便签
		getHistoryMsg() {
			const params = {
				moduleId: this.moduleId,
				pk: this.pk
			}
			dsf.http.post("fn/mobileNote/getToAndGo", params).then((data) => {
				this.historyMsg = data.data.data
			})
		},
		handlerBtn(btnType) {
			switch (btnType) {
				case "send": //发送
					this.handlerSend(btnType)
					break
				case "save": //保存
					this.handlerSave(btnType)
					break
				case "del": //删除
					this.handlerDel(btnType)
					break
				case "forward": //转发
					this.handlerForward(btnType)
					break
				case "addsend": //增发
					this.handlerAddSend()
					break
				case "replay": //回复
					this.handlerReplay(btnType)
					break
				case "discuss": //回复
					this.createChatGroup(btnType)
					break
				case "readStatus": // 阅读情况
					this.readStatus()
					break
				case "forwardStatus": // 转发情况
					this.forwardStatus()
					break

			}
		},
		readStatus() {
			this.$router.push({
				path: '/commontabs/ydqk',
				query: {
					sourceId: this.initDate.sourceId
				}
			})
		},
		forwardStatus() {
			this.$router.push({
				path: '/commonList',
				query: {
					fileType: 'zfqk',
					id: this.initDate.id
				}
			})
		},
		createChatGroup() {
			dsf.http.get(`fn/mobileNote/getMeetingUsersByNotepaper`, {
				pk: this.pk
			})
				.then(({
					data
				}) => {
					if (data.code == "200") {
						dsf.dd.createChatGroup(data.data)
							.catch(err => {
								console.log(err)
							})
					}

				})
			// dsf.dd.createChatGroup(["501242", "501657", "635704"]);
		},
		Ding() {
			let textData = dsf.http.get(`fn/common/getFileInfo?pk=${this.pk}`)
			let dingUser = dsf.http.get(`fn/mobileNote/getMeetingUsersByNotepaper?pk=${this.pk}`)
			Promise.all([textData, dingUser])
				.then(([{
					data: btData
				}, {
					data: {
						data: users
					}
				}]) => {
					let text = `您有一份标题为【${btData.bt}】的文件未处理，请及时处理！`
					dsf.dd.Ding({
						users: users,
						type: 2, // 附件类型 1：image  2：link
						alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
						text: text,
						attachment: {
							images: [""]
						},
						bizType: 0,
						confInfo: {
							bizSubType: 0,
							location: "会议室",
							remindMinutes: 30,
							remindType: 2
						},
						taskInfo: {
							taskRemind: 30
						},
						onSuccess: function () {
							console.log("Ding:success")
						},
						onFail: function () {
							console.log("Ding:onFail")
						}
					})
				}).catch(err => {
					console.log(err)
				})
		},
		//回复
		handlerReplay(index) {
			this.$router.push({
				path: "/TabCommonForm/" + this.routeKey + "/1/" + this.moduleId + "/" + this.pk + "/0/" +
					this.pk,
				query: this.$route.query
			});
		},
		//转发
		handlerForward(index) {
			this.$router.push({
				path: "/TabCommonForm/" + this.routeKey + "/1/" + this.moduleId + "/" + this.pk + "/" + this
					.pk + "/0",
				query: this.$route.query
			});
		},
		//增发
		handlerAddSend() {
			let self = this
			self.isAddSend = true
			self.selectPerson()
		},
		addSendSelUserBack(data) {
			let self = this
			data.forEach(idx => {
				idx.userSchemaId = "1::" + idx.id
			})
			let params = {
				notePaperIds: self.pk,
				receiveUserIds: data.map(item => item.id).join(","),
				receiveUserNames: data.map(item => item.name).join(","),
				receiveUserSchemas: data.map(item => item.userSchemaId).join(","),
				moduleId: self.moduleId
			};
			dsf.http.post("fn/notepaper/batchCreate", params).then(({
				data
			}) => {
				if (data.code == 200) {
					dsf.layer.toast("发送成功", true, () => {
						this.$router.back()
					})
				}
				//console.log(data);
			})
		},
		//删除
		handlerDel() {
			const data = [{
				pk: this.$route.params.pk,
				moduleId: this.$route.params.moduleId
			}]
			const delParams = {
				data: JSON.stringify(data),
				moduleId: this.$route.params.moduleId
			}
			this.$dialog.confirm({
				title: '提示',
				message: '确定要删除吗？'
			}).then(() => {
				let url = dsf.config.setting['SYS-MOBILE-FORM-0017'] || 'fn/recycle/logic'
				dsf.http.post(url, delParams).then((data) => {
					this.bandlerBack("back")
				})
			}).catch(() => { });
		},

		//草稿箱--发送
		handlerSend(type) {
			this.onSubmit(type)
		},
		//草稿箱---保存
		handlerSave(type) {
			this.isback = true
			this.onSubmit(type)
		},
		//表单验证
		onSubmit(type) {
			const loading = dsf.layer.loading("加载中...");
			if (!this.users) {
				this.$toast.fail("请选择接收人")
				return
			}
			if (!this.maintitle) {
				this.$toast.fail("请输入主题")
				return
			}
			if (this.isShowUrgency == 1 && !this.radioVal && this.radioVal != "undefined") {
				this.$toast.fail("请选择紧急程度")
				return
			}
			if (this.isShowContent == 1 && !this.textareaContent) {
				this.$toast.fail("请输入内容")
				return
			}
			this.sendObj = {
				id: this.initDate.id,
				noteTitle: this.maintitle,
				content: this.textareaContent,
				range: this.usersid,
				rangeName: this.users,
				rangeSchema: this.userSchema,
				jccd: this.radioVal,
				jccdText: this.radioText,
				isSms: this.SendStatus || "-1",
				isSmsText: this.initDate.bjIsSms == '-1' ? "" : (this.SendStatus == "-1" ? "否" : "是"),
				smsContent: this.smsContent,
				file: {
					attach: this.attach_1
				},
			}
			if (this.replyId.length > 1) {
				this.$set(this.sendObj, "replyId", this.replyId)
			}
			if (this.forwardIds.length > 1) {
				this.$set(this.sendObj, "forwardIds", this.forwardIds)
			}
			const __DATA = JSON.stringify(this.sendObj)
			const sendData = {
				__DATA: JSON.stringify(this.sendObj),
				moduleId: this.moduleId
			}
			let url = type == 'save' ? "fn/mobileNote/save" : "fn/mobileNote/send"
			dsf.http.post(url, sendData).then((parm) => {
				if (parm.data.result) {
					dsf.layer.closeLoading(loading)
					let message = type == 'send' ? '发送成功' : '保存至草稿箱'
					let self = this
					dsf.layer.toast(message, true, () => {
						if (type != 'save' || this.isback) {
							self.bandlerBack("back")
						} else {
							self.isSave = true
						}
					})
				} else {
					dsf.layer.toast(parm.data.message)
				}
			})
		},

		//返回上一页
		bandlerBack(type) {
			if (this.isCreatForm && type != 'back' && !this.isSave) {
				this.$dialog.confirm({
					title: '提示',
					message: '填写内容还未保存，是否将内容保存为草稿'
				}).then(() => {
					this.handlerSave("save")
				}).catch(() => {
					// this.$router.push({name:'customTabs',key:this.key})
					//this.$router.back()
					if (window.dd) {
						if (window.dd.biz) {
							this.$router.back();
							//window.dd.biz.navigation.goBack()
						} else {
							this.$router.back();
						}
					} else if (window.wx && this.$route.query.closePage == 1) {
						window.wx.closeWindow();
					} else {
						this.$router.back();
					}
				});
			} else {
				this.$eventBus.refreshBadge(this, 0);
				this.$eventBus.refresh(this);
				// this.$router.push({name:'customTabs',key:this.key})
				if (window.dd) {
					if (window.dd.biz) {
						this.$router.back();
						//window.dd.biz.navigation.goBack()
					} else {
						this.$router.back();
					}
				} else if (window.wx && this.$route.query.closePage == 1) {
					window.wx.closeWindow();
				} else {
					this.$router.back();
				}
			}
		},
		//上传文件
		doFileRead(file, filetype) {
			let self = this;
			let url =
				"/fn/mobileAttachment/upload?fileId=&moduleId=" + this.moduleId + "&mid=" + this.moduleId +
				"&pId=0&pnId=0&nodeName=" + encodeURI("拟稿") + "&nrType=" + filetype + "&pk=" + this.initDate.id +
				"&newFileFlag=0";
			dsf.http
				.upload(url, {}, file)
				.then(function (data) {
					if (data.data.data) {
						self.fileObj.attach.unshift(data.data.data); //倒序
						self.$toast.clear();
						self.attach_1.unshift(data.data.data); //倒序
					} else {
						dsf.layer.toast(data.data.message)
					}
				});
		},
		afterRead(file) {
			let that = this
			this.$toast.loading({
				message: '上传中...',
				forbidClick: true,
				duration: 0,
				overlay: true
			});
			that.doFileRead(file, 1)

		},
		closeFile() {
			this.showFile = false;
			this.$refs.enclosurePreview?.destroyInterval(); // 关闭自动重试定时器
		},
		//打开附件
		openFile(item) {
			if (!(this.$route.params.forwardIds && this.$route.params.forwardIds == this.$route.params.pk)) {
				this.popFile = {
					id: item.fileId,
					name: item.fileName
				};
				this.filename = item.fileName
				this.fileType = item.fileName.substr(item.fileName.lastIndexOf(".") + 1)
				var timestamp = new Date().getTime()
				const loginToken = dsf.util.loadSessionStore("loginToken");
				const downUrl = dsf.url.getServerUrl(
					`fn/file/download?infoId=${this.pk}&fileId=${item.fileId}&fileName=${item.fileName}&nrType=1&moduleId=${this.moduleId}&x-auth-token=${loginToken}&fullfilename=${item.fileName}`
				)
				let url = ''
				if (this.imgType.indexOf(this.fileType) > -1) { // 图片格式的预览地址
					url = dsf.url.getServerUrl(
						`fn/mobileFileDownload/download?fileId=${item.fileId}&moduleId=${this.moduleId}&fileName=${item.fileName}`
					);
					this.imgPreview = true;
					this.previewImg = [url];
				} else {
					url = dsf.url.getServerUrl(
						`fn/office/openMobileOffice?fileId=${item.fileId}&fileName=${item.fileName}&moduleId=${this.moduleId}&x-auth-token=${loginToken}`
					)
					if (dsf.config.previewSetting.previewType == 4) {
						dsf.http.post(`fn/office/mobile/wpsPreview`, {
							fileId: item.fileId,
							readOnly: item.canEdit > 0 ? true : false
						}).then(({
							data
						}) => {
							this.showFile = true
							this.fileUrl = data.data
						})
					} else if (dsf.config.commonForm.webViewPreview) {
						let tempurl = dsf.url.getRootPath() + url.replace("../", "")
						console.log(tempurl)
						xsfWindow.openWebView({
							"title": item.fileName,
							"url": tempurl,
							"colorString": "#111111"
						});
					} else {
						this.showFile = true
						this.fileUrl = url
					}
				}
			}

		},
		//下载附件
		downFile(item) {
			//console.log(item)
			const loginToken = dsf.util.loadSessionStore("loginToken");
			const downUrl = dsf.url.getRootPath() + `fn/file/download?infoId=${this.pk}&fileId=${item.fileId}&fileName=${item.fileName}&nrType=1&moduleId=${this.moduleId}&x-auth-token=${loginToken}&fullfilename=${item.fileName}`

			if (dsf.util.getClientName() == "app") {
				// $iaction.downloadFile({
				//     "url": downUrl,
				//     "title": item.showName
				// }, function (s) {
				//     alert(s);
				// }, function (e) {
				//     alert(e);
				// });

				var fileTransfer = new FileTransfer();
				var uri = encodeURI(downUrl);
				let filename =
					item.showName.substr(0, item.showName.indexOf(".")) +
					moment(new Date()).format("YYYYMMDDHHss") +
					item.showName.substr(item.showName.indexOf("."));
				let fileURL = cordova.file.externalRootDirectory + "/Download/item/" + filename;

				fileTransfer.download(
					uri,
					fileURL,
					function (entry) {
						dsf.layer.alert({
							message: "文件已下载到 " + "/Download/item/" + filename,
						});
					},
					function (error) {
						console.log("download error source " + error.source);
						console.log("download error target " + error.target);
						console.log("upload error code" + error.code);
					},
					false, {
					headers: {
						Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==",
					},
				}
				);

			} else {
				window.open(downUrl)
			}
		},
		//删除附件
		removeFile(item, index) {
			dsf.layer.confirm({
				message: '是否确认删除',
				confirmButtonText: '确认'
			}, () => {
				let that = this;
				this.$toast.loading({
					message: '删除中...',
					forbidClick: true,
					duration: 0,
					overlay: true
				});
				let params = {
					pk: this.$route.params.pk,
					fileId: item.fileId,
					moduleId: this.moduleId,
					mid: this.moduleId,
					nrType: 1,
					fileName: item.fileName
				}
				dsf.http
					.post("/fn/mobileFileUpload/delete", params)
					.then(function (data) {
						that.$toast.clear()
						that.attach_1.splice(index, 1)
					});
			})
		},
		handleActionClick() { },
		//获取紧急程度
		getRadioVal(item) {
			this.radioText = item.codeName
		},
		//开始选人
		selectPerson() {
			if (this.isAddSend || this.TabIndex == 2 || this.isCreatForm || this.forwardIds || this.replyId) {
				this.showPerson = true
			} else {
				this.showPerson = false
				if (this.replyId) {
					this.showPerson = false
				} else {
					if (this.forwardIds) {
						this.showPerson = true
					}
				}
			}
		},
		//结束选人
		cancePerson() {
			this.showPerson = false
		},
		//获取选人
		getSelectUser(data) {
			if (this.isAddSend) {
				this.addSendSelUserBack(data)
				this.isAddSend = false
			} else {
				this.personDate = data
				this.selectUsersName = data.map(item => item.name)
				this.users = data.map(item => item.name).join(",")
				this.usersid = data.map(item => item.id).join(",")
				data.forEach(idx => {
					idx.userSchemaId = idx.type + "::" + idx.id
				})
				this.userSchema = data.map(item => item.userSchemaId).join(",")
			}
			this.cancePerson();
		},
		//获取富文本编辑器内容
		getTextValue(value) {
			this.textareaContent = value
		},
		getIconClass(title) {
			let startIndex = title.lastIndexOf(".");
			let str =
				startIndex > -1 ?
					title.substring(startIndex + 1, title.length).toLowerCase() :
					"";
			if (this.hasFilePng.indexOf(str) > -1)
				return require(`static/images/fileType/${str}.png`);
			for (let key in this.fileTypes) {
				let value = this.fileTypes[key];
				if (value.indexOf(str) > -1) {
					return require(`static/images/fileType/${key}.png`);
				}
			}
			return require(`static/images/fileType/word.png`);
		},
		 // 获取表单基本信息
		getTaskDetailAndInitPersonAndTitle(){
			let that = this

            dsf.http.get(`/fn/xform/getInfo?moduleId=230103192045EncoYZoaQ9Zee0afJmh&pk=${this.$route.query.formPk}&listId=230105153446TgUC3NjwR3polqywEQp&validateByList=1&method=privilege&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                if (res.data.data) {
                    let data = res.data.data;
                    let struct = res.data.struct;

					let mainInfo = data.main
					console.log(mainInfo)
                    // 整合所有任务相关人
                    if (mainInfo['C-TASKMAN-TASK-0001'] && mainInfo['C-TASKMAN-TASK-0002']) {
						let names = ""
						let value = ""
						let schema = ""
						if(mainInfo['C-TASKMAN-TASK-0002'].value.includes(mainInfo['C-TASKMAN-TASK-0001'].value)){
							names = mainInfo['C-TASKMAN-TASK-0002'].text
							value = mainInfo['C-TASKMAN-TASK-0002'].value
							schema = mainInfo['C-TASKMAN-TASK-0002'].schema
						}else{
							names = mainInfo['C-TASKMAN-TASK-0001'].text+','+ mainInfo['C-TASKMAN-TASK-0002'].text
							value = mainInfo['C-TASKMAN-TASK-0001'].value+','+ mainInfo['C-TASKMAN-TASK-0002'].value
							schema = mainInfo['C-TASKMAN-TASK-0001'].schema+','+ mainInfo['C-TASKMAN-TASK-0002'].schema
						}

						this.selectUsersName = names.split(",")
						this.users = names
						this.usersid = value
						this.userSchema = schema
                    }
					//标题赋值
					this.maintitle = mainInfo['C-TASKMAN-TASK-0006'].value
                }
            })
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.van-nav-bar {
	@include font-theme("normal");

	.van-icon {
		@include font-theme("normal");
		@include font_5;
		margin-right: 3px;
	}
}

.commonBox {
	flex: 1;
	display: flex;
	justify-content: flex-end;
}

.btnItem {
	width: 45px;
	height: 45px;
	text-align: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

.edit {
	padding: 0 16px;
	position: relative;
	font-size: 0.3rem;
	color: #323233;

	&::after {
		position: absolute;
		box-sizing: border-box;
		content: " ";
		pointer-events: none;
		right: 16px;
		bottom: 0;
		left: 16px;
		border-bottom: 1px solid #cfcfcf;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.bandhtml {
		padding-bottom: 16px;
		//min-height: 200px;
		//border: 1px solid gainsboro;
		//padding: 10px;
	}
}

.selectUser {
	flex: 1;
	overflow: auto;
	//white-space: nowrap;
	max-height: 80px;
	min-height: 26px;

	span {
		display: inline-block;
		background: #dbeefe;
		padding: 2px 8px;
		font-size: var(--font_size_3);
		border-radius: 30px;
		margin: 1px 4px 1px 0;
	}
}

.fgx {
	font-size: 18px;
}

.selTxt {
	vertical-align: middle;
	height: 12px;
	line-height: 2px;
	display: inline-block;
}

.historyBox {
	background: #fff;
	padding: 10px;
	//margin-bottom: 70px;
	padding-bottom: 75px;

	.historyItem {
		padding: 10px 0.3rem;
		box-shadow: 0 0 5px gainsboro;
		border-radius: 5px;
		margin-bottom: 0.3rem;
	}

	.line {
		font-size: var(--font_size_0);

		span {
			font-size: var(--font_size_3);
			color: #666;
		}
	}
}

.bianjianbox {
	// padding-top:46px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	position: relative;
	height: 100%;
	// padding-bottom: 72px;
	overflow-x: hidden;
}

.tabForm .radioItem {
	margin-bottom: 5px;
	margin-top: 5px;
}

// .file {
//     // border: 1px solid #cfcfcf;
//     padding: 16px;
//     margin: 8px 16px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;

//     span {
//         color: #999;
//         flex: 1;
//     }
// }

.van-field {
	font-size: 0.3rem !important;

	::v-deep .van-field__body {
		align-items: start;
	}

	.van-field__right-icon .van-icon {
		@include font-theme("normal");
		font-weight: bold;
		font-size: 0.36rem;
		display: inline-block !important;
	}

	.van-field__label {
		span {
			font-size: 0.3rem !important;
			color: #323233 !important;
		}
	}
}

.van-cell {
	font-size: var(--font_size_2);
	padding: 16px;

	&::after {
		border-bottom: 1px solid #cfcfcf;
	}
}

.form {
	// height: 100%;
	flex: 1;
	height: initial;
	overflow-y: auto;
	overflow-x: hidden;
	// margin-top: 50px;
}

.footer {
	position: fixed;
	bottom: 0;
	height: 1.2rem;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	border-top: 1px solid #f1f1f1;
	padding: 0 10px;
	box-sizing: border-box;
}

.footer .btn {
	margin: 0px 5px;
	// font-size: 0.3rem;
	// line-height: 1.27rem;
}

.file-preview {
	// display: flex;
	// flex-direction: column;
	// height: 90vh;
}

.fileList {
	.file {
		position: relative;
		padding: 10px;
		margin: 0px 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		span {
			color: #999;
			flex: 1;
		}

		// flex-direction: column;
		// overflow: hidden;
		.fileBody {
			flex: 1;
			overflow: hidden;

			.fileTitle {
				font-size: var(--font_size_2);
				width: 90%;

				i {
					@include font-theme("normal");
					display: inline-block;
					transform: rotate(-45deg);
					font-size: 18px;
				}
			}

			.fileSize {
				display: flex;
				color: #999;
				padding-top: 10px;
			}

			.fileDelButton {
				display: inline-block;
				text-align: center;
				white-space: nowrap;
				font-size: var(--font_size_0);
				color: black;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}

	.fileIcon {
		width: 38px;
		height: 48px;
		margin-right: 10px;
		line-height: 48px;

		i {
			margin-top: 10px;
			font-size: 36px;
			color: #999;
		}
	}

	.fileBtn {
		// text-align: right;
		margin-top: 25px;

		.fileButton {
			display: inline-block;
			// width:48px;
			text-align: center;
			border-radius: 24px;
			border: 1px solid #e5e5e5;
			white-space: nowrap;
			padding: 0 10px;
			font-size: var(--font_size_4);
			line-height: 21px;
		}
	}
}
</style>
