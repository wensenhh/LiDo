import Web3 from "web3";
// import {
// 	ethers
// } from "ethers";
import { providers as Ethproviders,Contract as EThcontract} from "ethers";
const getWeb3 = () =>
	new Promise((resolve, reject) => {
		// Wait for loading completion to avoid race conditions with web3 injection timing.
		// Modern dapp browsers...
		if (window.ethereum) {
			const { ethereum } = window;
			const web3 = new Web3(window.ethereum);
			// const provider = await new Ethproviders.Web3Provider(ethereum);
			// const signer = await provider.getSigner();
			// const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.defibit.io'))

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
				"https://bsc-dataseed1.defibit.io"
			);
			const web3 = new Web3(provider);
			console.log("No web3 instance injected, using Local web3.");
			resolve(web3);
		}
	});
export default {
	getWeb3
};