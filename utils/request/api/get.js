const {
	http
} = uni.$u


/**
 * get请求
 */

// 获取热门列表
export const getHomeHotList = (params, config = {}) => http.get('/index/hotList', {
	params
}, config)

// 获取视频详情
export const getVideoInfo = (params, config = {}) => http.get('/index/videoInfo', {
	params
}, config)

// 获取免费列表
export const getFreeList = (params, config = {}) => http.get('/index/freelist', {
	params
}, config)

// 获取最新列表
export const getNewList = (params, config = {}) => http.get('/index/newlist', {
	params
}, config)

// 获取排行榜列表
export const getRankList = (params, config = {}) => http.get('/index/ranklist', {
	params
}, config)

// 获取搜索列表
export const getSearchList = (params, config = {}) => http.get('/index/search', {
	params
}, config)

// 获取分类列表
export const getCategoryList = (params, config = {}) => http.get('/index/catelist', {
	params
}, config)

// 获取视频分类
export const getVideoCategory = (params, config = {}) => http.get('/common/category', {
	params
}, config)

// 获取播放记录列表
export const getPlayRecords = (params, config = {}) => http.get('/user/viewLog', {
	params
}, config)

// 获取追剧列表
export const getCollectList = (params, config = {}) => http.get('/user/myCollect', {
	params
}, config)

// 退出登录
export const logout = (params, config = {}) => http.get('/user/logout', {
	params
}, config)

// 获取轮播图
export const getSwiperList = (params, config = {}) => http.get('/index/bannerData', {
	params
}, config)

// 获取流行热剧
export const getPopularList = (params, config = {}) => http.get('/index/newData', {
	params
}, config)

// 获取消费记录
export const getConsumptionList = (params, config = {}) => http.get('/user/myConsumption', {
	params
}, config)

// 获取充值配置信息
export const getRechargeConfig = (params, config = {}) => http.get('/common/rechargeConfig', {
	params
}, config)

// 获取VIP配置信息
export const getVIPConfig = (params, config = {}) => http.get('/common/vipConfig', {
	params
}, config)

// 获取推荐视频
export const getRecommendVideo = (params, config = {}) => http.get('/common/recommend', {
	params
}, config)

// 取消支付
export const cancelPay = (params, config = {}) => http.get('/common/payCancel', {
	params
}, config)

// 获取余额明细
export const getWalletDetail = (params, config = {}) => http.get('/user/walletLog', {
	params
}, config)

// 支付验证
export const getPayReturn = (params, config = {}) => http.get('/common/payReturn', {
	params
}, config)
