 
//测试
// const IP = '192.168.254.36:8082';
// const IP = '163.123.245.238';

//正式
const IP = 'www.lite.ink';


var ISHTTPS = false;

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
export default {
	webUrl: webUrl,
}
