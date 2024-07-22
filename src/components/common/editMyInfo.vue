<template>
	<div id="edit-my-info">
		<van-form @submit="onSubmit">
			<div class="m-top_10">
				<van-field v-model="defaultVal" clearable type="tel" name="phone" :label="defaultLabel" :placeholder="defaultPlace"
					:rules="phoneRules" />
			</div>
			<div class="btn-container">
				<van-button class="btn" type="info" native-type="submit">保存</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	export default {
		name: 'editMyInfo',
		data() {
			return {
				defaultVal: '',
				userInfo: null
			}
		},
		computed: {
			defaultLabel() {
				if(this.$route.params.key == 'mobile') return '手机号'
				else if(this.$route.params.key == 'phone') return '内线电话'
			},
			defaultPlace() {
				if(this.$route.params.key == 'mobile') return '请输入手机号'
				else if(this.$route.params.key == 'phone') return '请输入内线电话'
			},
			phoneRules() {
				if(this.$route.params.key == 'mobile') {
					return [
						{ validator: (value) => value !== '', message: `请输入手机号` },
						{ pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, message: '请输入正确手机号' }
					]
				} else if(this.$route.params.key == 'phone') {
					return [
						{ validator: (value) => value !== '', message: `请输入内线电话` },
						{ pattern:/^[0-9]*$/, message: '请输入正确电话' }
					]
				}
			}
		},
		async created() {
			this.userInfo = dsf.util.loadSessionStore('user');
			if (this.userInfo && this.$route.params.key == 'phone') {
				dsf.http.get(`fn/subscript/getAllUserInfo?userId=${this.userInfo.user_id}`, {}).then(({
					data
				}) => {
					if (data.type == 'success') {
						this.defaultVal = data.data.innerTel.value;
					} else {
						dsf.layer.toast('获取数据失败');
					}
				}).catch((err) => {
					dsf.layer.toast('获取数据失败');
				})
			} else if (this.userInfo && this.userInfo[this.$route.params.key]) {
				this.defaultVal = this.userInfo[this.$route.params.key];
			}
		},
		mounted() {

		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			onSubmit() {
				if (this.$route.params.key == 'mobile' && !this.validateMobile()) return;
				if (this.$route.params.key == 'phone' && !this.validateTelephone()) return;
				let postData = {
					key: this.$route.params.key,
					value: this.defaultVal
				}
				if (this.$route.params.key == 'phone') {
					dsf.http.get(`fn/subscript/updateInnerPhone?userId=${this.userInfo.user_id}&phone=${this.defaultVal}`, {}).then(({
						data
					}) => {
						if (data.type == 'success') {
							dsf.layer.toast('修改信息成功');
							this.$router.go(-1);
						} else {
							dsf.layer.toast('修改信息失败,请稍后再试');
						}
					}).catch((err) => {
						dsf.layer.toast('修改信息失败,请稍后再试');
					})
				} else {
					dsf.http.post('/fn/mobileUserData/update', {
						__DATA: JSON.stringify(postData)
					}).then(({
						data
					}) => {
						console.log(data)
						if (data.success == 'success') {
							this.userInfo[this.$route.params.key] = this.defaultVal;
							dsf.util.saveToLocalStore('user', this.userInfo);
							dsf.util.saveToSessionStore('user', this.userInfo);
							dsf.layer.toast('修改信息成功');
							this.$router.go(-1);
						} else {
							dsf.layer.toast('修改信息失败,请稍后再试')
						}
					}).catch((err) => {
						dsf.layer.toast('修改信息失败,请稍后再试');
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/styles/themes.scss';
	@import '../../assets/styles/mixin.scss';

	#edit-my-info {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		font-size: var(--font_size_2);
	}

	.m-top_10 {
		margin-top: 10px;
	}

	.edit-input {
		width: 100%;
		padding: 10px;
	}

	.btn-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20px;
		.btn{
			width: 100%;
		}
	}

	.c-black {
		color: black;
	}
</style>
