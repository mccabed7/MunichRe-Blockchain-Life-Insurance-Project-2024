# this will hold session Ids and generate them
import random
sessions = {

}



def generate_Session_id():
    sessionId = random.randrange(1, 103750814, 1)
    if sessionId in sessions:
        generate_Session_id()
    else:
        return sessionId

def add_Session_id(emailAddress):
    sessionId = generate_Session_id()
    sessions[sessionId] = {"email address" : emailAddress}
    return sessionId