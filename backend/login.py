# this will hold session Ids and generate them
import random
import time
sessions = {
    # 157981659 : 'jameshumphrey@gmail.com'
}

# key value is email
# contains dictonary with 'password' and 'data' (which containes contract address, admin or third-party)
Users = {
    'jameshumphrey@gmail.com' : {'password' : '6795', 'data' : '0x26a3dCa9a80B2aE0B72c8fB0101F2d8c03480DB1'}, 
    'emmapart@gmail.com' : {'password' : 'password123', 'data' : 'admin'},
    'third@party.com' : {'password' : 'asdfghjk', 'data' : 'third-party'}
}

def attempt_Login(emailAddress, password):
    if emailAddress in Users:
        return password == Users[emailAddress]["password"]
    return False

def get_all_customer_emails():
    return [x for x in Users if Users[x]['data'].startswith('0x')]

def get_data(emailAddress):
    if emailAddress in Users:
        return Users[emailAddress]['data']
    return None

def add_Details(emailAddress, password, data):
    # password = password.get("password", "")
    if emailAddress not in Users:
        Users[emailAddress] = {"password" : password, "data" : data}  
        return add_Session_id(emailAddress)
    return None

def delete_Details(sid, emailAddress):
    if check_Session_id(sid, emailAddress) != None:
        del Users[emailAddress]
        del sessions[sid]
        # TODO delete blockchain smart contract
        return True
    return False

def modify_Password(emailAddress, arguments):
    newPassword = arguments.get("newPassword", "")
    password = 'password'
    Users[emailAddress][password] = newPassword
    return Users[emailAddress][password]

def generate_Session_id():
    sessionId = f'{random.randint(1, 2**128):x}'
    while sessionId in sessions:
        sessionId = f'{random.randint(1, 2**128):x}'
    return sessionId

def add_Session_id(emailAddress):
    sessionId = generate_Session_id() 
    # TODO store a timestamp in future for removing old sessions
    sessions[sessionId] = emailAddress # no need to store another nested dictionary
    return sessionId

def search_Sessions(emailAddress):       #function to search for key tied to email, temporary function
    for key, value in sessions.items():
        if emailAddress == value:
            return key
        
def check_Session_id(sid, email):
    check = sessions.get(sid, None)
    if check!=None and check == email:
        return get_data(email)
    return None

# currently no check to clean sessions