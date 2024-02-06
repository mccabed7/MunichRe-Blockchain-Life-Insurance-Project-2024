from flask import Flask # may require you to run `pip install flask` on your machine

app = Flask(__name__)

# home page of backend
@app.route("/")
def main():
  return "hello world!"

# make similar "pages" that handle get, post requests to api.


if __name__ == '__main__':
  app.run()