from flask import Flask, render_template, redirect, request, jsonify, url_for, session
import os
import pyrebase
import json

app = Flask(__name__)

app.secret_key = os.urandom(24)
app.config['SECRET_KEY'] = "afAYG8o5y4waP;JNGSOI205O3"

firebase = pyrebase.initialize_app(json.load(open("Webapp/app/firebase.json")))
auth = firebase.auth()
db = firebase.database()


@app.route("/")
@app.route("/index")
def index():
    if "user" not in session:
        return render_template("index.html")
    return redirect(url_for("home"))


@app.route("/login", methods=["POST"])
def log_in():
    email = request.form["email_in"]
    password = request.form["pass_in"]
    user = auth.sign_in_with_email_and_password(email, password)
    session["user"] = user
    return redirect(url_for("home"))


# @app.route("/login/<email_pass>")
# def log_in_API(email_pass):
#     print(email_pass)
#     email = email_pass.split('?')[0]
#     password = email_pass.split('?')[1]
#     user = auth.sign_in_with_email_and_password(email, password)
#     response = {
#         "success": True,
#         "token": "randomeToken"
#     }
#     print(email)
#     print(password)
#     return jsonify(response)

@app.route("/login_api")
def login_api():
    email = request.args.get("email")
    password = request.args.get("pass")
    user = auth.sign_in_with_email_and_password(email, password)
    response = {
        "success": True,
        "token": "randomToken"
    }
    return jsonify(response)


@app.route("/signup", methods=["POST"])
def sign_up():
    email = request.form["email_up"]
    pass1 = request.form["pass1_up"]
    pass2 = request.form["pass2_up"]
    if pass1 == pass2:
        auth.create_user_with_email_and_password(email, pass1)
        user = auth.sign_in_with_email_and_password(email, pass1)
        session["user"] = user
        return redirect(url_for("home"))


@app.route("/home")
def home():
    return render_template("home.html")


if __name__ == "__main__":
    app.run(debug=True)
