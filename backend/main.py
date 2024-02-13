from flask import Flask, request, jsonify # may require you to run `pip install flask` on your machine
from database import * 
app = Flask(__name__)

# home page of backend
@app.route("/")
def main():
  return "hello world!"

customers = {
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
        "height" : 120,
        "weight" : 57,
        "smoker" : "FALSE"
        },
    3 : {
        "id" : 3,
        "firstName" : "Drew",
        "lastName" : "Kennedy",
        "dateofBirth" : "17/03/1972",
        "address" : "CoalView House",
        "height" : 175,
        "weight" : 85,
        "smoker" : "TRUE"
        }
        
    }

url = "http://127.0.0.1:5000/customers"
url1 = "http://127.0.0.1:5000/customers/1/all"
# make similar "pages" that handle get, post, etc. requests to api.
@app.route('/customers')
def access_Customers():
    return jsonify(customers)

@app.route('/customers/{id}/{itemtoAccess}')
def access_Val(id, itemtoAccess):
  return access_Value(id, itemtoAccess)
  

                 

if __name__ == '__main__':
  app.run()


requests.get(url)
requests.get(url1)

