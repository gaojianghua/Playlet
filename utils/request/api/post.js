const {
	http
} = uni.$u

/**
 * post请求
 */
// 获取APP版本号
// export const getVersion = (params, config = {}) => http.post('/user/login', params, config)

// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)

// 注册
export const register = (params, config = {}) => http.post('/user/register', params, config)

// 视频上报
export const videoLog = (params, config = {}) => http.post('/user/reportViewLog', params, config)

// 追剧
export const addCollect = (params, config = {}) => http.post('/user/collect', params, config)

// 购买
export const buyVideo = (params, config = {}) => http.post('/user/buyVideo', params, config)

// 批量取消追剧
export const delVideo = (params, config = {}) => http.post('/user/unCollect', params, config)

// 批量删除记录
export const delVideoLog = (params, config = {}) => http.post('/user/delViewLog', params, config)

// 设置点赞
export const setLike = (params, config = {}) => http.post('/user/setLike', params, config)

// 购买VIP
export const buyVIP = (params, config = {}) => http.post('/user/buyVip', params, config)

// 充值金币
export const rechargeGold = (params, config = {}) => http.post('/user/recharge', params, config)
