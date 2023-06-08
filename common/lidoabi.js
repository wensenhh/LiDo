/**
 * TODO 合约对象
 * 此处是一个合约对象构造所需要的属性
 * 必须包含 address 和 abi 两个对象
 */
export const usdtaddr = '0x55d398326f99059ff775485246999027b3197955'
export const loginaddr = '0x9Fa83044988EDe1FC0a5b0381F79298C20b9FA75'
export const contractaddr = '0x5fE7a2460a50a481f9942BD53D93388352aCF4a8'
export const ltcaddr = '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94'
// 0x9Fa83044988EDe1FC0a5b0381F79298C20b9FA75
export const textCoin = {
	usdtaddr: '0x38C93854cB671bE1A23b2D9E86d892253EE4a725', // usdt测试链合约地址
	ltcaddr: '0x90C73C29fd08b77Cb241552254B112ac82293D04', // ltc测试链合约地址
	pledge: '0xE99BaB2c2339E7594dBA3253e19DDAC644850C8f' // PledgePool
}

export const loginabi = [{
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "currency",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "_user",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "_value",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "string",
		"name": "orderId",
		"type": "string"
	}],
	"name": "Claim",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "_user",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "_value",
		"type": "uint256"
	}],
	"name": "ClaimAll",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "_user",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "_value",
		"type": "uint256"
	}],
	"name": "Register",
	"type": "event"
}, {
	"inputs": [],
	"name": "_pancakeRouter02",
	"outputs": [{
		"internalType": "contract IPancakeRouter02",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "string",
		"name": "orderId",
		"type": "string"
	}, {
		"internalType": "address",
		"name": "toAddress",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "currency",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
	}],
	"name": "claim",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "currency",
		"type": "address"
	}],
	"name": "claimAll",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "string",
		"name": "orderid",
		"type": "string"
	}],
	"name": "getOrderId",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "addr",
		"type": "address"
	}],
	"name": "getRegister",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"name": "orderMap",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "register",
	"outputs": [],
	"stateMutability": "payable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"name": "registerMap",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "addr",
		"type": "address"
	}],
	"name": "setAcceptAddress",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "transferOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "withdraw",
	"outputs": [],
	"stateMutability": "payable",
	"type": "function"
}, {
	"stateMutability": "payable",
	"type": "receive"
}]

export const lidoabi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "AdminWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "AdminWithdrawNFT",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "AdminWithdrawToken",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "version",
          "type": "uint8"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaymentReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "SetAdmin",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "authState",
          "type": "bool"
        }
      ],
      "name": "SetAuth",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isPaused",
          "type": "bool"
        }
      ],
      "name": "SetIsPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newReserveAddress",
          "type": "address"
        }
      ],
      "name": "SetReserveAddress",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reserveRatio",
          "type": "uint256"
        }
      ],
      "name": "SetReserveRatio",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rserveDivide",
          "type": "uint256"
        }
      ],
      "name": "SetrRserveDivide",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "_orderId",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "SwapUSDTforLTC",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_currency",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "adminWithdraw",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "adminWithdrawApproveToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "adminWithdrawNFT",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "adminWithdrawToken",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "auth",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_orderId",
          "type": "bytes"
        }
      ],
      "name": "checkSwap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_currency",
          "type": "uint256"
        }
      ],
      "name": "checkWithdraw",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_reserveRatio",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_reserveAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_reserveDivide",
          "type": "uint256"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isPaused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reserveAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reserveDivide",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reserveRatio",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        }
      ],
      "name": "setAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_authState",
          "type": "bool"
        }
      ],
      "name": "setAuth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_isPaused",
          "type": "bool"
        }
      ],
      "name": "setIsPaused",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_reserveAddress",
          "type": "address"
        }
      ],
      "name": "setReserveAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_reserveRatio",
          "type": "uint256"
        }
      ],
      "name": "setReserveRatio",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_reserveDivide",
          "type": "uint256"
        }
      ],
      "name": "setrRserveDivide",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_orderId",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "swapUSDTforLTC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_sig",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_currency",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

export const tokenabi = [{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_decimals",
		"outputs": [{
			"internalType": "uint8",
			"name": "",
			"type": "uint8"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_name",
		"outputs": [{
			"internalType": "string",
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_symbol",
		"outputs": [{
			"internalType": "string",
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
			"internalType": "address",
			"name": "account",
			"type": "address"
		}],
		"name": "balanceOf",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}],
		"name": "burn",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [{
			"internalType": "uint8",
			"name": "",
			"type": "uint8"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwner",
		"outputs": [{
			"internalType": "address",
			"name": "",
			"type": "address"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}],
		"name": "mint",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [{
			"internalType": "string",
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [{
			"internalType": "address",
			"name": "",
			"type": "address"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [{
			"internalType": "string",
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		}],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

