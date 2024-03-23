// SPDX-License-Identifier: UNDEFINED
pragma solidity ^0.8.0;

contract Insurance {
    struct UserInfo {
        string userName;
        //address userAddress;
        bool isSmoker;
        bool goesToGym;
        uint256 weight; // in kilograms
        int256 age;
        uint256 payout;
        int256 premium;
        uint256 contractCreationDate;
        uint256 contractAnullment;
        uint256 nextPaymentDate;
        
    }
    //cant place a mapping inside of a struct
    mapping(string => int256) thirdPartyRisk;
    //this is a space expensive implementation but is the only way to loop through a mapping
    //if we can get rid of mappings and just save the risks 
    mapping(uint256 => string) thirdPartyIndexes;
    uint256 private numThirdPartyRisks = 0;
    address private owner;
    UserInfo user;
    event RiskUpdated(int256 newRisk);
    event PremiumUpdated(int256 newPremium);
    event newThirdPartyRisk(string riskDescription, int256 newRiskValue);
    constructor(
        string memory newUser,
        bool smokerStatus,
        bool gymStatus,
        uint256 userWeight,
        int256 userAge,
        uint256 valuePayout,
        int256 InitialPremium, 
        //address newUserAddress,
        uint256 anullmentDate
    ) {
        owner = msg.sender;
        user = UserInfo({
            //userAddress : newUserAddress,
            userName: newUser,
            isSmoker: smokerStatus,
            goesToGym: gymStatus,
            weight: userWeight,
            age: userAge,
            payout: valuePayout,
            premium: InitialPremium,
            contractCreationDate: block.timestamp,
            contractAnullment: block.timestamp + (anullmentDate * 1 days),
            nextPaymentDate: block.timestamp + 30 days
        });
    }
    //function to set users smoker status and update existing risk
    function setSmokerStatus(bool newSmokerStatus) public{
        user.isSmoker = newSmokerStatus;
        updateProfile(user.isSmoker, user.goesToGym, user.weight, user.age);
    }
    //function to set users gym status and update existing risk
    function setGymStatus(bool newGymStatus) public{
        user.goesToGym = newGymStatus;
        updateProfile(user.isSmoker, user.goesToGym, user.weight, user.age);
    }
    //function to set users weight and update existing risk
    function setNewWeight(uint256 newWeight) public{
        user.weight = newWeight;
        updateProfile(user.isSmoker, user.goesToGym, user.weight, user.age);
    }
    //function to set users age and update existing risk
    function setNewAge(int256 newAge) public{
        user.age = newAge;
        updateProfile(user.isSmoker, user.goesToGym, user.weight, user.age);
    }
    

    // Function to update risk profile and premium based on user inputs
    function updateProfile(
        bool newSmokerStatus,
        bool newGymStatus,
        uint256 newWeight,
        int256 newAge
    ) public returns (string memory) {
        require(msg.sender == owner, "Only the contract owner can update the profile.");

        // Update user's profile
        user.isSmoker = newSmokerStatus;
        user.goesToGym = newGymStatus;
        user.weight = newWeight;
        user.age = newAge;

        // Calculate new risk and premium based on updated profile
        int256 newRisk = calculateRisk();
        int256 newPremium = calculatePremium(newRisk);

        // Update user's risk profile and premium
        user.premium = newPremium;

        // Emit events for updated risk and premium
        emit RiskUpdated(newRisk);
        emit PremiumUpdated(newPremium);

        return "Profile updated successfully.";
    }
     // Function to get user profile
    function getUserProfile() public view returns (UserInfo memory) {
        return user;
    }
    //function that takes in some new risk assessment from a third party and adds it to modify the existing risk
    function addThirdPartyData(string memory riskDesc, int256 riskValue) public {
        thirdPartyRisk[riskDesc] = riskValue;
        thirdPartyIndexes[numThirdPartyRisks] = riskDesc;
        numThirdPartyRisks++;
        emit newThirdPartyRisk(riskDesc, riskValue);
        updateProfile(user.isSmoker, user.goesToGym, user.weight, user.age);
    }
   
    // Function to calculate risk based on user profile
    function calculateRisk() public view returns (int256) {
        int256 baseRisk = user.age / 2;
        if (user.isSmoker) {
            baseRisk *= 3;
        }
        if (!user.goesToGym) {
            baseRisk = baseRisk/3;
        }
        if (user.weight > 100) {
            baseRisk *= 2;
        }
        for(uint256 i = 0; i < numThirdPartyRisks; i++){
             baseRisk += thirdPartyRisk[thirdPartyIndexes[i]];
        }
        return baseRisk;
    }

    // Function to calculate premium based on risk
    function calculatePremium(int256 risk) private view returns (int256) {
        // A simplified formula for premium calculation
        return risk * 100 + (int256(user.payout/100));
    }
}
