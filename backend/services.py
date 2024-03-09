# this is where we will import all the other files
# it will also call many helper functions in those files
import database as db
import login
import sessionId as sid
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

def add_customer(customer):
    firstName = customer.get("firstName", "")      
    lastName = customer.get("lastName", "")
    dateofBirth = customer.get("dateofBirth", "")
    address = customer.get("address", "")
    height = customer.get("height", "")
    weight = customer.get("weight", "")
    smoker = customer.get("smoker", "")

    return db.add_Customer(firstName, lastName, dateofBirth, address, height, weight, smoker)

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