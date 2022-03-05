// npx hardhat run scripts/deploy.js --network rinkeby

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
    txn = await pfpContract.mintPFPNFT(0);
    await txn.wait();

    console.log('----------------')
    console.log(`Verify by running\nnpx hardhat verify --constructor-args ./arguments.js ${pfpContract.address}`);

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