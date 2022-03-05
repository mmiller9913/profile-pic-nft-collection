// npx hardhat run scripts/deploy.js --network rinkeby
// npx hardhat run scripts/deploy.js --network mainnet
// npx hardhat run scripts/deploy.js --network mumbai

const args = require('../arguments.js');

const main = async () => {
    const pfpContractFactory = await hre.ethers.getContractFactory('ProfilePicNFT');
    // const pfpContract = await pfpContractFactory.deploy(
    //     ["Naval Ravikant", "Matt", "Kapil Gupta"],
    //     ["https://i.imgur.com/pJXyoLW.jpeg", "https://i.imgur.com/UJ8qVri.jpg", "https://i.imgur.com/zxhO6mR.jpg"],
    // );
    const pfpContract = await pfpContractFactory.deploy(
        args[0],
        args[1]
    );
    await pfpContract.deployed();
    console.log("Contract deployed to:", pfpContract.address);

    let txn;
    txn = await pfpContract.mintPFPNFT(1);
    await txn.wait();

    // txn = await pfpContract.mintPFPNFT(1);
    // await txn.wait();

    const networkName = hre.network.name;

    console.log('----------------')
    console.log(`Verify by running\n npx hardhat verify --constructor-args ./arguments.js --network ${networkName} ${pfpContract.address}`);

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();

//before deploying to mainnet
//1) Change Alchemy node 
//2) Confirm NFT collection name 
//3) Edit hardhat config to use etherscan API key

//where i left off
//realized deploying this to eth mainnet would cost hundreds
//going to try deploying to polygon
//need to test by deploying to mumbai
//having difficulty getting test MATIC
//get real MATIC
//once that works, deploy to polygon mainnet 