pragma solidity ^0.8.0;
//this doesnt quite work more of a placeholder
// Import necessary libraries and interfaces
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract subscription is Ownable {
     
    using SafeMath for uint256;

    IERC20 public token;

    struct User {
        address user;
        uint8 subType;
        uint256 termStart;
        uint256 nextPayment;
        uint256 riskProfile;
    }

    mapping(address => User) public users;

    uint256 public MONTH_PRICE = 15 * 10**6;
    uint256 public YEAR_PRICE = 150 * 10**6;

    uint256 public subscriptions;

    // Events...
    event Subscription(address indexed user, uint8 subType, uint256 termStart, uint256 nextPayment, riskProfile);

    // Constructor...
    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function subscribe(uint8 tokenId) external  {
        uint256 amountPaid;
        uint256 nextPayment;

        if (tokenId == 1) {
            amountPaid = MONTH_PRICE;
            nextPayment = block.timestamp + (30 days);
        } else if (tokenId == 2) {
            amountPaid = YEAR_PRICE;
            nextPayment = block.timestamp + (365 days);
        } else {
            revert("Invalid tokenId input");
        }

        require(token.balanceOf(msg.sender) >= amountPaid, "Insufficient funds");

        subscriptions++;

        users[msg.sender] = User(
            msg.sender,
            tokenId,
            block.timestamp,
            nextPayment,
            0
             );

        emit Subscription(msg.sender, tokenId, block.timestamp, nextPayment, riskProfile);

        token.transferFrom(msg.sender, owner(), amountPaid);
    }

    function checkStatus(address _addr) external view returns (bool) {
        // Implement status checking logic...
        return true;
    }

    function payBill(address _addr) external {
        // Implement bill payment logic...
    }

}