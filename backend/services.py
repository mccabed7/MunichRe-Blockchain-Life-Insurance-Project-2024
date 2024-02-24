# this is where we will import all the other files
# it will also call many helper functions in those files
from database import *
from login import *
from sessionId import *
# it will be used by main.py

# there should be at least one function for each interactive API endpoint


def add_customer(customer):
    firstName = customer.get("firstName", "")      
    lastName = customer.get("lastName", "")
    dateofBirth = customer.get("dateofBirth", "")
    address = customer.get("address", "")
    height = customer.get("height", "")
    weight = customer.get("weight", "")
    smoker = customer.get("smoker", "")

    return add_Customer(firstName, lastName, dateofBirth, address, height, weight, smoker)

def add_item(id, newItem, itemtoAccess):
    itemtoAdd = newItem.get(itemtoAccess, "")                                          #      store value of item in itemtoAdd
    modify_Value(id, itemtoAccess, itemtoAdd)
    return access_Value(id, "all")

def update_customer(id, updatedValues):
    for key, value in updatedValues.items():                  # for each key, value pair in updatedValues
      customerDatabase[id][key] = value
    return access_Value(id, "all")

