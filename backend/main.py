from flask import Flask, request, jsonify # may require you to run `pip install flask` on your machine
from database import *
from database import customerDatabase
app = Flask(__name__)

# home page of backend
@app.route("/")
def main():
  return "hello world!"


# make similar "pages" that handle get, post, etc. requests to api.
@app.route('/customers', methods =['GET'])
def access_Customers():
    return jsonify(customerDatabase), 200

@app.route('/customers/<int:id>/<string:itemtoAccess>', methods=['GET'])
def access_Customer(id, itemtoAccess):
  if id in customerDatabase:
    if itemtoAccess in customerDatabase[id] or itemtoAccess.lower() == 'all' :
      return access_Value(id, itemtoAccess), 200
    else:
      return {'error' : 'item not found'}, 404
  else:
    return {'error' : 'id not found'}, 404
  

                 

if __name__ == '__main__':
  app.run()

#test urls
url = "http://127.0.0.1:5000/customers"
url1 = "http://127.0.0.1:5000/customers/1/all"

