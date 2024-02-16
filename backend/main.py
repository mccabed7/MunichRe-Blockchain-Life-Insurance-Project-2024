from flask import Flask, request, jsonify # may require you to run `pip install flask` on your machine
import requests
from database import *
from database import customerDatabase
app = Flask(__name__)

# home page of backend
@app.route("/")
def main():
  return "hello world!"
 

# make similar "pages" that handle get, post, etc. requests to api.
@app.route('/customers', methods =['GET', 'POST'])
def customers_Request():
    if request.method == 'GET' :
      return jsonify(customerDatabase), 200
    elif request.method == 'POST':
        newCustomer = request.get_json()
        firstName = newCustomer.get("firstName", "")
        lastName = newCustomer.get("lastName", "")
        dateofBirth = newCustomer.get("dateofBirth", "")
        address = newCustomer.get("address", "")
        height = newCustomer.get("height", "")
        weight = newCustomer.get("weight", "")
        smoker = newCustomer.get("smoker", "")
        add_Customer(firstName, lastName, dateofBirth, address, height, weight, smoker)
        return jsonify({len(customerDatabase) : customerDatabase[len(customerDatabase) - 1]})

@app.route('/customers/<int:id>/<string:itemtoAccess>', methods=['GET'])
def get_Customer(id, itemtoAccess):
    if id in customerDatabase:
      if itemtoAccess in customerDatabase[id] or itemtoAccess.lower() == 'all' :
        print("Accessing values")
        return access_Value(id, itemtoAccess), 200
      else:
        return {'error' : 'item not found'}, 404
    else:
      return {'error' : 'id not found'}, 404
 
                 
if __name__ == '__main__':
  app.run()


