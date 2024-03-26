# this will hold session Ids and generate them
import random
import time
sessions = {
    # 157981659 : 'jameshumphrey@gmail.com'
}

# key value is email
# contains dictonary with 'password' and 'data' (which containes contract address, admin or third-party)
Users = {
    'jameshumphrey@gmail.com' : {'password' : '6795', 'data' : '0xF7e841C6613cE6B19A5eb11ae74255115e6c6318'}, 
    'emmapart@gmail.com' : {'password' : 'password123', 'data' : 'admin'},
    'third@party.com' : {'password' : 'asdfghjk', 'data' : 'third-party'}
}

def attempt_Login(emailAddress, password):
    if emailAddress in Users:
        return password == Users[emailAddress]["password"]
    return False

def get_data(emailAddress):
    if emailAddress in Users:
        return Users[emailAddress]['data']
    return None

def add_Details(emailAddress, signupDetails):
    password = signupDetails.get("password", "")
    index = len(sessions) + 1
    Users[emailAddress] = {"password" : password, "data" : index}  
    sid = add_Session_id(emailAddress)
    return sid

def delete_Details(sid, emailAddress):
    if check_Session_id(sid, emailAddress):
        return Users.pop(emailAddress)

def modify_Password(emailAddress, arguments):
    newPassword = arguments.get("newPassword", "")
    password = 'password'
    Users[emailAddress][password] = newPassword
    return Users[emailAddress][password]

def generate_Session_id():
    sessionId = random.randint(1, 2**128)
    while sessionId in sessions:
        sessionId = random.randint(1, 2**128)
    return sessionId

def add_Session_id(emailAddress):
    sessionId = generate_Session_id() 
    # TODO store a timestamp in future for removing old sessions
    sessions[str(sessionId)] = emailAddress # no need to store another nested dictionary
    return sessionId

def search_Sessions(emailAddress):       #function to search for key tied to email, temporary function
    for key, value in sessions.items():
        if emailAddress == value:
            return key
        

def check_Session_id(sid, email):
    print(sessions)
    check = sessions.get(sid, None)
    return check!=None and check == email

# currently no check to clean sessions