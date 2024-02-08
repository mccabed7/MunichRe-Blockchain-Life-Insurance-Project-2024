# create a table with login credentials
#   in memory for now, upgrade to a db later

#Nested dictionary with temporary values
#
customerDatabase = {
    1 : {
        "id" : 1,
        "firstName" : "James",
        "lastName" : "Humphrey",
        "dateofBirth" : "06/07/1995",
        "address" : "2 Oak Avenue",
        "height" : 150,
        "weight" : 80,
        "smoker" : "TRUE"
        },
    2 : {
        "id" : 2,
        "firstName" : "Emma",
        "lastName" : "Part",
        "dateofBirth" : "04/01/1957",
        "address" : "12 Coastal Avenue",
        "height" : "120",
        "weight" : "57",
        "smoker" : "FALSE"
        },
    3 : {
        "id" : 3,
        "firstName" : "Drew",
        "lastName" : "Kennedy",
        "dateofBirth" : "17/03/1972",
        "address" : "CoalView House",
        "height" : "175",
        "weight" : "85",
        "smoker" : "TRUE"
        }
        
    }
# create functions for adding, modifying and removing from the table
global numberofCustomers #create numberofCustomers variable

#add_Customer takes the specified values and creates a dictionary from them, it calculates customerId also
def add_Customer(firstName, lastName, dateofBirth, address, height, weight, smoker):
    numberofCustomers = len(customerDatabase) #get current number of customers
    newCustomer = numberofCustomers + 1       #newCustomer gets the next id value
    customerDatabase[newCustomer] = {
        "id" : newCustomer,
        "firstName" : firstName,
        "lastName" : lastName,
        "dateofBirth" : dateofBirth,
        "address" : address,
        "height" : height,
        "weight" : weight,
        "smoker" : smoker}

#modify_Value takes the id, category to be changed and change to be made as parameters and applies the change
def modify_Value( id, category, change):
    stringId = str(id)                      #change id to a string
    customerDatabase[id][category] = change #change the value by referring to key name

#delete_Value deletes either the customer's account data or a specific piece of their data(may not be necessary) taking the parameters id and itemforDeletion
def delete_Value( id, itemforDeletion):
    if itemforDeletion == "Account" or "account":    # if the itemforDeletion parameter is Account or account, delete all of the customer's data
        del customerDatabase[id]
    else:
        id.pop(itemforDeletion)                      # Deletion for individual items does not work as intended, it deletes all data for customer with specified id

'''   
add_Customer("Alan", "Johnson", "08/09/2001", "17 Plum lane", 165, 71, "FALSE");
modify_Value( 3, "firstName", "Ann")
delete_Value(4, "Account")
delete_Value(3, "firstName")
data = customerDatabase.values()
print(data)
'''
