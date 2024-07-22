<template>
	<div class="control_label" :class='{"label-center": getAlign == "center"}' :style="{textAlign: getAlign}">
		<i v-if="metaData.icon" :class="['iconfont', metaData.icon, {'icon-active': metaData.validator.required}]"></i>
    <span v-else :class="['size-'+labelValue.showLevel, {'label-active': metaData.validator.required}]" v-html="this.metaData.label||'请输入'"><template v-if='labelValue.colon'>:</template></span>
	</div>
</template>

<script>
	export default {
		name: 'controlLabel',
		props: {
			fieldValue: {
				type: Object,
			},
			metaData: {
				type: Object
			}
		},
		data() {
			return {
				labelValue: {
					showActive: false,
					showLevel: 1,
					text: ''
				}
			}
		},
		computed: {
			getAlign() {
				return dsf.config.clientType == 'mobile' ? "left" : (dsf.config.commonForm.padLabellayout || 'left')
			}
		},
		created() {
			// this.labelValue.text=this.metaData.label
			this.labelValue.showLevel = dsf.config.commonForm.fontLevel ? dsf.config.commonForm.fontLevel : 2;
			if (this.metaData.validator.required) {
				this.labelValue.showActive = true
			} else {
				this.labelValue.showActive = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.control_label {
		width: 100%;
		box-sizing: border-box;
		height: 100%;
		// padding-right: 0;
		padding-left: 10px;
		text-align: left;
		// display: inline-block;
		position: relative;
		line-height: 24px;
		font-size: var(--font_size_2);
    color: #333;
		// font-size: var(--font_size_3);
		// font-weight: 500;
		float: left;
    .iconfont {
      font-size: 22px;
      color: #666;
      vertical-align: bottom;
    }
		.size-1 {
			font-size: var(--font_size_3);
			// font-weight: 500;
		}

		.size-2 {
			font-size: 0.3rem;
			// font-weight: 600;
		}

		.size-3 {
			font-size: var(--font_size_2);
			// font-weight: 700;
		}

		.size-4 {
			font-size: var(--font_size_1);
			// font-weight: 700;
		}

		.size-5 {
			font-size: 0.36rem;
			// font-weight: 700;
		}
	}

	.label-active {
		&:before {
			// position: absolute;
			// font-size: var(--font_size_3);
			color: #E02020;
			left: 8px;
			content: '*';
		}
	}
  .icon-active {
    &:after {
			content: '*';
			color: #E02020;
      font-size: var(--font_size_2);
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
	/* .label-icon{
    display:none;
    color:red
} */
	.t-justify {
		width: 100%;
		display: inline-block;
		text-align-last: justify;
		text-align: justify;
		vertical-align: middle;
	}
	.label-center {
		padding: 0 6px;
		justify-content: center;
	}
</style>
