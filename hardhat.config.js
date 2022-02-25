require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const { mnemonic } = require('./secrets.json');
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "512b809b076343188d1c9c9b745c8126"

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      account: [privateKey]
    },
    mainnet: {
      url:`https://polygon-mainnet.infura.io/v3/${projectId}`,
      account:[privateKey]
    },
    testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      chainId: 97,
     
      accounts: {mnemonic: mnemonic}
    },
  },
  solidity: "0.8.4",
};
