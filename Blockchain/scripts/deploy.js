
async function main() {

  const Insuarance = await ethers.getContractFactory("Insurance");
  //       bool isSmoker,
  //       bool goesToGym,
  //       uint256 weight, // in kilograms
  //       uint256 age,
  //       uint256 payout,
  //       uint256 premium,
  //       uint256 daysToAnullment
  const insuarance = await Insuarance.deploy(false, true, 75, 34, 75000, 200, 365);
  console.log("Contract Deployed to Address:", insuarance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
