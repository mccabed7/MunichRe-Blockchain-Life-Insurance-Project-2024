
async function main() {

  const Insuarance = await ethers.getContractFactory("Insurance");
  const insuarance = await Insuarance.deploy("John", false, true, 75, 30, 75000, 200);
  console.log("Contract Deployed to Address:", insuarance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
