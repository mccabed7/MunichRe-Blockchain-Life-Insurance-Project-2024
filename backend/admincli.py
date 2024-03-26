# file for running separately from main
import requests
# auto fetch and select pending third party to approve

api = "https://localhost:5000/api/"
email = "emmapart@gmail.com"
password = "password123"

if __name__=="__main__":
  response = requests.get(api + "login")
  print(response)