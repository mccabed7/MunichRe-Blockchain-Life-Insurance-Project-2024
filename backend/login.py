#create dictionary for login details
#add function to check login

Users = {
'jameshumphrey@gmail.com' : {'password' : '6795', 'data' : '1'},
'emmapart@gmail.com' : {'password' : 'password123', 'data' : '2'}

}

def attempt_Login(emailAddress, password):
    if emailAddress in Users:
        if password == Users[emailAddress]["password"]:
            return "Success"
        else:
            return None

def add_Details(emailAddress, signupDetails):
    password = signupDetails.get("password", "")
    data = signupDetails.get("data", "")
    Users[emailAddress] = {"password" : password, "data" : data}

def delete_Details(emailAddress):
    return Users.pop(emailAddress)