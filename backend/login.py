# this will hold session Ids and generate them
import random
sessions = {

}

Users = {
'jameshumphrey@gmail.com' : {'password' : '6795', 'data' : '1'},
'emmapart@gmail.com' : {'password' : 'password123', 'data' : '2'}

}

def attempt_Login(emailAddress, password):
    if emailAddress in Users:
        return password == Users[emailAddress]["password"]
    return False

def add_Details(emailAddress, signupDetails):
    password = signupDetails.get("password", "")
    data = signupDetails.get("data", "")
    Users[emailAddress] = {"password" : password, "data" : data}

def delete_Details(emailAddress):
    return Users.pop(emailAddress)

def modify_Password(emailAddress, arguments):
    newPassword = arguments.get("newPassword", "")
    password = 'password'
    Users[emailAddress][password] = newPassword

def generate_Session_id():
    sessionId = random.randint(1, 1073741824)
    while sessionId in sessions:
        sessionId = random.randint(1, 1073741824)
    return sessionId

def add_Session_id(emailAddress):
    sessionId = generate_Session_id()
    # store a timestamp in future for removing old sessions
    sessions[sessionId] = emailAddress # no need to store another nested dictionary
    return sessionId

def check_Session_id(sid):
    return sid in sessions

# currently no check to clean sessions