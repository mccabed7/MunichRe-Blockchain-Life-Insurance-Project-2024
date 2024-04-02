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
  #pass in application to be approved and value 1
  #response = requests.put(f"{localhost}/api/approval", )
  print(applications)

# make a way to print out the applications 
  # probably stored in a tuple
  #applications is a list so cannot be concatenated in a tuple
  for i in range(len(applications)):
    print(i)
    print(applications[i])
# and select them and send them back to the api for approval
# where the approved get added to Users
   #Could create an array with an index to the tuple and a default false value for approval, approve using
    #a put request to change value to true.
  index = input("choose application to approve (index)")
# you will need to change login.py for that.