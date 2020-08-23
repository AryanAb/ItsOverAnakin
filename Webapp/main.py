from flask import Flask, render_template, redirect, request, jsonify, url_for, session
import os
import random
import string
from datetime import timedelta
import pyrebase
import json

app = Flask(__name__)

app.secret_key = os.urandom(24)
app.config['SECRET_KEY'] = "afAYG8o5y4waP;JNGSOI205O3"
app.permanent_session_lifetime = timedelta(minutes=60)

firebase = pyrebase.initialize_app(json.load(open("Webapp/app/firebase.json")))
auth = firebase.auth()
db = firebase.database()


@app.route("/")
@app.route("/index")
def index():
    if "user" not in session:
        return redirect("/login")
    return redirect("/home")


@app.route("/login", methods=["POST", "GET"])
def log_in():
    if request.method == "GET":
        return render_template("Login.html")
    if request.method == "POST":
        email = request.form["email_in"]
        password = request.form["pass_in"]
        user = auth.sign_in_with_email_and_password(email, password)
        session["user"] = user
        return redirect("/home")


@app.route("/login_api")
def login_api():
    email = request.args.get("email")
    password = request.args.get("pass")
    user = auth.sign_in_with_email_and_password(email, password)
    token = db.child("tokens").child(user["email"].split('@')[0]).get().val()
    print(token)
    response = {
        "success": True,
        "token": token
    }
    return jsonify(response)


@app.route("/signup", methods=["GET","POST"])
def sign_up():
    if request.method == "GET":
        return render_template("Register.html")
    if request.method == "POST":
        email = request.form["email_up"]
        pass1 = request.form["pass1_up"]
        pass2 = request.form["pass2_up"]
        if pass1 == pass2:
            auth.create_user_with_email_and_password(email, pass1)
            user = auth.sign_in_with_email_and_password(email, pass1)
            session["user"] = user
            db.child("tokens").child(email.split('@')[0]).set({"token": create_token()})
            return redirect("/home")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/break")
def restbreak():
    hours = request.args.get("h", default=0,type=int)
    minutes = request.args.get("m", default=0,type=int)
    seconds = request.args.get("s", default=0,type=int)
    return render_template("itsoveranakin.html", hours=hours, minutes=minutes,seconds=seconds)

def create_token(size=16, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


if __name__ == "__main__":
    app.run(debug=True)
