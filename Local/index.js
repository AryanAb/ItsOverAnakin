const axios = require('axios')

document.getElementById("submit").addEventListener("click", event => {
	event.preventDefault();
	let email = document.getElementById("email_in").value;
	let pass = document.getElementById("pass_in").value;
	axios.get("http://127.0.0.1:5000/login_api?email=" + email + "&pass=" + pass).then(response => {
		localStorage.setItem("email", email);
		localStorage.setItem("time", response.data.time)
		window.location.href = "process.html";
	}).catch(err => {
		console.error(err);
	});
});