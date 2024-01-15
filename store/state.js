export default {
	/**
	 * 系统相关数据
	**/
	statusHeight: uni.getStorageSync('statusHeight') || 0, //系统状态栏高度
	miniProgramCapsule: uni.getStorageSync('miniProgramCapsule') || {}, //小程序胶囊信息
	navbarHeight: uni.getStorageSync('navbarHeight') || 44, //自定义顶部导航栏高度
	// #ifdef APP-PLUS
	tabbarHeight: 0,	// APP端底部导航栏高度
	// #endif
	// #ifndef APP-PLUS
	tabbarHeight: 50,	// 除了APP的其他端底部导航栏高度
	// #endif
	browserFitHeight: uni.getStorageSync('browserFitHeight') || 0, //兼容浏览器多出的高度
	lang: uni.getStorageSync('lang') || 'en',	//国际化多语言
	langList: uni.getStorageSync('langList') || [], //国际化多语言列表
	moneySymbol: uni.getStorageSync('moneySymbol') || '$',	//货币符号
	appSystemInfo: uni.getStorageSync('appSystemInfo') || {}, //应用系统信息
	androidAppName: 'uni.Gao.GongYue', // Android端APP包名
	iosAppName: 'uni.Gao.GongYue', // IOS端APP包名
	/**
	 * 自定义 tabbar 数据
	**/
	tabbar: [{
			pagePath: 'pages/tabbar/theater/index',
			iconPath: '/static/img/tabbar/theater.png',
			selectedIconPath: '/static/img/tabbar/theater-active.png',
			text: 'page.影院'
		},
		{
			pagePath: 'pages/tabbar/follow/index',
			iconPath: '/static/img/tabbar/follow.png',
			selectedIconPath: '/static/img/tabbar/follow-active.png',
			text: 'page.追剧'
		},
		{
			pagePath: 'pages/tabbar/recommend/index',
			iconPath: '/static/img/tabbar/recommend.png',
			selectedIconPath: '/static/img/tabbar/recommend-active.png',
			text: 'page.推荐'
		},
		{
			pagePath: 'pages/tabbar/my/index',
			iconPath: '/static/img/tabbar/my.png',
			selectedIconPath: '/static/img/tabbar/my-active.png',
			text: 'page.我的'
		}
	],
	/**
	 * 实际业务相关数据
	**/
	token: uni.getStorageSync('token') || '',	// 登录凭证
	userinfo: uni.getStorageSync('userinfo') || {},		// 用户信息
	sysConfig: uni.getStorageSync('config') || {},		// 业务系统配置
	liveCity: uni.getStorageSync('liveCity') || '武汉',		// 所在城市
	contacts: uni.getStorageSync('contacts') || [],		// 通讯录数据
	cartList: uni.getStorageSync('cartList') || [],		// 购物车数据
	shippingAddress: [], // 收货地址
	historyList: uni.getStorageSync('historyList') || [], // 搜索历史记录
	orderHistoryList: uni.getStorageSync('orderHistoryList') || [], // 订单搜索历史记录
	allHistoryList: uni.getStorageSync('allHistoryList') || [], // 娱乐搜索历史记录
	allType: uni.getStorageSync('allType') || [], // 分类列表
	recommList: uni.getStorageSync('recommList') || [], // 搜索历史
}
