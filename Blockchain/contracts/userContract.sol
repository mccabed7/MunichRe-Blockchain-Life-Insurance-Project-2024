// SPDX-License-Identifier: UNDEFINED
pragma solidity ^0.8.24;

contract Insuarance{
    struct User_Info {
        //address userAddress;
        string userName;
        bool isSmoker;
        uint256[] riskAssessments;
        uint256 payout;
        uint256 age;
        uint256 premium;
        uint256 contractCreationDate;
        uint256 contractAnullment;
        uint256 nextPaymentDate;
    }
    address private owner;
    User_Info user;
    event updatedRisk(uint256 riskUpdate, uint256 newRisk);
    constructor(string memory newUser, bool smokerStatus, uint256 valuePayout, uint256 userAge, uint256 InitialPremium, uint256 contractLength){
        owner = msg.sender;
        user = User_Info({
            //userAddress : newUserAddress,
            userName : newUser,
            isSmoker : smokerStatus,
            riskAssessments : new uint256[](0),
            payout : valuePayout,
            age : userAge, 
            premium:InitialPremium,
            contractCreationDate : block.timestamp,
            contractAnullment: block.timestamp + contractLength,
            nextPaymentDate: block.timestamp + 40 days
        });
    }
  //Have to add parameters that might change risk
    function updateRisk(bool smokerStatus) external{
        user.isSmoker = smokerStatus;
        uint256 newRisk = ((user.age/2) * (user.isSmoker?3:1));
        user.premium = newRisk * 100;
        user.riskAssessments.push(newRisk);
        emit updatedRisk(block.timestamp, newRisk);
    }

        //payout check cannot run on an internal timer on the smart contract
    function verifyPremiumPayment(bool premiumPayed) external {
        if (premiumPayed && block.timestamp < user.nextPaymentDate){
            user.nextPaymentDate = block.timestamp + 40 days;
            return;
        }
        //function that handles deleting/disabling contract
        
    }
}
