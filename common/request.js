import Vue from 'vue'
import axios from 'axios'
import webUrl from './url.js'
import $tools from '../common/tools.js'
import {
	Login
} from '@/api/api.js'


// create an axios instance
const service = axios.create({
	baseURL: webUrl.webUrl, // url = base url + request url
	// baseURL: 'http://localhost:8000',
	//withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
	timeout: 6000, // request timeout
	crossDomain: true,
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	config => {
		if (uni.getStorageSync('token')) {
			// 给请求头添加user-token
			config.headers["token"] = uni.getStorageSync('token');
		}
		console.log('请求拦截成功')
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

//配置成功后的拦截器
service.interceptors.response.use(res => {
	if (res.data.code == 0) {
		return res.data
	} else if (res.data.code == 302) {
		uni.setStorageSync('token', '')
		Login({
			name: uni.getStorageSync('address')
		}).then(res => {
			console.log('登录成功：', res.data)
			$tools.toast('登录成功~')
			uni.setStorageSync('token', res.data)
		})
	} else {
		return Promise.reject(res.data.msg);
	}
}, error => {
	if (error.response.code) {
		switch (error.response.code) {
			case 401:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error)
})

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}


export default service
