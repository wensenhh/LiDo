var tp = require('tp-js-sdk')
const {
	ethereum
} = window;
import {
	ethers
} from "ethers";
const chain_name = 'bsc';
const chain_id = 56;
const tools = {};

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行 
 * @return null
 */
let timeout = null;
tools.debounce = async (func, wait = 500, immediate = false) => {
	// 清除定时器
	if (timeout !== null) clearTimeout(timeout);
	// 立即执行，此类情况一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function () {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func();
	} else {
		// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		timeout = setTimeout(function () {
			typeof func === 'function' && func();
		}, wait);
	}
}

/**
 * 节流原理：在一定时间内，只能触发一次
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timer, flag;
tools.throttle = async (func, wait = 500, immediate = true) => {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}
	}
}

tools.getNetWorkId = async () => {
	try {
		const chainId = await ethereum.request({
			method: "eth_chainId"
		});
		return chainId
	} catch (err) {
		console.error(err);
	}
}

tools.signMessage = async (message) => {
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner();
	const result = await signer.signMessage(message);
	return result;
};

tools.verifyMessage = async ({
	message,
	address,
	signature
}) => {
	try {
		const signerAddr = await ethers.utils.verifyMessage(message, signature);
		if (signerAddr.toLowerCase() !== address.toLowerCase()) {
			return false;
		}
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

tools.getAddress = async () => {
	let isTpWallet = tp.isConnected();
	if (isTpWallet) {
		let currentWallt = await tp.getCurrentWallet();
		return currentWallt.data.address;
	} else {
		if (ethereum) {
			let accounts = await ethereum.request({
				method: 'eth_requestAccounts'
			});
			// getChainId()
			return accounts[0];
		} else {
			alert("请安装MetaMask钱包");
		}
	}
}

tools.changeNetwork = async () => {
	let isMetamaskWallet = ethereum && ethereum.isMetaMask;
	let isTpWallet = tp.isConnected();

	if (isTpWallet) {
		let currentWallt = await tp.getCurrentWallet();
		if (!currentWallt || !currentWallt.result) {
			await tools.selectTpWallet(chain_name);
		}
		let blockChain = currentWallt.data.blockchain.toLowerCase();
		if (blockChain !== chain_name) {
			await tools.selectTpWallet(chain_name);
		}
	} else if (isMetamaskWallet) {
		let networkId = await tools.getNetWorkId();
		if (networkId != chain_id) {
			await tools.metaMaskWallet(chain_id);
			await metaMaskPermiss();
		}
	}
}

tools.metaMaskWallet = async (chainId) => {
	try {
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{
				'chainId': ethers.utils.hexValue(chainId),
			}]
		});
	} catch (error) {
		if (error.code === 4902 && chainId == 56) {
			await addBscNetwork();
		} else {
			throw '切换网络失败';
		}
	}
}

async function metaMaskPermiss() {
	await ethereum.request({
		method: 'wallet_requestPermissions',
		params: [{
			eth_accounts: {}
		}],
	}).catch(err => {
		throw '授权失败';
	})
}

tools.selectTpWallet = async (chain) => {
	await tp.getWallet({
		walletTypes: [chain],
		switch: true
	});
}

// 后退
tools.back = (step) => {
	uni.navigateBack({
		delta: step
	});
};

tools.toastBack = (title, step) => {
	uni.showToast({
		title: title,
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})
	setTimeout(function() {
		uni.navigateBack({
			delta: step
		});
	}, 1000);

};

// 指定返回页面
tools.pathBack = (path) => {
	let pages = getCurrentPages(); //获取页面栈

	let pageIndex = pages.findIndex(findItem => {
		return findItem.route === path /* 需返回的页面路由 */
	})

	let prevPage = pages[pageIndex];

	tools.back((pages.length - (pageIndex + 1)))
};

// 复制
tools.copy = (val) => {
	console.log(val);
	uni.setClipboardData({
		data: val,
		success() {
			uni.showToast({
				title: '复制成功',
				duration: 2000,
				icon: "none"
			})
		}
	})
}

// 提示
tools.toast = (title, duration = 1500, mask = false, icon = 'none') => {
	uni.showToast({
		title: title,
		duration: duration,
		icon: icon,
		mask: mask,
	})
}

