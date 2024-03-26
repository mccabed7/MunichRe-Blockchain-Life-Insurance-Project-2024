# file for running separately from main
import requests
# auto fetch and select pending third party to approve

localhost = "http://127.0.0.1:5000"
email = "emmapart@gmail.com"
password = "password123"

if __name__=="__main__":
  resp = requests.get( f"{localhost}/api/login", params={'emailAddress': email, 'password' : password})
  sid = resp.json()
  resp = requests.get(f"{localhost}/api/third-party", params={'emailAddress': email, 'sid' : sid})
  applications = resp.json()
  print(applications)

# make a way to print out the applications 
  # probably stored in a tuple
  for i in iter(applications):
    print(i)
# and select them and send them back to the api for approval
# where the approved get added to Users
    
# you will need to change login.py for that.