/**
 * 请求拦截
 * @param {Object} http
 */
module.exports = (vm) => {
	uni.$u.http.interceptors.request.use((config) => {
			// 可使用async await 做异步操作
			// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
			let token = uni.getStorageSync('token') || ''
			let str = uni.getStorageSync('lang')
			let lang = str == 'zh-Hans' ? 'zh-cn' : (str == 'zh-Hant' ? 'zh-hk' : 'en')
			config.data = config.data || {}
			config.url = config.url + `?lang=${lang}`
			if (config.method == 'POST') {
				config.data.token = token
			}
			if (config.method == 'GET') {
				config.url = config.url + `&token=${token}`
			}
			// config.header = {
			// 	withCredentials: true
			// }
			// console.log(config)
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			// console.log(vm.$store.state);
			return config
		}, (config) => // 可使用async await 做异步操作
		Promise.reject(config))
}
