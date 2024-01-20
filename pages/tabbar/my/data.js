const menuList = [
	{
		id: 1,
		name: 'page.观看历史',
		icon: '/static/img/my/menu1.png',
		page: '/pages-common/history/index'
	},
	{
		id: 2,
		name: 'page.消费记录',
		icon: '/static/img/my/menu4.png',
		page: '/pages-common/consumption-records/index'
	},
	{
		id: 3,
		name: 'page.语言切换',
		icon: '/static/img/my/menu5.png'
	},
	{
		id: 4,
		name: 'page.关于我们',
		icon: '/static/img/my/menu3.png',
		page: '/pages-common/about-us/index',
	},
	// #ifdef APP-PLUS
	{
		id: 5,
		name: '当前版本',
		icon: '/static/img/my/menu6.png'
	},
	// #endif
	{
		id: 6,
		name: '退出登录',
		icon: '/static/img/my/menu7.png'
	}
]

module.exports = {
	menuList
}