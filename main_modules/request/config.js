import store from '@/store/index.js'
// 接口报错提示处理
export const errorMessage = (res) => {
	const {
		data
	} = res
	if (data.code && data.code != 200) {
		let str = ''
		if (data.msg) {
			str = data.msg
		} else {
			str = '呀! 接口开小差啦; 贵客! 骚等哦!'
		}
		uni.showToast({
			title: str,
			icon: 'none',
			duration: 2000,
			success: () => {
				if (str.toLocaleLowerCase().includes('token')) {
					uni.clearStorageSync()
					store.commit('updateUserinfo', {})
					store.commit('updateToken', '')
					uni.navigateTo({
						url: '/pages-common/account/login/index'
					})
				}
			}
		})
	}
}