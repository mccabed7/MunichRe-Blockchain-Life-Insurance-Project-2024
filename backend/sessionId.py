# this will hold session Ids and generate them
import random
session_Id_Database = {

}



def generate_Session_id():
    sessionId = random.randrange(1, 103750814, 1)
    if sessionId in session_Id_Database:
        generate_Session_id()
    else:
        return sessionId
