// SPDX-License-Identifier: UNDEFINED
pragma solidity ^0.8.18;


contract Subscription{
    struct Subscriber {
        uint256 subscriptionId;
        address subscriberAddress;
        uint256 startedAt;
        uint256 expiresAt;
        bool isSmoker;
        uint256[] riskAssessments;
        uint256 payout;
        uint256 age;
        uint256 premium;
    }

    mapping(address => Subscriber) internal _subscribers;
    uint256 private _currentSubscriptionId = 0; // Counter for unique subscription IDs
    address private _owner; // Owner address for potential withdrawal function

    // Events
    event SubscriptionStarted(address indexed subscriber, uint256 subscriptionId, uint256 startDate, uint256 expiryDate);
    event SubscriptionRenewed(address indexed subscriber, uint256 expiryDate);
    event SubscriptionCancelled(address indexed subscriber);

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can call this function");
        _;
    }

    function createSubscription(bool smokingStatus,uint256 age, uint256 payoutValue) external payable{
        require(msg.value == 0.01 ether, "Subscription: InvalidAmount");
        require(_subscribers[msg.sender].subscriberAddress != msg.sender || _subscribers[msg.sender].expiresAt < block.timestamp, "Subscription: Already Exists Or Renew");

        _currentSubscriptionId++; // Increment the ID for a new subscription

        _subscribers[msg.sender] = Subscriber({
            subscriptionId: _currentSubscriptionId,
            subscriberAddress: msg.sender,
            startedAt: block.timestamp,
            expiresAt: block.timestamp + 30 days, 
            riskAssessments: new uint256[](0),
            isSmoker: smokingStatus,
            payout: payoutValue,
            age : age,
            premium: 0
    });

        emit SubscriptionStarted(msg.sender, _currentSubscriptionId, block.timestamp, block.timestamp + 30 days);
    }
    function updateRisk(address subscriberAddress) external{
        require(_subscribers[msg.sender].subscriberAddress == msg.sender, "Subscription: OnlySubscribers");
        //stored in wei as floats do not work in solidity
        uint256 amount = (100000000000000000 *_subscribers[subscriberAddress].age)/2 * (_subscribers[subscriberAddress].isSmoker? 3:1);
        _subscribers[subscriberAddress].premium = amount;
        _subscribers[subscriberAddress].riskAssessments.push(amount/100000000000000);
    }
    

    function renewSubscription(uint256 subscriptionId) external payable {
        require(_subscribers[msg.sender].subscriberAddress == msg.sender, "Subscription: OnlySubscribers");
        require(_subscribers[msg.sender].expiresAt < block.timestamp, "Subscription: SubscriptionNotExpired");
        require(_subscribers[msg.sender].subscriptionId == subscriptionId, "Subscription: InvalidSubscriptionId");
        require(msg.value == 0.01 ether, "Subscription: InvalidAmount");
        

        _subscribers[msg.sender].expiresAt = block.timestamp + 30 days;

        emit SubscriptionRenewed(msg.sender, block.timestamp + 30 days);
    }

    function cancelSubscription(uint256 subscriptionId) external{
        require(_subscribers[msg.sender].subscriberAddress == msg.sender, "Subscription: OnlySubscribers");
        require(_subscribers[msg.sender].subscriptionId == subscriptionId, "Subscription: InvalidSubscriptionId");

        delete _subscribers[msg.sender];

        emit SubscriptionCancelled(msg.sender);
    }

    function subscriptionData(address subscriber) external view returns (Subscriber memory) {
        return _subscribers[subscriber];
    }

    function isSubscribed(address subscriber) external view  returns (bool) {
        return (_subscribers[subscriber].subscriberAddress == subscriber && _subscribers[subscriber].expiresAt > block.timestamp);
    }
    function subscriberPremium(address subscriber) external view returns(uint256){
        require(_subscribers[msg.sender].subscriberAddress == msg.sender, "Subscription: OnlySubscribers");
        return _subscribers[subscriber].premium;
    }

    function withdraw() external onlyOwner {
        payable(_owner).transfer(address(this).balance);
    }
}
