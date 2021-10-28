import React from "react";
import "./Login.css";

class Login extends React.Component {

  // Login component constractor
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMess: "" };
    this.login = this.login.bind(this)
  }

  // Check password validation at least 6 characters and contain numbers and letters
  validPass(userPass) {
    if (userPass.length < 6) {
      return [false, "Error: The password must be at least 6 characters"];
    }
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(userPass)) {
      return [false, "Error: The password must contains numbers and letters"];
    }
    return [true];
  }

  // Check email validation
  validMail(userEmail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userEmail).toLowerCase());
  }

  // Login button logic
  login() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    // Validation
    let valid_pass = this.validPass(userPass);
    if (!valid_pass[0]) {
      alert(valid_pass[1]);
      return;
    }
    if (!this.validMail(userEmail)) {
      alert("Error: Invalid email address");
      return;
    }

    // connect to firebase Authentication email and password
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
      var errorMessage = error.message;
      alert("Error : " + errorMessage);
    });
  }

  render() {
    return (
      <div id="login_div" className="main-div">
        <h3>Login</h3>
        <input type="email" placeholder="Email..." id="email_field" />
        <input type="password" placeholder="Password..." id="password_field" />
        <button onClick={this.login}>Login to Account</button>
      </div>
    );
  }
}

export default Login;