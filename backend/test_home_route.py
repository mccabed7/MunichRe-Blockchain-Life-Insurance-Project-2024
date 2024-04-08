from main import app
import json

def test_home_route():
    print("Running test_home_route...")
    response = app.test_client().get("/")
    print("Response status code:", response.status_code)
    print("Response data:", response.data)
    assert response.status_code == 200
    assert b'hello world!' in response.data


def test_login():
    response = app.test_client().get("/api/login?emailAddress=jameshumphrey@gmail.com&password=6795" )
    assert response.status_code == 200

def test_login_sid():
    response = app.test_client().get("/api/login?emailAddress=jameshumphrey@gmail.com&password=6795" )
    assert response.data

def test_registration():
    url = "http://127.0.0.1:5000/api/login?emailAddress=person@gmail.com"
    data = {'firstName': 'Person',
            'lastName': 'McPerson',
            'dateOfBirth': '1/1/2001',
            'email': 'person@gmail.com',
            'password': 'mypassword'}
    
    response = app.test_client().post("/api/login?emailAddress=person@gmail.com", json=data)
    assert response.status_code != 400
    
    
    
#TODO test registration
#TODO test timeline


# def test_risk_assessment_with_valid_data():
    
#     valid_sid = 'valid_sid'
#     valid_email = 'test@example.com'
#     valid_data = 0xF7e841C6613cE6B19A5eb11ae74255115e6c6318
#     # james humphreys' data: 0xF7e841C6613cE6B19A5eb11ae74255115e6c6318

#     data = app.test_client().get("/api/customers/timeline?sid={}&emailAddress={}".format( valid_sid, valid_email ) )

#     assert data.startswith('0x')
#     assert data == 0xF7e841C6613cE6B19A5eb11ae74255115e6c6318
#     assert isinstance( data, list )

#     # assert response.status_code == 200
#     # assert b'"user_id": 10' in response.data
#     # assert b'"risk_score": 0.75' in response.data