tools.loading = (title, mask = false) => {
	uni.showLoading({
		title: title,
		mask: mask
	})
}

tools.jump = (path, value1, value2, value3, value4, value5) => {
	var string = '';

	if (value1 != undefined) {
		string += '?=&value1=' + value1;
	}
	if (value2 != undefined) {
		string += '&value2=' + value2;
	}
	if (value3 != undefined) {
		string += '&value3=' + value3;
	}
	if (value4 != undefined) {
		string += '&value4=' + value4;
	}
	if (value5 != undefined) {
		string += '&value5=' + value5;
	}
	uni.navigateTo({
		url: path + string
	})
}

tools.toastJump = (title, path, value1, value2, value3, value4, value5) => {
	uni.showToast({
		title: title,
		icon: "none",
		// mask: true,
		duration: 1000,
		// position: 'bottom'
	})

	var string = '';

	if (value1 != undefined) {
		string += '?=&value1=' + value1;
	}
	if (value2 != undefined) {
		string += '&value2=' + value2;
	}
	if (value3 != undefined) {
		string += '&value3=' + value3;
	}
	if (value4 != undefined) {
		string += '&value4=' + value4;
	}
	if (value5 != undefined) {
		string += '&value5=' + value5;
	}

	setTimeout(function () {
		uni.navigateTo({
			url: path + string
		})
	}, 1000);
}

tools.redirectTo = (path) => {
	uni.redirectTo({
		url: path
	});
}

// js精度加法
tools.accAdd = (arg1, arg2) => {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

// js精度减法
tools.accSub = (arg1, arg2) => {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = r1 >= r2 ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// js精度乘法
tools.accMul = (arg1, arg2) => {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) { }
	try {
		m += s2.split(".")[1].length;
	} catch (e) { }

	return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m);
}

// js精度除法
tools.accDiv = (arg1, arg2) => {
	var t1 = 0,
		t2 = 0,
		r1,
		r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) { }
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) { }
	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	if (r2 == 0) {
		return Infinity;
	} else {
		return (r1 / r2) * Math.pow(10, t2 - t1);
	}
}


tools.formatTime = (value, type) => {
	var dataTime = "";
	var data = new Date();
	data.setTime(value);
	// console.log(value);

	var year = data.getFullYear();
	var month_temp = data.getMonth() + 1;
	var month = month_temp < 10 ? '0' + month_temp : month_temp;
	var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
	var hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
	var minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
	var second = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
	if (type == "YMD") {
		dataTime = year + "-" + month + "-" + day;
	} else if (type == "YMDHMS") {
		dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	} else if (type == "HMS") {
		dataTime = hour + ":" + minute + ":" + second;
	} else if (type == "YM") {
		dataTime = year + "-" + month;
	} else if (type == "HM") {
		dataTime = hour + ":" + minute;
	} else if (type == "HMDM") {
		dataTime = hour + ":" + minute + " " + month + "/" + day;
	} else if (type == "LL") {
		dataTime = year + "" + month + "" + day + hour + "" + minute + "" + second;
	}
	return dataTime; //将格式化后的字符串输出到前端显示
}

tools.formatTime2 = (value) => {
	var timeValue = value.replace(/-/g, "/");
	var T_pos = timeValue.indexOf('T');
	var year_month_day = timeValue.substr(0, T_pos);
	var hour_minute_second = timeValue.substr(T_pos + 1, 8);
	var new_datetime = year_month_day + " " + hour_minute_second;
	var dateee = new Date(new_datetime).toJSON();
	var sjc = new Date(dateee).getTime();
	var chinaT = sjc + 8 * 3600 * 1000;

	var date = tools.formatTime(chinaT, 'YMDHMS');
	return date;
},
	tools.number = (value, type) => {
		if (value == null || value == '') {
			value = 0;
		}
		//处理科学计数法
		value = value.toFixed(8);
		var arr = (value + "").split(".");
		var a1 = arr[0];
		var a2 = 0;
		if (arr.length > 1) {
			a2 = arr[1];
			if (a2.length > type) {
				a2 = a2.substring(0, type);
			}
		}
		value = Number(a1 + "." + a2);
		return Number(value).toFixed(type)
	}

// 暂未开放
tools.noOpen = () => {
	uni.showToast({
		title: '暂未开放',
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})
}

export default tools