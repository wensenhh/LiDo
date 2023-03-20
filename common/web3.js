// 参考网址:https://blog.csdn.net/cjy_win/article/details/117248919?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&utm_relevant_index=2

// 1.先确认自己的浏览器安装了metaMask插件,建议谷歌浏览器

// 2.Vue项目安装web3.js,使用npm安装web3js依赖

//在vue中安装web3
// npm install web3 --save
// //在main.js引入
// import Web3 from 'web3'
// Vue.prototype.Web3 = Web3

// 自己创建一个getWeb3.js文件把下面代码放入里面,需要用到的页面直接引入即可

// import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
  });
export default {
	getWeb3
};

// 3.上面是一个js方法,根据当前页面来初始化web3对象,在对应页面 通过  const Web3= require('../common/getWeb3') 引入,然后通过下面方法使用

// 注意:加web3前面必须有window : window.web3

//  Web3.default.getWeb3().then((res) => {
//       window.web3 = res;
//       console.log("getWeb3", res);
//     });
