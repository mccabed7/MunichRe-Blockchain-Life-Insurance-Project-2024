# Backend Team

This README is for launching your own API

## Setup
We require that you have <b>python</b> and <b>nodejs</b> installed

https://www.python.org/downloads/

https://nodejs.org/en/download/ 

<br>

We use flask to provide the API endpoints. 

This may require you to run
```
pip install flask web3
```
on your device.


## API

Before the API can be launched, you neeed to create a `secret.py` file inside of the backend and include
```
# https://docs.etherscan.io/getting-started/viewing-api-usage-statistics
ETHERSCAN_API_KEY = ''

# https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-key
ALCHEMY_API_KEY = ''

# not necessary
# Ethereum PUBLIC address from MetaMask wallet (Testnet Account)
CREATOR_ADDRESS = ''
```

And create a `.env` file inside of the Blockchain and include
```
# https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-key
API_URL = "https://eth-sepolia.g.alchemy.com/v2/"

# Metamask wallet
PRIVATE_KEY = "241548e811c77fa4160d7916062a53fa680b349725591ebfe54d946d721dacc4"
```

and you need to run
```
npm install &&
npx hardhat compile
```
inside the Blockchain folder.

The API can finally be launched with 
```
python3 main.py
```

