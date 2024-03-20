const { ethers } = require("ethers");

async function main() {
  // Read the contract's ABI from the file
  const abi = [
    // Constructor
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newUser",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "smokerStatus",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "valuePayout",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userAge",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "InitialPremium",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "contractLength",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    // updatedRisk event
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "riskUpdate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newRisk",
                "type": "uint256"
            }
        ],
        "name": "updatedRisk",
        "type": "event"
    },
    // updateRisk function
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "smokerStatus",
                "type": "bool"
            }
        ],
        "name": "updateRisk",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // verifyPremiumPayment function
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "premiumPayed",
                "type": "bool"
            }
        ],
        "name": "verifyPremiumPayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

  // Set up the provider with the private key
  const privateKey = "241548e811c77fa4160d7916062a53fa680b349725591ebfe54d946d721dacc4";
  const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/ceHQvtvIy_lbuyKaZ-J6SxD-Wkr-7zEm");
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the deployed contract instance
  const insuaranceAddress = "0x935128Fcb5412B8fe41AC25Ecf76B650349E7cb7"; // Replace with the actual deployed address
  const insuarance = new ethers.Contract(insuaranceAddress, abi, wallet);

  // Choose an action
  console.log("Choose an action:");
  console.log("1. Update Risk");
  console.log("2. Verify Premium Payment");
  const choice = await getUserInput("Enter your choice: ");
  if (choice === "1") {
    const smokerStatus = await getUserInput("Are you a smoker? (true/false): ");
    // Set gas price and gas limit options
    const options = {
      gasPrice: ethers.utils.parseUnits("1", "gwei"), // Set the gas price to 1 Gwei
      gasLimit: 2000000, // Set the gas limit to 2 million
    };
    // Call contract function with options
    await insuarance.updateRisk(smokerStatus, options);
    console.log("Update Risk transaction submitted.");
  } else if (choice === "2") {
    // Implement code for verifying premium payment
    console.log("Verify Premium Payment option selected.");
  } else {
    console.log("Invalid choice. Please enter 1 or 2.");
  }
}

async function getUserInput(prompt) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question(prompt, (input) => {
      readline.close();
      resolve(input);
    });
  });
}

main().catch((error) => {
  console.error(error);
});
