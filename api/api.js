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

/**
 * 我的团队
 * @param {*} data 
 */
export function getMyTeam(data) {
	return service({
		url: '/front/agent/myTeam',
		method: 'post',
		params: data,
	})
}

/**
 * 直推列表
 * @param {*} data 
 */
export function getMyPush(data) {
	return service({
		url: '/front/agent/myPush',
		method: 'post',
		params: data,
	})
}

/**
 * 邀请链接
 * @param {*} data 
 */
export function getInvideUrl(data) {
	return service({
		url: '/front/agent/inviteUrl',
		method: 'post',
		params: data,
	})
}

/**
 * 资产明细
 * @param {*} data 
 */
export function getzichanInfo(data) {
	return service({
		url: '/front/financial/getLog',
		method: 'post',
		params: data,
	})
}

/**
 * 资产明细下拉选项
 * @param {*} data 
 */
export function getzichanSelet(data) {
	return service({
		url: '/front/financial/getLogType',
		method: 'post',
		params: data,
	})
}

/**
 * 链类型
 * @param {*} data 
 */
export function getChainType(data) {
	return service({
		url: '/front/financial/getChainType',
		method: 'post',
		params: data,
	})
}

/**
 * 钱包列表
 * @param {*} data 
 */
export function getassetsTotal(data) {
	return service({
		url: '/front/financial/assetsTotal',
		method: 'post',
		params: data,
	})
}

/**
 * 提现
 * @param {*} data 
 */
export function userwithdraw(data) {
	return service({
		url: '/front/financial/apply',
		method: 'post',
		params: data,
	})
}

/**
 * 提现记录
 * @param {*} data 
 */
export function getApplyLog(data) {
	return service({
		url: '/front/financial/getApplyLog',
		method: 'post',
		params: data,
	})
}

/**
 * 提现配置
 * @param {*} data 
 */
export function getApplyset(data) {
	return service({
		url: '/front/financial/getWalletUsing',
		method: 'post',
		params: data,
	})
}

/**
 * 检查是否注册
 * @param {*} data 
 */
export function checkAddress(data) {
	return service({
		url: '/front/financial/findAddress',
		method: 'post',
		params: data,
	})
}

/**
 * 质押生成订单
 * @param {*} data 
 */
export function pledgeapi(data) {
	return service({
		url: '/front/change/usdtExLtc',
		method: 'post',
		params: data,
	})
}

/**
 * 排行榜
 * @param {*} data 
 */
export function getrankList(data) {
	return service({
		url: '/front/financial/rankingList',
		method: 'post',
		params: data,
	})
}

/**
 * 质押天数列表
 * @param {*} data 
 */
export function pledgeTime(data) {
	return service({
		url: '/front/financial/rankingList',
		method: 'post',
		params: data,
	})
}

/**
 * 质押记录
 * @param {*} data 
 */
export function pledgeInfo(data) {
	return service({
		url: '/front/change/pledgeLog',
		method: 'post',
		params: data,
	})
}

/**
 * 领取收益
 * @param {*} data 
 */
export function getEarnings(data) {
	return service({
		url: '/front/change/getEarnings',
		method: 'post',
		params: data,
	})
}

/**
 * 赎回
 * @param {*} data 
 */
export function getRedeem(data) {
	return service({
		url: '/front/change/getRedeem',
		method: 'post',
		params: data,
	})
}

/**
 * 公告列表
 * @param {*} data 
 */
export function getnoticeList(data) {
	return service({
		url: '/search/getContent',
		method: 'post',
		params: data,
	})
}

/**
 * 公告詳情
 * @param {*} data 
 */
export function getnoticeDetail(data) {
	return service({
		url: '/search/getContentInfo',
		method: 'post',
		params: data,
	})
}

/**
 * 轮播图
 * @param {*} data 
 */
export function getslideList(data) {
	return service({
		url: '/search/indexSlides',
		method: 'post',
		params: data,
	})
}

/**
 * 取消提币
 * @param {*} data 
 */
export function canceltibi(data) {
	return service({
		url: '/front/financial/deleteExtract',
		method: 'post',
		params: data,
	})
}

/**
 * 排行榜置顶数据
 * @param {*} data 
 */
export function tatolRankingList(data) {
	return service({
		url: '/front/financial/tatolRankingList',
		method: 'post',
		params: data,
	})
}

/**
 * LTT币种详情
 * @param {*} data 
 */
export function coininfo(data) {
	return service({
		url: '/front/ltt/lttList',
		method: 'post',
		params: data,
	})
}

/**
 * 可兑换LTC数量
 * @param {*} data 
 */
export function ltcexchangenum(data) {
	return service({
		url: '/front/financial/exchangeInfo',
		method: 'post',
		params:data,
	})
}

/**
 * 兑换
 * @param {*} data 
 */
export function exchangefun(data) {
	return service({
		url: '/front/financial/exchange',
		method: 'post',
		params: data,
	})
}

/**
 * K綫
 * @param {*} data 
 */
export function klinedata(data) {
	return service({
		url: '/front/change/k_xian',
		method: 'post',
		params: data,
	})
}

/**
 * 获取ltt余额
 * @param {*} data 
 */
export function lttbalance(data) {
	return service({
		url: '/front/financial/lttList',
		method: 'post',
		params: data,
	})
}

/**
 * 一键领取所有收益
 * @param {*} data 
 */
export function lqallearnings(data) {
	return service({
		url: '/front/change/getEarningsAll',
		method: 'post',
		params: data,
	})
}

/**
 * NFT购买
 * @param {*} data 
 */
export function nftbuy(data) {
	return service({
		url: '/front/card/buyCard',
		method: 'post',
		params: data,
	})
}