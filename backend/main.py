from flask import Flask, request, jsonify # may require you to run `pip install flask` on your machine
from flask_cors import CORS, cross_origin # `pip install -U flask-cors`
from services import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# home page of backend
@app.route("/")
def main():
  return "hello world!"
# make similar "pages" that handle get, post, etc. requests to api.

#This route handles Get and Post requests to the overall database
@app.route('/api/customers', methods =['GET', 'POST'])        #define /customers endpoint for methods Get and Post
def customers_Request():
  if request.method == 'GET' :                          #if request is a Get
    return get_customer('all'), 200               # return the database in json format and status code 200(OK)
  elif request.method == 'POST':                        #else if request is a Post
      newCustomer = request.get_json()                  # newCustomer stores values passed from request 
      return add_customer(newCustomer), 201  #return the data in a dictionary in json format alongside status 201(Created)
    

@app.route('/api/customers/<int:id>/<string:itemtoAccess>', methods=['GET', 'PUT', 'DELETE']) #define /customers/id/itemtoAccess endpoint for methods Get, Post and Delete
def customer_Item_Request(id, itemtoAccess):                                                              #if passed id is present in databse
  if id in db.customerDatabase:
    if request.method == 'GET':                                                            #  if request is a Get
      customer = get_customer(id, itemtoAccess)
      if customer != None:           #    if passed item is in customer with passed id or passed item is "all"
        return customer, 200                                         #      return corresponding item and status code 200(OK)
      else:                                                                                #      else return item not found error and status 404(Not Found)
        return {'error' : 'item not found'}, 400   
    elif request.method == 'PUT':                                                         #  else if request is a Post
                                            #    if itemtoAccess does not already exist in specified customer   
      newItem = str(request.get_data())                                                      #      store passed json in newItem                                 
      customer = update_item(id, newItem, itemtoAccess)
      return customer, 201                                          #      return specified customer and status 201(Created)
    elif request.method == 'DELETE':                                                       #  else if request is Delete
                 #    if itemtoAccess exists or is "all"
                                                             #      delete specified customer's item or all customer's data
        return customer_delete(id, itemtoAccess), 204                                                       #      return error code 204(No Content)
  #      else:                                                                                #    else return item not found error and status 404(Not Found)
  return {'error' : 'id or item not found'}, 400
  # 404 is not used like this, its used when the api endpoint was not found
  
@app.route('/api/customers/<int:id>', methods=['GET', 'PUT'])   #define endpoint /customers/id/update for method Patch
def update_Customer(id): 
  if id in db.customerDatabase:                                  #if id is present in database
    if request.method == 'PUT':
      updatedValues = request.get_json()                        # store json passed with the request in updatedValues                       
      return update_customer(id, updatedValues), 200   # return customer's data along with status 200(OK)
    elif request.method == 'GET':
      return get_customer(id), 200
  else:
    return {'error' : 'id not found'}, 400                    #else return error id not found and status 404(Not Found)

@app.route('/api/login', methods=['POST', 'GET', 'DELETE', 'PUT'])
def login_to_Account():
  arguments = request.args
  emailAddress = arguments.get("emailAddress", "")
  print(emailAddress)
  #sid = arguments.get()
  #for POST request, url must be /api/login?emailAddress=x
  #where x is email address to be used to sign up
  if request.method == 'POST':
    if emailAddress not in users.Users:
      signupDetails = request.get_json()
      add_user(emailAddress, signupDetails)
      return jsonify(users.search_Sessions(emailAddress))  #index to sessions didnt work, search_Sessions may be temporary
    else:
      return {'error' : 'Email Address already in use'}, 403
  #for GET request, url must be /api/login?emailAddress=x&password=y
  #where x is email address and y is password used to sign in  
  elif request.method == 'GET':     
    if emailAddress in users.Users:
      password = arguments.get("password", "")
      result = login(emailAddress, password)
      if result == None:
        return {'error' : 'Your password is incorrect'}, 403
      else:
        return jsonify(result), 200    #Placeholder, unsure of what to do upon success
    else:
      return {'error' : 'invalid email address'}, 400
  #Delete request, assuming we don't want to keep tag
  #Url should be in the form /api/login?emailAddress=x    where x is email Address to delete
  elif request.method == 'DELETE':
    sid = arguments.get("sid", "")
    if emailAddress in users.Users:
      sid = users.search_Sessions(emailAddress)
      return delete_user(sid, emailAddress), 204
    else: 
      return {'error': 'invalid email address'}, 400  
  #Put request used for modifying User password
  #Url should be in form /api/login?emailAddress=x&newPassword=y
  elif request.method == 'PUT':
    sid = arguments.get("sid", "")
    if emailAddress in users.Users:
      sid = users.search_Sessions(emailAddress)
      result = change_password(sid, emailAddress, arguments)
      #return jsonify(Users[emailAddress])
      if result == None:
        return {'error': ''}, 403
      else:
        return result, 200
    else:
      return {'error': 'invalid email address'}, 400

@app.route('/api/third-party', methods=['GET', 'POST'])
def apply_for_access():
  arguments = request.args
  email = arguments.get('emailAddress', '')
  if request.method=='GET':
    sid = arguments.get('sid', '')
    result = verify_sid(sid, email)
    if result == None:
      return {'error': 'access restricted'}, 403
    return get_pending_applications(sid, email), 200
  elif request.method=='POST':
    password = arguments.get('password', None)
    if email!='' and password!=None:
      pass
    else:
      return {'error': 'unable to determine password/email'}, 400


if __name__ == '__main__':
  app.run()


