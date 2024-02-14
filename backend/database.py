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
        "height" : "150",
        "weight" : "80",
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
def add_Customer(firstName : str, lastName : str, dateofBirth : str, address : str, height : str, weight : str, smoker : str):
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
def modify_Value( id : int, category : str, change):
    stringId = str(id)                      #change id to a string
    customerDatabase[id][category] = change #change the value by referring to key name

    # category has to be "id", "firstName", "lastName", "dateofBirth", "address", "height", "weight" or "smoker"
    # but other stuff still works and will add stuff to the table.


#delete_Value deletes either the customer's account data or a specific piece of their data(may not be necessary) taking the parameters id and itemforDeletion
def delete_Value( id : int, itemforDeletion : str):
    # if the itemforDeletion parameter is Account or account, delete all of the customer's data
    if itemforDeletion.lower() == "account":
        del customerDatabase[id]
    #else delete specific piece of data
    else:
        del customerDatabase[id][itemforDeletion]

#access_Value allows for easy access to some or all of a customer's data
#It takes the customer's id and the item to access as parameters
def access_Value( id : int, itemtoAccess : str):
    #if the itemtoAccess parameter is all or All, access all of the specified customer's data
    if itemtoAccess.lower() == "all":
        x = customerDatabase[id]
        return x
    #else access specific piece of data
    else:
        x = customerDatabase[id][itemtoAccess]
        return x
        
'''
add_Customer("Alan", "Johnson", "08/09/2001", "17 Plum lane", 165, 71, "FALSE");
modify_Value( 3, "firstName", "Ann")
delete_Value(4, "Account")
delete_Value(3, "firstName")
data = customerDatabase.values()
print(data)
a = access_Value(1, "firstName")
print(a)
b = access_Value(2, "height")
print(b)
c = access_Value(1, "all")
print(c)
'''


