require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: '.env' });
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.ANJUNA_PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.OTHER_PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.OTHER_PRIVATE_KEY],
    },
    polygon: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.OTHER_PRIVATE_KEY],
    }
  },
  //when using polygon
  etherscan: {
    apiKey: process.env.POLYSCAN_API
  }
  //when using ethereum
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API
  // }
};
