require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
 solidity: "0.8.19",
 defaultNetwork: "sepolia",
 networks: {
   hardhat: {},
   sepolia: {
     url: "https://eth-sepolia.g.alchemy.com/v2/ceHQvtvIy_lbuyKaZ-J6SxD-Wkr-7zEm",
     accounts: ["241548e811c77fa4160d7916062a53fa680b349725591ebfe54d946d721dacc4"]
   }
 },
}
