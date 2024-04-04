// SPDX-License-Identifier: UNDEFINED
pragma solidity ^0.8.0;

contract Insurance {
    struct UserInfo {
        string userName;
        address userAddress;
        bool isSmoker;
        bool goesToGym;
        uint256 weight; // in kilograms
        int256 age;
        uint256 payout;
        int256 premium;
        uint256 contractCreationDate;
        uint256 contractAnullment;
        uint256 nextPaymentDate;
        string[] riskDescriptions;
        int256[] riskValues;
        uint256 numThirdPartyRisks;        
    }
    address private owner;
    UserInfo user;
    //Logs event of risk after recalculation
    event RiskUpdated(int256 newRisk);
    //Logs event of premium updated after recalculation
    event PremiumUpdated(int256 newPremium);
    //Logs event of added third party risk descriptions and values
    event newThirdPartyRisk(string riskDescription, int256 newRiskValue);
    constructor(
        string memory newUser,
        bool smokerStatus,
        bool gymStatus,
        uint256 userWeight,
        int256 userAge,
        uint256 valuePayout,
        int256 InitialPremium, 
        address newUserAddress,
        uint256 anullmentDate   
    ) {
        owner = msg.sender;
        user = UserInfo({
            userAddress : newUserAddress,
            userName: newUser,
            isSmoker: smokerStatus,
            goesToGym: gymStatus,
            weight: userWeight,
            age: userAge,
            payout: valuePayout,
            premium: InitialPremium,
            contractCreationDate: block.timestamp,
            contractAnullment: block.timestamp + (anullmentDate * 1 days),
            nextPaymentDate: block.timestamp + 30 days,
            riskDescriptions : new string[](0),
            riskValues : new int[](0),
            numThirdPartyRisks : 0
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
    //function that takes in some risk assessments from a third party and adds it as new third party risks
    function addThirdPartyData(string[] calldata riskDesc, int256[] calldata riskValue) public returns (int256){
        uint riskLength = riskDesc.length;
        if(riskLength != riskValue.length){
            return 0;
        }
        for(uint256 i = 0; i < riskLength; i++){
            user.riskValues.push(riskValue[i]);
            user.riskDescriptions.push(riskDesc[i]);
            emit newThirdPartyRisk(riskDesc[i], riskValue[i]);
        }
        user.numThirdPartyRisks += riskLength;
        updateProfile(user.isSmoker, user.goesToGym, user.weight, user.age);
        return 1;
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
        for(uint256 i = 0; i < user.numThirdPartyRisks; i++){
             baseRisk += user.riskValues[i];
        }
        return baseRisk;
    }

    // Function to calculate premium based on risk
    function calculatePremium(int256 risk) private view returns (int256) {
        // A simplified formula for premium calculation
        return risk * 100 + (int256(user.payout/100));
    }
}
