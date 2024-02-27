from web3 import Web3 # requires you to run `pip install web3`
# import os
import requests
import json
from secret import ALCHEMY_API_KEY, ETHERSCAN_API_KEY, WALLET_PRIVATE_KEY
# API_KEY = os.environ['API_KEY']

CONTRACT_ABI = ''

# Address calling the functions/signing transactions
CALLER_ADDRESS = ""  # Ethereum PUBLIC address from MetaMask wallet (Testnet Account)

# Contract address for which you want to get the ABI
CONTRACT_ADDRESS = "" # CONTRACT_ADDRESS -  Deployed contracts tab in Remix

# Alchemy API URL
alchemy_url = f"https://eth-sepolia.g.alchemy.com/v2/{ALCHEMY_API_KEY}"
web3 = Web3(Web3.HTTPProvider(alchemy_url))
def check_connection():
  # Verify if the connection is successful
  if web3.is_connected():
      print("-" * 50)
      print("Connection Successful")
      print("-" * 50)
      latest_block = web3.eth.get_block("latest")
      print(latest_block)
  else:
      print("Connection Failed")
  
def get_contract_abi():
  # URL for the Etherscan API endpoint to get contract ABI
  etherscan_url = f"https://api.etherscan.io/api?module=contract&action=getabi&address={CONTRACT_ADDRESS}&apikey={ETHERSCAN_API_KEY}"

  # Make an API request to Etherscan
  response = requests.get(etherscan_url)

  # Parse the response JSON
  data = response.json()

  # Check if the request was successful
  if data['status'] == '1' and data['message'] == 'OK':
      # ABI is returned as a JSON-encoded string, so we need to parse it
      contract_abi = json.loads(data['result'])
      print("Contract ABI:")
      print(json.dumps(contract_abi, indent=2))
  else:
      print("Error fetching contract ABI:", data['result'])
def example():
   # Initialize address nonce
  nonce = web3.eth.get_transaction_count(CALLER_ADDRESS)

  try:
      # Parse the ABI string to a Python object
      parsed_abi = json.loads(CONTRACT_ABI)
      print("ABI is valid JSON.")
  except json.JSONDecodeError as e:
      print(f"Invalid JSON: {e}")

  # Then use the parsed ABI to create the contract instance
  contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=parsed_abi)

  # Now, parsed_abi should be a list of dictionaries
  if isinstance(parsed_abi, list):
      # Extract functions from the ABI
      functions = [item for item in parsed_abi if item.get('type') == 'function']

      # Iterate over the functions and print details
      for func in functions:
          func_name = func.get('name', 'Unnamed function')
          inputs = func.get('inputs', [])
          input_details = ', '.join([f"{inp['type']} {inp['name']}" for inp in inputs])
          print(f"Function name: {func_name}({input_details})")
  else:
      print("The ABI was not parsed into a list as expected.")


  # Create the contract instance
  contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=parsed_abi)

  # Example function call (Make sure the function exists in your ABI)
  try:
      # Replace 'getSentence' with an actual function from your contract's ABI
      quote = contract.functions.getSentence().call()
      print("\nThe famous quote is:\n", quote)
      pass  # Replace or remove this pass statement with your function call
  except Exception as e:
      print(f"Error calling function: {e}")