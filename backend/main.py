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
@app.route('/customers', methods =['GET'])
def get_Customers():
    return jsonify(customerDatabase), 200

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
 
@app.route('/customers', methods =['POST'])
def post_Customer():
    pass


                
if __name__ == '__main__':
  app.run()


