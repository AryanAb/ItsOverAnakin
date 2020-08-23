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

firebase = pyrebase.initialize_app(json.load(open("app/firebase.json")))
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


@app.route("/login_api", methods=["GET"])
def login_api():
    email = request.args.get("email")
    password = request.args.get("pass")
    user = auth.sign_in_with_email_and_password(email, password)
    session["user"] = user
    time = db.child(session["user"]["email"].split('@')[0]).child("time").get().val()
    response = {
        "success": True,
        "productive_time": time
    }
    return jsonify(response)


@app.route("/signup", methods=["GET", "POST"])
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


@app.route("/update_api/<email>", methods=["POST"])
def update_api(email):
    data = request.json["data"]
    print(email.split('@')[0])
    db.child(email.split('@')[0]).set(data)
    return '', 204


@app.route("/survey", methods=["POST"])
def survey():
    prod = request.form["productivity"]
    overwork = request.form["overwork"]
    happiness = request.form["happiness"]
    feedback = request.form["feedback"]
    # db.child("survey").get()
    # TODO: Add recieved feedback to the database
    return '', 204


@app.route("/home")
def home():
    apps = list(db.child(session["user"]["email"].split('@')[0]).get().val().items())
    print(apps[0][1])
    return render_template("home.html", apps=apps)


@app.route("/break")
def restbreak():
    hours = request.args.get("h", default=0, type=int)
    minutes = request.args.get("m", default=0, type=int)
    seconds = request.args.get("s", default=0, type=int)
    return render_template("itsoveranakin.html", hours=hours, minutes=minutes, seconds=seconds)


def create_token(size=16, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


if __name__ == "__main__":
    app.run(debug=False)
