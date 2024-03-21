// SPDX-License-Identifier: UNDEFINED
pragma solidity ^0.8.0;

contract Insurance {
    struct UserInfo {
        string userName;
        bool isSmoker;
        bool goesToGym;
        uint256 weight; // in kilograms
        uint256 age;
        uint256 payout;
        uint256 premium;
        uint256 contractCreationDate;
        uint256 contractAnullment;
        uint256 nextPaymentDate;
    }

    address private owner;
    UserInfo user;
    event RiskUpdated(uint256 newRisk);
    event PremiumUpdated(uint256 newPremium);

    constructor(
        string memory newUser,
        bool smokerStatus,
        bool gymStatus,
        uint256 userWeight,
        uint256 userAge,
        uint256 valuePayout,
        uint256 InitialPremium
    ) {
        owner = msg.sender;
        user = UserInfo({
            userName: newUser,
            isSmoker: smokerStatus,
            goesToGym: gymStatus,
            weight: userWeight,
            age: userAge,
            payout: valuePayout,
            premium: InitialPremium,
            contractCreationDate: block.timestamp,
            contractAnullment: block.timestamp + 365 days,
            nextPaymentDate: block.timestamp + 30 days
        });
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
        emit PremiumUpdated(newPremium);

        return "Profile updated successfully.";
    }
     // Function to get user profile
    function getUserProfile() public view returns (UserInfo memory) {
        return user;
    }
   
    // Function to calculate risk based on user profile
    function calculateRisk() private view returns (uint256) {
        uint256 baseRisk = user.age / 2;
        if (user.isSmoker) {
            baseRisk *= 3;
        }
        if (!user.goesToGym) {
            baseRisk = baseRisk/3;
        }
        if (user.weight > 100) {
            baseRisk *= 2;
        }
        return baseRisk;
    }

    // Function to calculate premium based on risk
    function calculatePremium(uint256 risk) private pure returns (uint256) {
        // A simplified formula for premium calculation
        return risk * 10;
    }
}
