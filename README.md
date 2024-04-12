# SwEng Project 23 Setup Instructions

Welcome to the setup instructions for SwEng Project 23. This document will guide you through setting up the Backend with Blockchain integration and the Frontend for our project.  All code was tested on Windows and Linux (Ubuntu).  To get started, pull the repo from the following link: https://github.com/mccabed7/sweng23/tree/main , and then complete the following steps in order.

## 1) Backend + Blockchain Setup

### Requirements

- Python3 with 'pip' installed
- An up-to-date version of Node.js, with npm and npx installed (this link includes all 3: https://nodejs.org/en/download)

### Installation Steps

- Run the following commands to install Python dependencies:
- ```pip install web3``` 
- ```pip install flask```
- ```pip install -U flask-cors```
- Now do the following to setup the blockchain integration:
- In you terminal of choice navigate to ```/sweng23/Blockchain``` and run the following commands to set up the blockchain integration:
- ```npm install```
- ```npx hardhat compile```
- 😀 The backend server is now installed locally 😀
- **To run the server:**
- Navigate to ```/sweng23/backend```, and run the ```main.py``` file (on most systems this is done by typing ```python main.py``` into the terminal)
- The terminal should now show the server running on ```http://127.0.0.1:5000```


## 2) Frontend Setup
We have two frontend interfaces in our project.  A main User-Client one, and also a Third-Party-Client one.  In short, the User one is where a user can view and modify their Risk Profile which is stored and calculated on a real Ethereum-based blockchain.  The Third-Party one is for outside actors (in our case a hospital that gives health updates) to modify a particular user's Risk-Profile on the blockchain.


### Requirements

- The backend must be completely set-up and running on the machine you plan on running the frontend on.
- **Already installed with backend:** An up-to-date version of Node.js, with npm and npx installed (this link includes all 3: https://nodejs.org/en/download)

### Installation Steps

- **User-Client:** Navigate to ```/sweng23/frontend``` and run the command ```npm install```
- **Third-Party-Client:** Navigate to ```/sweng23/hospital/myapp``` and run the command ```npm install```
- 😀 Both clients are now installed 😀
- **To run the clients:**
- Navigate to either ```/sweng23/frontend``` (main) or ```/sweng23/hospital/myapp``` (third-party), depending on which frontend you want to run, and type ```npm start``` to launch it.
- The chosen client will now open in your browser.

### Using the User-Client

In this Client you can view and update your dynamically-changing Risk-Profile, just like how you would with, for example, black-box car insurance.  For convenience sake, you can login with the pre-made account we created for demonstration purposes, or alternatively you can create a new account.  Both are done by clicking ```Register``` at the top-right of the landing-page.  Below are the login details for this pre-made account:

- Email: ```jameshumphrey@gmail.com```
- Password: ```6795```

### Using the Third-Party-Client

This Client allows a health-service provider to dynamically submit health updates for it's customers.  When submitting info, you first type in the email address of the user you want, and then select the values you want to submit.  

- Note: The email must be that of a user that has been created.  Again, for demonstration and marking purposes it is most convenient to use the aforementioned ```jameshumphrey@gmail.com``` user.

### View Contract on Testnet:
If you are interested, you can view all blockchain-transactions on the example account we set up at the following link: ```https://sepolia.etherscan.io/address/0x26404cd6030d60e60Bd03B118ee88e52cb652F69```

