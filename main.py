from flask import Flask, render_template, redirect, request, jsonify, url_for, session
import os
import pyrebase
import json

app = Flask(__name__)

app.secret_key = os.urandom(24)
app.config['SECRET_KEY'] = "afAYG8o5y4waP;JNGSOI205O3"

firebase = pyrebase.initialize_app(json.load(open("app/firebase.json")))


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/login", methods=["POST"])
def log_in():
    username = request.form["user_up"]
    password = request.form["pass_up"]


@app.route("/signup", methods=["POST"])
def sign_up():
    pass


if __name__ == "__main__":
    app.run(debug=True)
