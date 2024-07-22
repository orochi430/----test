let formData = {
	relations: [//存放控件之间关系，第一版暂时没用
		{
		}
	],
	controls: [
		{
			controlId: "a0001",//唯一标识
			label: "文本框",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "C-GW-FW-0001",//元数据编号（非元数据控件为空）
			controlType: "controlTextBox",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "文本框提示信息,输入文字后消失",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format
			readonly:false,

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

				formatterFn:'fn',//实时验证函数 (正则)
				
			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},

			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: "上海",
					value: "shanghai"
				},
				{
					text: "成都",
					value: "chengdu"
				}
			]
		},
		{
			controlId: "b0001",//唯一标识
			label: "时间选择",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "B0001",//元数据编号（非元数据控件为空）
			controlType: "controlDateTime",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "文本框提示信息,输入文字后消失",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' }//带自动完成的组件，比如文本框，action为请求地址
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: "上海",
					value: "shanghai"
				},
				{
					text: "成都",
					value: "chengdu"
				}
			]
		},
		{
			controlId: "b0002",//唯一标识
			label: "选择框",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "A0032",//元数据编号（非元数据控件为空）
			controlType: "controlFileCode",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "多重选择",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, message: "超过填写范围" },
				length: { maxLength: 50, message: "超出最大长度" },
				number: {},
				required: { require: false, message: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' }//带自动完成的组件，比如文本框，action为请求地址
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b0003",//唯一标识
			label: "开关",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "A0033",//元数据编号（非元数据控件为空）
			controlType: "controlSwitcher",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "多重选择",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: false, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' }//带自动完成的组件，比如文本框，action为请求地址
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b0004",//唯一标识
			label: "评分",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "C-GW-FW-0004",//元数据编号（非元数据控件为空）
			controlType: "controlRate",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "多重选择",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: false, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

				allowHalf:true,//评分是否允许选择半星
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		// {
		// 	controlId: "b0005",//唯一标识
		// 	label: "富文本",//标签名称
		// 	showLevel: "1",//显示级别（大小、加粗等由前端决定）
		// 	metaId: "C-GW-FW-0202",//元数据编号（非元数据控件为空）
		// 	controlType: "controlEditor",//控件名称 ，详情参见excel中定义的约50种控件
		// 	placeholder: "多重选择",//默认显示信息
		// 	defaultValue: "默认值",//默认值
		// 	format: "yyyy-MM-dd", //日期增加format

		// 	restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
		// 		minDate: "1999-01-01",//日期增加可选区间
		// 		maxDate: "2020-10-10",
		// 		inputType: "positiveInteger",//输入类型限制，正整数

		// 	},
		// 	privilege: {//权限控制
		// 		editable: true,//是否可编辑
		// 		visible: true, //是否显示
		// 	},
		// 	validator: {//校验规则
		// 		lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
		// 		length: { maxLength: 50, tips: "超出最大长度" },
		// 		number: {},
		// 		required: { require: false, tips: "此项必填" },
		// 	},
		// 	extra: {//控件的额外属性
		// 		tabs: [{//用户（代码）选择使用
		// 			name: "本处室",
		// 			action: "/user?id=1"
		// 		}, {
		// 			name: "本机构",
		// 			action: "/user?id=1"
		// 		}],
		// 		multiple: true, //是否多选，用户（代码）选择
		// 		rows: 3,//文本域行数
		// 		autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

		// 		allowHalf:true,//评分是否允许选择半星
		// 	},
		// 	enumData: [//枚举型的数据//下拉框，复选框、单选框需要
		// 		{
		// 			text: '浙江',
					
		// 		},
		// 		{
		// 			text: '福建',
					
		// 		},
		// 	]
		// },
		{
			controlId: "b0006",//唯一标识
			label: "下拉框",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "A0038",//元数据编号（非元数据控件为空）
			controlType: "controlComboBox",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "下拉框",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

				allowHalf:true,//评分是否允许选择半星
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b0007",//唯一标识
			label: "数字框",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "A0037",//元数据编号（非元数据控件为空）
			controlType: "controlNumberBox",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "数字框",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

				allowHalf:true,//评分是否允许选择半星
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b0008",//唯一标识
			label: "单选框",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "A0041",//元数据编号（非元数据控件为空）
			controlType: "controlRadio",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "单选框",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

				allowHalf:true,//评分是否允许选择半星
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b0009",//唯一标识
			label: "文本域",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "A0042",//元数据编号（非元数据控件为空）
			controlType: "controlTextarea",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "文本域",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

				allowHalf:true,//评分是否允许选择半星
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b00010",//唯一标识
			label: "复选框",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "A0040",//元数据编号（非元数据控件为空）
			controlType: "controlCheckBox",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "复选框",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

				allowHalf:true,//评分是否允许选择半星
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b00011",//唯一标识
			label: "会议室",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "B0035",//元数据编号（非元数据控件为空）
			controlType: "meetingRoomControl",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "会议室选择",//默认显示信息
			defaultValue: "默认值",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "1999-01-01",//日期增加可选区间
				maxDate: "2020-10-10",
				inputType: "positiveInteger",//输入类型限制，正整数

			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: true, //是否显示
			},
			validator: {//校验规则
				lengthRange: { begin: 0, end: 50, tips: "超过填写范围" },
				length: { maxLength: 50, tips: "超出最大长度" },
				number: {},
				required: { require: true, tips: "此项必填" },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "本处室",
					action: "/user?id=1"
				}, {
					name: "本机构",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 3,//文本域行数
				autoComplete: { action: 'fn/getCity' },//带自动完成的组件，比如文本框，action为请求地址

				allowHalf:true,//评分是否允许选择半星
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				{
					text: '浙江',
					
				},
				{
					text: '福建',
					
				},
			]
		},
		{
			controlId: "b0012",//唯一标识
			label: "选择用户",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "C-GW-FW-0112",//元数据编号（非元数据控件为空）
			controlType: "controlUser",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "请选择用户",//默认显示信息
			defaultValue: "",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "",//日期增加可选区间
				maxDate: "",
				inputType: "",//输入类型限制，正整数
			},
			privilege: {//权限控制
				editable: false,//是否可编辑
				visible: false, //是否显示
			},
			validator: {//校验规则
				lengthRange: { },
				length: { },
				number: {},
				required: { },
			},
			extra: {//控件的额外属性
				tabs: [{//用户（代码）选择使用
					name: "部门",
					action: "/user?id=1"
				}, {
					name: "机构",
					action: "/user?id=1"
				},{
					name: "群组",
					action: "/user?id=1"
				}],
				multiple: true, //是否多选，用户（代码）选择
				rows: 2,//文本域行数
				autoComplete: { action: 'fn/getCity' }//带自动完成的组件，比如文本框，action为请求地址
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				
			]
		},
		{
			controlId: "b0013",//唯一标识
			label: "代码选择",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "C-GW-FW-0113",//元数据编号（非元数据控件为空）
			controlType: "controlCode",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "请选择用户",//默认显示信息
			defaultValue: "",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "",//日期增加可选区间
				maxDate: "",
				inputType: "",//输入类型限制，正整数
			},
			privilege: {//权限控制
				editable: false,//是否可编辑
				visible: false, //是否显示
			},
			validator: {//校验规则
				lengthRange: { },
				length: { },
				number: {},
				required: { },
			},
			extra: {//控件的额外属性
				tabs: [],//用户（代码）选择使用
				multiple: true, //是否多选，用户（代码）选择
				rows: 2,//文本域行数
				autoComplete: { action: 'fn/getCity' }//带自动完成的组件，比如文本框，action为请求地址
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				
			]
		},
		{
			controlId: "b0014",//唯一标识
			label: "领导意见",//标签名称
			showLevel: "1",//显示级别（大小、加粗等由前端决定）
			metaId: "C-FW-0030",//元数据编号（非元数据控件为空）
			controlType: "controlOpintionView",//控件名称 ，详情参见excel中定义的约50种控件
			placeholder: "请输入内容",//默认显示信息
			defaultValue: "",//默认值
			format: "yyyy-MM-dd", //日期增加format

			restrict: {//输入限制，该限制是实时验证，和validator不同，validator中的为控件失焦时候验证
				minDate: "",//日期增加可选区间
				maxDate: "",
				inputType: "",//输入类型限制，正整数
			},
			privilege: {//权限控制
				editable: true,//是否可编辑
				visible: false, //是否显示
			},
			validator: {//校验规则
				lengthRange: { },
				length: { },
				number: {},
				required: { },
			},
			extra: {//控件的额外属性
				tabs: [],//用户（代码）选择使用
				multiple: true, //是否多选，用户（代码）选择
				rows: 2,//文本域行数
				autoComplete: { action: 'fn/getCity' }//带自动完成的组件，比如文本框，action为请求地址
			},
			enumData: [//枚举型的数据//下拉框，复选框、单选框需要
				
			]
		}
		
	],
	"buttons": {
		"commonButtons": [{
			"showIndex": "0",
			"name": "关注",
			"icon": "iconguanzhu1",
			"action": "guanZhu"
		}, {
			"showIndex": "1",
			"name": "置顶",
			"icon": "iconzhiding",
			"action": "zhiDing"
		}, {
			"showIndex": "2",
			"name": "视频",
			"icon": "iconshipin",
			"action": "liuChengShiPin"
		}, {
			"showIndex": "3",
			"name": "转办",
			"icon": "iconweb-icon-",
			"action": "xform.changeUser"
		}, {
			"showIndex": "4",
			"name": "退回",
			"icon": "iconhuifu",
			"action": "tuiHui"
		}],
		"mainButtons": [{
			"showIndex": "0",
			"name": "报名",
			"icon": "",
			"action": "baoMing"
		}, {
			"showIndex": "1",
			"name": "发送",
			"icon": "",
			"action": "faSong"
		}]
	},
	attach: {
		"attach-0": {//正文附件标志
			"attType": "0",
			"isZwqy": "-1",
			"fileCount": "999",//最大上传数量限制
			"required": true,//是否必须上传
			"showSuffix": 1,//是否显示后缀
			"showSuffixText": "是",
			"attValue": "0",//正文类型
			"showFileType": "1",
			"versionMode": 1,
			"showType": 0,
			"maintainFunc": "",
			"moduleId": "2004150934196HdOEhoIx1Iw2pDpAvq",//模块ID
			"value": 0,
			"buttonText": "",
			"templates": "",
			"maintainFuncText": "",
			"attTypeText": "正文",
			"fileSize": "100",//大小限制
			"defaultFileName": "",
			"isMJ": "-1",
			"name": "正文",
			"showOrder": 1,
			"qcButtonText": "",
			"attName": "正文",//附件类型名称
			"orderbyType": "1",
			"fileType": "doc,docx,wps"//上传文件类型限制
		}
	}
}
export default formData;