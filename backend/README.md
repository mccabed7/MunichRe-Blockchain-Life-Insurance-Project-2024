# Backend Team

## Setup
We require that you have <b>python</b> installed

https://www.python.org/downloads/

<br>

We use flask to provide the API endpoints. 

This may require you to run
```
pip install flask
```
on your device.

The API can be launched with 
```
python3 main.py
```

## API

to begin to use the api we require you login through `https://localhost:5000/api/login`

make a https POST with `emailAddress` and `password` parameters to register

and GET with the same parameters to login.

you will be returned a session id (to put in a `sid` paramter) which you need with emailAddress to use other endpoints of the api.

`https://localhost:5000/api/customers` will deploy a smart contract when you make a POST request provided with sid, and email headers, and a json body.



PUT requests lets you make changes to your smart contract.

GET requests will fetch your risk assesment timeline.


## Third-Party

`https://localhost:5000/api/third-party` POST requests with email and password parameters, and a body of text will create an application for manual review.

(unimplemented)
email third party of approval or rejection.