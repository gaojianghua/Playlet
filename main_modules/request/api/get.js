import http from '../method.js'

// 获取系统配置
export const getSysConfig = (params, config = {}) => http.get('/api/v2/common/sysConfig', params, config)

// 获取用户信息
export const getUserInfo = (params, config = {}) => http.get('/api/v2/user/userInfo', params, config)

// 获取语言配置
export const getLangConfig = (params, config = {}) => http.get('/api/v2/common/langConfig', params, config)
