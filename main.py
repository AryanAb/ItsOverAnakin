from flask import Flask, render_template, redirect, request, jsonify, url_for, session
import os
import pyrebase
import json

app = Flask(__name__)

app.secret_key = os.urandom(24)
app.config['SECRET_KEY'] = "afAYG8o5y4waP;JNGSOI205O3"

firebase = pyrebase.initialize_app(json.load(open("app/firebase.json")))
auth = firebase.auth()


@app.route("/")
@app.route("/index")
def index():
    if "user" not in session:
        return render_template("index.html")
    return redirect(url_for("home"))


@app.route("/login", methods=["POST"])
def log_in():
    email = request.form["email_up"]
    password = request.form["pass_up"]
    user = auth.sign_in_with_email_and_password(email, password)
    session["user"] = user
    return redirect(url_for("home"))


@app.route("/signup", methods=["POST"])
def sign_up():
    email = request.form["email_in"]
    password = request.form["pass_in"]
    auth.create_user_with_email_and_password()
    user = auth.sign_in_with_email_and_password(email, password)
    session["user"] = user
    return redirect(url_for("home"))


@app.route("/home")
def home():
    render_template("home.html")


if __name__ == "__main__":
    app.run(debug=True)
