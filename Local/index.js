document.getElementById("btn").addEventListener("click", event => {
	event.preventDefault();
	let email = document.getElementById("email").value;
	let pass = document.getElementById("pass").value;
	axios.get("http://127.0.0.1:5000/login_api?email=" + email + "&pass=" + pass).then(response => {
		token = response.data.token;
		console.log(token);
		localStorage.setItem("token", token);
		window.location.href = "process.html";
	}).catch(err => {
		console.error(err);
	});
});