// SPDX-License-Identifier: Sweng-23
pragma solidity ^0.8.13;


contract Subscription{
    struct Subscriber {
        uint256 subscriptionId;
        address subscriberAddress;
        uint256 startedAt;
        uint256 expiresAt;
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

    function getSubscription() external payable{
        require(msg.value == 0.01 ether, "Subscription: InvalidAmount");
        require(_subscribers[msg.sender].subscriberAddress != msg.sender || _subscribers[msg.sender].expiresAt < block.timestamp, "Subscription: AlreadyExistsOrRenew");

        _currentSubscriptionId++; // Increment the ID for a new subscription

        _subscribers[msg.sender] = Subscriber(
            _currentSubscriptionId,
            msg.sender,
            block.timestamp,
            block.timestamp + 30 days
        );

        emit SubscriptionStarted(msg.sender, _currentSubscriptionId, block.timestamp, block.timestamp + 30 days);
    }

    function renewSubscription(uint256 subscriptionId) external payable {
        require(_subscribers[msg.sender].subscriberAddress == msg.sender, "Subscription: OnlySubscribers");
        require(_subscribers[msg.sender].expiresAt < block.timestamp, "Subscription: SubscriptionNotExpired");
        require(msg.value == 0.01 ether, "Subscription: InvalidAmount");
        require(_subscribers[msg.sender].subscriptionId == subscriptionId, "Subscription: InvalidSubscriptionId");

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

    function withdraw() external onlyOwner {
        payable(_owner).transfer(address(this).balance);
    }
}
