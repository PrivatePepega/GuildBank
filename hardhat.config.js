require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      gas: 100000000,
      blockGasLimit: 100000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      allowUnlimitedContractSize: true,
      gas: 100000000,
      blockGasLimit: 100000000,
    },
      // If you want to specify accounts, you can do so here, but Hardhat generates some for you
    },
    // You can add other networks like Ropsten, Mainnet, etc., here
  }
  // You can also add more Hardhat configurations like paths, gas settings, etc.

