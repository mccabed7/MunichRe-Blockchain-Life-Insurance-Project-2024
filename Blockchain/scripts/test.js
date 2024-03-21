const { ethers } = require("ethers");

async function main() {
  // Read the contract's ABI from the file
  const abi = [
    // Constructor
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "newSmokerStatus",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "newGymStatus",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "newWeight",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newAge",
          "type": "uint256"
        }
      ],
      "name": "updateProfile",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    // getUserProfile function
    {
      "inputs": [],
      "name": "getUserProfile",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "userName",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isSmoker",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "goesToGym",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "weight",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "payout",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "premium",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "contractCreationDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "contractAnullment",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nextPaymentDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct Insurance.UserProfile",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    // verifyPremiumPayment function
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "premiumPaid",
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
  const insuranceAddress = "0xF7e841C6613cE6B19A5eb11ae74255115e6c6318"; // Replace with the actual deployed address
  const insurance = new ethers.Contract(insuranceAddress, abi, wallet);

  // Choose an action
  console.log("Choose an action:");
  console.log("1. Update Profile (Smoker Status, Gym Status, Age, Weight)");
  console.log("2. Return User Profile Parameters");
  console.log("3. Display Premium");
  const choice = await getUserInput("Enter your choice: ");
  if (choice === "1") {
    const newSmokerStatus = await getUserInput("Are you a smoker? (true/false): ");
    const newGymStatus = await getUserInput("Do you go to the gym? (true/false): ");
    const newWeight = await getUserInput("Enter your weight in kilograms: ");
    const newAge = await getUserInput("Enter your age: ");
    
    // Set gas price and gas limit options
    const options = {
      gasPrice: ethers.utils.parseUnits("1", "gwei"), // Set the gas price to 1 Gwei
      gasLimit: 2000000, // Set the gas limit to 2 million
    };
    // Call contract function with options
    const tx = await insurance.updateProfile(newSmokerStatus, newGymStatus, newWeight, newAge, options);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Profile updated successfully.");
  } else if (choice === "2") {
    // Call getUserProfile function to retrieve user profile parameters
    const userProfile = await insurance.getUserProfile();
    console.log("User Profile:");
    console.log("Username:", userProfile.userName);
    console.log("Smoker Status:", userProfile.isSmoker);
    console.log("Gym Status:", userProfile.goesToGym);
    console.log("Weight:", userProfile.weight.toNumber(), "kg"); // Convert to number
    console.log("Age:", userProfile.age.toNumber()); // Convert to number
    console.log("Payout: €", userProfile.payout.toString());
    console.log("Premium: €", userProfile.premium.toString());
    console.log("Contract Creation Date:", new Date(userProfile.contractCreationDate * 1000).toLocaleString());
    console.log("Contract Anullment Date:", new Date(userProfile.contractAnullment * 1000).toLocaleString());
    console.log("Next Payment Date:", new Date(userProfile.nextPaymentDate * 1000).toLocaleString());
  } else if (choice === "3") {
    // Call getUserProfile function to retrieve user profile parameters
const userProfile = await insurance.getUserProfile();

// Perform risk calculation based on the user's profile parameters
const baseRisk = userProfile.age.div(2).toNumber();
let newRisk = baseRisk;
if (userProfile.isSmoker) {
    newRisk *= 3;
}
if (!userProfile.goesToGym) {
    newRisk *= 2;
}
if (userProfile.weight > 100) {
    newRisk *= 2;
}

console.log("Current Risk:", newRisk);
    
    
   // Calculate premium based on the risk
   const newPremium = newRisk * 10; // Simplified formula for premium calculation

   console.log("Current Premium: €", newPremium);
  }
  else {
    console.log("Invalid choice. Please enter 1, 2, or 3.");
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
