const hre = require("hardhat");

async function main() {
    const lottery = await hre.ethers.deployContract("Lottery");
    await lottery.waitForDeployment();
    console.log(`Lottery deploy to ${lottery.target}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});