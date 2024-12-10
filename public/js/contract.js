
// Addresses and APIs for the contracts
const CVUploaderAdd = "0xBa26b5ccBcfCCb14b1d47544aF56e25A0B27Adf1"; 
const CVUploaderABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "walletHolder",
				"type": "address"
			}
		],
		"name": "CVUploaded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "certID",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issuer",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "acquiredDate",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"name": "uploadOrUpdateCertification",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "eduBadID",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "level",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fieldOfStudy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteCountry",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteState",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteCity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			}
		],
		"name": "uploadOrUpdateEducation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "softID",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "highlight",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "uploadOrUpdateSoftSkill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "uploadOrUpdateWalletHolder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "workExpID",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "industry",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			}
		],
		"name": "uploadOrUpdateWork",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "certifications",
		"outputs": [
			{
				"internalType": "int256",
				"name": "certID",
				"type": "int256"
			},
			{
				"internalType": "address",
				"name": "accountID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issuer",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "acquiredDate",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "active",
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
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "educations",
		"outputs": [
			{
				"internalType": "int256",
				"name": "eduBadID",
				"type": "int256"
			},
			{
				"internalType": "address",
				"name": "accountID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "level",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fieldOfStudy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteCountry",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteState",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instituteCity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
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
		"name": "softSkills",
		"outputs": [
			{
				"internalType": "int256",
				"name": "softID",
				"type": "int256"
			},
			{
				"internalType": "address",
				"name": "accountID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "highlight",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletHolder",
				"type": "address"
			}
		],
		"name": "viewAllCredentials",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "accountID",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					}
				],
				"internalType": "struct CVUploader.WalletHolder[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "int256",
						"name": "softID",
						"type": "int256"
					},
					{
						"internalType": "address",
						"name": "accountID",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "highlight",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "level",
						"type": "uint8"
					}
				],
				"internalType": "struct CVUploader.SoftSkill[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "int256",
						"name": "workExpID",
						"type": "int256"
					},
					{
						"internalType": "address",
						"name": "accountID",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "company",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "industry",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "state",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "startDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "endDate",
						"type": "string"
					}
				],
				"internalType": "struct CVUploader.Work[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "int256",
						"name": "eduBadID",
						"type": "int256"
					},
					{
						"internalType": "address",
						"name": "accountID",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "level",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fieldOfStudy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "instituteName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "instituteCountry",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "instituteState",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "instituteCity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "startDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "endDate",
						"type": "string"
					}
				],
				"internalType": "struct CVUploader.Education[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "int256",
						"name": "certID",
						"type": "int256"
					},
					{
						"internalType": "address",
						"name": "accountID",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "certType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issuer",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "acquiredDate",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					}
				],
				"internalType": "struct CVUploader.Certification[]",
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
				"internalType": "address",
				"name": "walletHolder",
				"type": "address"
			}
		],
		"name": "viewWalletHolders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "accountID",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					}
				],
				"internalType": "struct CVUploader.WalletHolder[]",
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
		"name": "walletHolders",
		"outputs": [
			{
				"internalType": "address",
				"name": "accountID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
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
		"name": "works",
		"outputs": [
			{
				"internalType": "int256",
				"name": "workExpID",
				"type": "int256"
			},
			{
				"internalType": "address",
				"name": "accountID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "industry",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const SubscripRequestAdd = "0x158a9A038CBCbdF5BF5C0019970547d2Aff67598";
const SubscripRequestABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ETHWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "recruiter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum SubscripRequest.SubscriptionType",
				"name": "subscriptionType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			}
		],
		"name": "SubscriptionPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "walletHolder",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "recruiter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum SubscripRequest.SegmentType",
				"name": "segmentType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum SubscripRequest.RequestStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestIndex",
				"type": "uint256"
			}
		],
		"name": "ViewRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "contractBalance",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletHolder",
				"type": "address"
			},
			{
				"internalType": "enum SubscripRequest.SegmentType",
				"name": "segmentType",
				"type": "uint8"
			}
		],
		"name": "createViewRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum SubscripRequest.SubscriptionType",
				"name": "subscriptionType",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "companyName",
				"type": "string"
			}
		],
		"name": "registerAndPurchaseSubscription",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletHolder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "requestIndex",
				"type": "uint256"
			},
			{
				"internalType": "enum SubscripRequest.RequestStatus",
				"name": "response",
				"type": "uint8"
			}
		],
		"name": "respondToRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
		"name": "recruiters",
		"outputs": [
			{
				"internalType": "address",
				"name": "publicKey",
				"type": "address"
			},
			{
				"internalType": "enum SubscripRequest.SubscriptionType",
				"name": "subscriptionType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "companyName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "storedETH",
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
				"name": "recruiter",
				"type": "address"
			}
		],
		"name": "viewRecruiter",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "publicKey",
						"type": "address"
					},
					{
						"internalType": "enum SubscripRequest.SubscriptionType",
						"name": "subscriptionType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "expiryDate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "companyName",
						"type": "string"
					}
				],
				"internalType": "struct SubscripRequest.Recruiter[]",
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
		"name": "walletHolderRequests",
		"outputs": [
			{
				"internalType": "address",
				"name": "walletHolder",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recruiter",
				"type": "address"
			},
			{
				"internalType": "enum SubscripRequest.SegmentType",
				"name": "segmentType",
				"type": "uint8"
			},
			{
				"internalType": "enum SubscripRequest.RequestStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "requestIndex",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Create a provider using Web3Provider to connect to MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

// Create contract instances
const CVUploaderContract = new ethers.Contract(CVUploaderAdd, CVUploaderABI, provider);
const SubscripRequestContract = new ethers.Contract(SubscripRequestAdd, SubscripRequestABI, provider);

// Make contracts globally accessible so other scripts can use them
window.CVUploaderContract = CVUploaderContract;
window.SubscripRequestContract = SubscripRequestContract;

// Optional: Log the contracts to ensure they are initialized
console.log("CVUploaderContract:", window.CVUploaderContract);
console.log("SubscripRequestContract:", window.SubscripRequestContract);
