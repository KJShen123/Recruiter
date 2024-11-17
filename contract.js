

 const productABI = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_retailer",
				"type": "address"
			}
		],
		"name": "assignRetailerAndConsumer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_transporter",
				"type": "address"
			}
		],
		"name": "assignTransporter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			}
		],
		"name": "retailerReady",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			}
		],
		"name": "transpoterReady",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_facture",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "trackingCode",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum supplyChain.Status",
				"name": "status",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productMessage",
				"type": "string"
			}
		],
		"name": "EventDelivery",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			}
		],
		"name": "updateByFacture",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			}
		],
		"name": "updateByRetailer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			}
		],
		"name": "updateByTranspoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "facture",
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
		"name": "getProductsForRetailer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "trackingCode",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "productMessage",
						"type": "string"
					},
					{
						"internalType": "enum supplyChain.Status",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "retailer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "transporter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "enum supplyChain.Status",
								"name": "status",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "productMessage",
								"type": "string"
							}
						],
						"internalType": "struct supplyChain.StatusHistory[]",
						"name": "history",
						"type": "tuple[]"
					}
				],
				"internalType": "struct supplyChain.ProductDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProductsForTransporter",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "trackingCode",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "productMessage",
						"type": "string"
					},
					{
						"internalType": "enum supplyChain.Status",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "retailer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "transporter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "enum supplyChain.Status",
								"name": "status",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "productMessage",
								"type": "string"
							}
						],
						"internalType": "struct supplyChain.StatusHistory[]",
						"name": "history",
						"type": "tuple[]"
					}
				],
				"internalType": "struct supplyChain.ProductDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "statusName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productMessage",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "pTrackingCode",
				"type": "bytes32"
			}
		],
		"name": "getStatusHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum supplyChain.Status",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productMessage",
						"type": "string"
					}
				],
				"internalType": "struct supplyChain.StatusHistory[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "productHashes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "productList",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "trackingCode",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "productMessage",
				"type": "string"
			},
			{
				"internalType": "enum supplyChain.Status",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "retailer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "transporter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const buySideABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "trackingCode",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "productID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "salePrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "saleTime",
				"type": "uint256"
			}
		],
		"name": "EventBuyProduct",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "productID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creationTime",
				"type": "uint256"
			}
		],
		"name": "EventProductSet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allProductIDs",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allSales",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "productID",
				"type": "bytes32"
			}
		],
		"name": "buyProduct",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractOwner",
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
		"name": "getAllProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "productID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "productOwner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "creationTime",
						"type": "uint256"
					}
				],
				"internalType": "struct BuySide.ProductDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSales",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "trackingCode",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "soldProductID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "saleTime",
						"type": "uint256"
					}
				],
				"internalType": "struct BuySide.SalesDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAvailableProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "productID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "productOwner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "creationTime",
						"type": "uint256"
					}
				],
				"internalType": "struct BuySide.ProductDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBuyerSales",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "trackingCode",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "soldProductID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "saleTime",
						"type": "uint256"
					}
				],
				"internalType": "struct BuySide.SalesDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "trackingCode",
				"type": "bytes32"
			}
		],
		"name": "getSalesDetail",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "trackingCode",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "soldProductID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "saleTime",
						"type": "uint256"
					}
				],
				"internalType": "struct BuySide.SalesDetail",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ownerProducts",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "productList",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "productID",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "productOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "creationTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "salesList",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "trackingCode",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "soldProductID",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "saleTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pPrice",
				"type": "uint256"
			}
		],
		"name": "setProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const productAdd = "0xcBa7058C6C53C7f47AEA04143Ac67bFD4ffafaa7";

const buySideAdd = "0x0C64Ff72B61B6D732a29eb4c2C953c3108156d63";
