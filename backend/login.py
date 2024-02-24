#create dictionary for login details
#add function to check login

loginDatabase = {
'jameshumphrey@gmail.com' : {'password' : '6795', 'data' : '1'},
'emmapart@gmail.com' : {'password' : 'password123', 'data' : '2'}

}

def attempt_Login(emailAddress, loginDetails):
    if emailAddress in loginDatabase:
        passwordAttempt = loginDetails.get("password", "")
        if passwordAttempt == loginDatabase[emailAddress]["password"]:
            return "Success"
        else:
            return None