import {
	getSysConfig,
	getUserInfo,
	getLangConfig
} from '@/main_modules/request/api/get.js'


export default {
	// 获取系统配置
	async getSysConfig({
		commit
	}) {
		let {
			data,
			code
		} = await getSysConfig()
		if (code == 200) {
			commit('updateSysConfig', data)
			uni.setStorageSync('config', data)
		}
	},
	// 获取多语言列表
	async getLangList({
		commit
	}) {
		let {
			data,
			code
		} = await getLangConfig()
		if (code == 200) {
			data.forEach((item) => {
				switch (item.value){
					case 'zh-cn':
					item.code = 'zh-Hans'
						break;
					case 'en':
					item.code = 'en'
						break;
					case 'zh-hk':
					item.code = 'zh-Hant'
						break;
				}
			})
			commit('updateLangList', data)
			uni.setStorageSync('langList', data)
		}
	},
	// 获取用户信息
	async getUserinfo({
		commit
	}) {
		let {
			data,
			code
		} = await getUserInfo()
		if (code == 200) {
			if (data.id == 0) {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userinfo')
				commit('updateToken', '')
				commit('updateUserinfo', {})
			}else {
				commit('updateUserinfo', data)
				uni.setStorageSync('userinfo', data)
			}
		}
	}
}
