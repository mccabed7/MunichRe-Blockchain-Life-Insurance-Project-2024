# file for running separately from main
import requests
# auto fetch and select pending third party to approve

localhost = "http://127.0.0.1:5000"
email = "emmapart@gmail.com"
password = "password123"

if __name__=="__main__":
  sid = requests.get( f"{localhost}/api/login", params={'emailAddress': email, 'password' : password})
  print(sid)
  resp = requests.get(f"{localhost}/api/third-party", params={'emailAddress': email, 'sid' : sid})
  print(resp)