module.exports = {
	scrollStyle: {
		type: Object,
		default: () => {
			return null
		}
	},
	mainColor: {
		type: String,
		default: () => {
			return '#EE7623'
		}
	},
	load: {
		type: [String, Number],
		default: () => {
			return 2
		}
	},
	bgColor: {
		type: String,
		default: () => {
			return '#151521'
		}
	},
	loadHeight: {
		type: String,
		default: () => {
			return '100rpx'
		}
	},
	refresherDefaultText: {
		type: String,
		default: () => {
			return '亲~ 下拉可以刷新哦'
		}
	},
	refresherRefreshText: {
		type: String,
		default: () => {
			return "亲~ 可以松手了哦"
		}
	},
	refresherLoadingText: {
		type: String,
		default: () => {
			return "亲~ 正在加载中哦"
		}
	},
	isLoading: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	isTab: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isCustomRefresh: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	isBackTop: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	i18n: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	placeHeight: {
		type: String,
		default: () => {
			return "0"
		}
	},
	intoView: {
		type: String,
		default: () => {
			return ""
		}
	},
	showBackTopValue: {
		type: String,
		default: () => {
			return "600"
		}
	},
}