import Web3 from "web3";

const web3utils = {};

web3utils.approve = (data, callBack) => {
	let from = data.from;
	let to = data.to;
	let account = data.account;
	from.methods.allowance(account, to.options.address).call().then(r => {
		if (r <= 1) {
		//   console.log('合约授权，From：' , data.from, 'To：' , data.to , '，账户：' , data.account, to)
		console.error('>>>>>>>>>>>>>>>>>>>', from, to.options.address);
		  from.methods.approve(to.options.address, "100000000000000000000000000000000").send({from:account}).then(() => {
			console.error("success1");
			callBack();
		  }).catch(err => {
			console.error("err", err);
		  })
		} else {
			console.error("success2");
			callBack();
		}
	  }).catch(err => {
		console.error('...............', err);
	  })
}
//ERC20代币
web3utils.createContract = (abi, address, account) => {
	var web3 = window.web3
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(window.ethereum)
	} else {
	
		web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
	}
	let contract =  new web3.eth.Contract(abi, address, {
		from: account,
		value: 0,
		gas: 900000,
		gaslimit: 10
	});
	return contract;
}

export default web3utils
