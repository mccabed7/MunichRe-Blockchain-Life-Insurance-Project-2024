# this is where we will import all the other files
# it will also call many helper functions in those files
import database as db
import login as users
import thirdparty as tp
# from login import *      #Temporary

# it will be used by main.py

# there should be at least one function for each interactive API endpoint

def get_customer(id, tag='all'):
    try:
        if id == 'all':
            return db.customerDatabase
        return db.access_Value(id, tag)
    
    except Exception as e:
        print(e)
        return None

def add_customer(customer, sid=None):
    firstName = customer.get("firstName", "")      
    lastName = customer.get("lastName", "")
    dateofBirth = customer.get("dateofBirth", "")
    address = customer.get("address", "")
    height = customer.get("height", "")
    weight = customer.get("weight", "")
    smoker = customer.get("smoker", "")
    c = db.add_Customer(firstName, lastName, dateofBirth, address, height, weight, smoker)
   
    users.add_Details(c.get("id"))
    return c

def update_item(id, itemtoAccess, newItem):
    if itemtoAccess in db.customerDatabase[id]:
        return db.modify_Value(id, itemtoAccess, newItem)
    # itemtoAdd = newItem.get(itemtoAccess, "")                                          #      store value of item in itemtoAdd
    
    return None # prevent creation of new tags

def update_customer(id, updatedValues):
    for key, value in updatedValues.items():                  # for each key, value pair in updatedValues
        update_item(id, key, value)
    return db.access_Value(id, "all")

def customer_delete(id, tag='all'):
    return db.delete_Value(id, tag)


###### TODO 
## use sid to get email and verify that its their 
#  user they are changing (in check_Session_id)
##  

def add_user(email, password):
    # create customer
    result = users.add_Details(email, password)
    if result != None:
        return login(email, password)
    return result

def delete_user(sid, email):
    if verify_sid(sid, email):
        return users.delete_Details(sid, email)
    return None

def change_password(sid, email, password):
    if verify_sid(sid, email):
        return users.modify_Password(email, password)
    return None

def login(email, password):
    if users.attempt_Login(email, password):
        return users.add_Session_id(email)
    return None

# bool
def verify_sid(sid, email):
    return users.check_Session_id(sid, email)

def third_party_application(email, password, message=""):
    apply = (email, password, message)
    tp.store_application(apply)

def get_pending_applications(sid, email):
    if verify_sid(sid, email) and users.Users[email]["data"] == "admin":
        return tp.applications