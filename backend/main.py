from flask import Flask, request, jsonify # may require you to run `pip install flask` on your machine
import requests
from database import *
from database import customerDatabase
from services import *
app = Flask(__name__)

# home page of backend
@app.route("/")
def main():
  return "hello world!"
 

# make similar "pages" that handle get, post, etc. requests to api.

#This route handles Get and Post requests to the overall database
@app.route('/api/customers', methods =['GET', 'POST'])        #define /customers endpoint for methods Get and Post
def customers_Request():
    if request.method == 'GET' :                          #if request is a Get
      return jsonify(customerDatabase), 200               # return the database in json format and status code 200(OK)
    elif request.method == 'POST':                        #else if request is a Post
        newCustomer = request.get_json()                  # newCustomer stores values passed from request 
        return jsonify(add_customer(newCustomer)), 201  #return the data in a dictionary in json format alongside status 201(Created)
    

@app.route('/api/customers/<int:id>/<string:itemtoAccess>', methods=['GET', 'POST', 'DELETE']) #define /customers/id/itemtoAccess endpoint for methods Get, Post and Delete
def customer_Item_Request(id, itemtoAccess):
  if id in customerDatabase:                                                               #if passed id is present in databse
    if request.method == 'GET':                                                            #  if request is a Get
      if itemtoAccess in customerDatabase[id] or itemtoAccess.lower() == 'all' :           #    if passed item is in customer with passed id or passed item is "all"
        return jsonify(access_Value(id, itemtoAccess)), 200                                         #      return corresponding item and status code 200(OK)
      else:                                                                                #      else return item not found error and status 404(Not Found)
        return {'error' : 'item not found'}, 404   
    elif request.method == 'POST':                                                         #  else if request is a Post
      if itemtoAccess not in customerDatabase[id]:                                         #    if itemtoAccess does not already exist in specified customer   
        newItem = request.get_json()                                                       #      store passed json in newItem                                 
        return jsonify(add_item(id, newItem, itemtoAccess)), 201                                          #      return specified customer and status 201(Created)
    elif request.method == 'DELETE':                                                       #  else if request is Delete
      if itemtoAccess in customerDatabase[id] or itemtoAccess.lower() == 'all':            #    if itemtoAccess exists or is "all"
        delete_Value(id, itemtoAccess)                                                     #      delete specified customer's item or all customer's data
        return jsonify({"":""}), 204                                                       #      return error code 204(No Content)
      else:                                                                                #    else return item not found error and status 404(Not Found)
        return jsonify({'message': 'item not found'}), 404
  else:                                                                                    #else return id not found error and 404(Not Found)                             
        return {'error' : 'id not found'}, 404
  
@app.route('/api/customers/<int:id>/update', methods=['PUT'])   #define endpoint /customers/id/update for method Patch
def update_Customer(id): 
  if id in customerDatabase:                                  #if id is present in database
    updatedValues = request.get_json()                        # store json passed with the request in updatedValues                       
    return jsonify(update_customer(id, updatedValues)), 200   # return customer's data along with status 200(OK)
  else:
    return {'error' : 'id not found'}, 404                    #else return error id not found and status 404(Not Found)

@app.route('/api/<string:emailAddress>/login', methods=['POST'])
def login_to_Account(emailAddress):
  if emailAddress in loginDatabase:
    loginDetails = request.get_json()
    result = attempt_Login(emailAddress, loginDetails)
    if result == None:
      return {'error' : 'Your password is incorrect'}, 400
    else:
      add_Session_id(emailAddress)
      return jsonify("Success"), 200    #Placeholder, unsure of what to do upon success
  else:
    return {'error' : 'invalid email address'}, 400


if __name__ == '__main__':
  app.run()


