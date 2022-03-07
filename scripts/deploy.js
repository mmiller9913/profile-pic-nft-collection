// npx hardhat run scripts/deploy.js --network rinkeby
// npx hardhat run scripts/deploy.js --network mainnet
// npx hardhat run scripts/deploy.js --network mumbai
// npx hardhat run scripts/deploy.js --network matic

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

//before deploying 
//1) Change Alchemy node and also change key in process.env
//2) Confirm NFT collection name 
//3) Edit hardhat config to use etherscan or polyscan API key

//note for future
//only image of me was minted
//to mint naval (_pfpIndex = 0) or kapil (_pfpIndex = 2), use this: https://polygonscan.com/address/0x06386C0f7f2Dc85bfC3F56561ACfaE4240f289F9#writeContract