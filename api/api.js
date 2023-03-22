import service from '@/common/request.js'
 
/**
 * 授权登录
 * @param {*} data 
 */
export function Login(data) {
	return service({
		url: '/front/loginNV',
		method: 'post',
		params: data,
	})
}

/**
 * 获取用户资产
 * @param {*} data 
 */
export function getUserassets(data) {
	return service({
		url: '/front/financial/assetsTotal',
		method: 'post',
		params: data,
	})
}

/**
 * 领取LTC
 * @param {*} data 
 */
export function getGiveltc(data) {
	return service({
		url: '/front/financial/getGive',
		method: 'post',
		params: data,
	})
}


