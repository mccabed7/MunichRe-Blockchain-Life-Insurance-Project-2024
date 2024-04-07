// SPDX-License-Identifier: UNDEFINED
pragma solidity ^0.8.0;

contract Insurance {
    struct UserInfo {
        // string userName;
        bool isSmoker;
        bool goesToGym;
        uint256 weight; // in kilograms
        uint256 age;
        uint256 payout;
        uint256 premium;
        uint256 contractCreationDate;
        uint256 contractAnullment;
        uint256 nextPaymentDate;
        //uint256 numThirdPartyRisks; 
        uint256 drinksPerWeek;
        uint256 highRiskHours;
        uint256 numberOfMedications;
        uint256 hoursOfSleep;
        uint256 cholestrol;
        uint256 exercisePerWeek;
        uint256 stepsPerDay;
        uint256 waistCircumference;
        // uint256[] riskHistory;
    }
    enum varId {
        // userName,
        isSmoker,
        goesToGym,
        weight,
        age,
        payout,
        premium,
        contractCreationDate,
        contractAnullment,
        nextPaymentDate,
        //numThirdPartyRisks,
        drinksPerWeek,
        highRiskHours,
        numberOfMedications,
        hoursOfSleep,
        cholestrol,
        exercisePerWeek,
        stepsPerDay,
        waistCircumference
    }
    address private owner;
    UserInfo user;
    bool userPaymentFailure = false;
    //Logs event of risk after recalculation
    event RiskUpdated(uint256 newRisk);
    //Logs event of premium updated after recalculation
    event PremiumUpdated(int256 newPremium);
    //Logs event of added third party risk descriptions and values
    event newThirdPartyRisk(string riskDescription, int256 newRiskValue);
    constructor(
        // string memory userName,
        bool isSmoker,
        bool goesToGym,
        uint256 weight, // in kilograms
        uint256 age,
        uint256 payout,
        uint256 premium,
        uint256 daysToAnullment
    ) {
        owner = msg.sender;
        user = UserInfo({
        // userAddress : newUserAddress,
        // userName: userName, 
        isSmoker : isSmoker,
        goesToGym: goesToGym,
        weight : weight,
        age : age,
        payout : payout,
        premium : premium,
        contractCreationDate: block.timestamp,
        contractAnullment: block.timestamp + (daysToAnullment * 1 days),
        nextPaymentDate: block.timestamp + 30 days,
        //numThirdPartyRisks,
        drinksPerWeek : 0,
        highRiskHours : 0,
        numberOfMedications : 0,
        hoursOfSleep : 8,
        cholestrol : 0,
        exercisePerWeek : 6,
        stepsPerDay : 10000,
        waistCircumference : 0
        // riskHistory : new uint256[](calculateRisk())
        });
        emit RiskUpdated(calculateRisk());
        // emit RiskUpdated(user.riskHistory[0]);
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
    function setNewAge(uint256 newAge) public{
        user.age = newAge;
        updateProfile(user.isSmoker, user.goesToGym, user.weight, user.age);
    }

    function updateEvent(uint256[] calldata kargs, uint nargs) public returns (string memory) {
        require(msg.sender == owner, "Only the contract owner can update the profile.");

        for (uint i = 0; i<nargs ; i += 2) {
            if (varId(kargs[i]) == varId.isSmoker) {
                user.isSmoker = (kargs[++i] == 1? true:false);
            }
            else if (varId(kargs[i]) == varId.goesToGym) {
                user.goesToGym = (kargs[++i] == 1? true:false);
            }
            else if (varId(kargs[i]) == varId.weight) {
                user.weight = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.age) {
                user.age = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.payout) {
                user.payout = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.premium) {
                user.premium = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.contractCreationDate) {
                user.contractCreationDate = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.contractAnullment) {
                user.contractAnullment = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.nextPaymentDate) {
                user.nextPaymentDate = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.drinksPerWeek) {
                user.drinksPerWeek = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.highRiskHours) {
                user.highRiskHours = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.numberOfMedications) {
                user.numberOfMedications = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.hoursOfSleep) {
                user.hoursOfSleep = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.cholestrol) {
                user.cholestrol = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.exercisePerWeek) {
                user.exercisePerWeek = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.stepsPerDay) {
                user.stepsPerDay = kargs[++i];
            }
            else if (varId(kargs[i]) == varId.waistCircumference) {
                user.waistCircumference = kargs[++i];
            }
        }
        uint256 risk = calculateRisk();
        // user.riskHistory.push(risk);
        emit RiskUpdated(risk);
        return "Success";
    }

    function stringToUint(string calldata s) internal pure returns(uint256, bool) 
    {
        bytes memory b = bytes(s);
        uint result = 0;
        bool success = false;
        for (uint i = 0; i < b.length; i++) { 
            if (b[i] >= 0x30 && b[i] <= 0x39) {
                result = result * 10 + (uint8(b[i]) - 0x30); 
                success = true;
            } else {
                result = 0;
                success = false;
                break;
            }
        } 
        return (result, success);
    }

    // Function to update risk profile and premium based on user inputs
    function updateProfile(
        bool newSmokerStatus,
        bool newGymStatus,
        uint256 newWeight,
        uint256 newAge
    ) public returns (string memory) {
        require(msg.sender == owner, "Only the contract owner can update the profile.");

        // Update user's profile
        user.isSmoker = newSmokerStatus;
        user.goesToGym = newGymStatus;
        user.weight = newWeight;
        user.age = newAge;

        // Calculate new risk and premium based on updated profile
        uint256 newRisk = calculateRisk();
        uint256 newPremium = calculatePremium(newRisk);

        // Update user's risk profile and premium
        user.premium = newPremium;

        // Emit events for updated risk and premium
        emit RiskUpdated(newRisk);
        // user.riskHistory.push(newRisk);
        // emit PremiumUpdated(newPremium);

        return "Profile updated successfully.";
    }
     // Function to get user profile
    function getUserProfile() public view returns (UserInfo memory) {
        return user;
    }
    /*
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
   */
    // Function to calculate risk based on user profile
    function calculateRisk() public view returns (uint256) {
        uint256 baseRisk = user.age / 2;
        if (user.isSmoker) {
            baseRisk *= 4;
        }
        if (!user.goesToGym) {
            baseRisk = baseRisk/2;
        }
        if (user.weight > 100) {
            baseRisk *= 2;
        }
        if (user.drinksPerWeek > 10){
            baseRisk += 10;
        }
        if (user.numberOfMedications > 5){
            baseRisk += 15;
        }
        if(user.hoursOfSleep < 5){
            baseRisk += 10;
        }
        if(user.cholestrol > 170){
            baseRisk += 20;
        }
        if(user.exercisePerWeek < 5){
            baseRisk += 3;
        }
        if(user.stepsPerDay <= 10000){
            baseRisk += 1;
        }
        if(user.waistCircumference > 50){
            baseRisk += 6;
        }


        // for(uint256 i = 0; i < user.numThirdPartyRisks; i++){
        //      baseRisk += user.riskValues[i];
        // }
        
        return baseRisk;
    }

    // Function to calculate premium based on risk
    function calculatePremium(uint256 risk) private view returns (uint256) {
        // A simplified formula for premium calculation
        return risk * 100 + (user.payout/100);
    }
    //The user payment amount is varied and if its paid on time
    function validatePayment(uint256 paymentAmount) public returns (bool){
        if(block.timestamp <= user.nextPaymentDate){
            if(paymentAmount >= user.premium){
                user.nextPaymentDate = block.timestamp + 30 days;
                return true;
            }
        }
        userPaymentFailure = true;
        return false;
    }
    //Checks if a claim should be made and the payment amount should be paid
    function validClaim() public view returns (bool){
        if(!userPaymentFailure && (block.timestamp < user.contractAnullment)){
            return true;
        }
        return false;
    }
}
