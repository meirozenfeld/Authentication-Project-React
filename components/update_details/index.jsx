import React from "react";
import "./UpdateDetails.css";
class UpdateDetails extends React.Component {

  // UpdateDetails component constractor
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.goBack = this.goBack.bind(this);
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
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userEmail).toLowerCase());
  }

  reauthenticate = (oldPass) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPass);
    return user.reauthenticateWithCredential(cred);
  };

  // Update Authentication password
  changePassword = (oldPass, newPass) => {
    this.reauthenticate(oldPass)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPass)
          .then(() => {
            console.log("Password updated!");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update Authentication email
  changeEmail = (oldPass, newEmail) => {
    this.reauthenticate(oldPass)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            console.log("Email updated!");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  update() {
    var userEmail = document.getElementById("email_field").value;
    var oldUserEmail = document.getElementById("old_email_field").value;
    var userPass = document.getElementById("password_field").value;
    var oldUserPass = document.getElementById("old_password_field").value;
    var userName = document.getElementById("name_field").value;
    var userAddress = document.getElementById("address_field").value;
    var userBirth = document.getElementById("birth_date_field").value;

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
    let valid_pass2 = this.validPass(oldUserPass);
    if (!valid_pass2[0]) {
      alert(valid_pass2[1]);
      return;
    }
    if (!this.validMail(oldUserEmail)) {
      alert("Error: Invalid email address");
      return;
    }
    if (oldUserPass != this.props.user.password) {
      alert("Error: Its not your current password");
      return;
    }
    if (oldUserEmail != this.props.user.email) {
      alert("Error: Its not your current email");
      return;
    }

    //Update user data
    let data = {
      email: userEmail,
      password: userPass,
      name: userName,
      address: userAddress,
      birth_date: userBirth,
    };

    // Add a new document in collection "users" with user ID
    let setDoc = this.props.db
      .collection("users")
      .doc(this.props.userId)
      .set(data);

    // Update firebase Authentication
    this.changePassword(oldUserPass, userPass);
    this.changeEmail(oldUserPass, userEmail);

    this.props.handler();
  }

  // Go back function without details update
  goBack() {
    this.props.handlerBack();
  }

  render() {
    return (
      <div id="user_div" className="loggedin-div">
        <h2>UPDATE PROFILE DETAILS:</h2>
        <input type="name" placeholder="Change name..." id="name_field" />
        <input
          type="address"
          placeholder="Change address..."
          id="address_field"
        />
        <input
          type="birth_date"
          placeholder="Change date of birth..."
          id="birth_date_field"
        />
        <input
          type="email"
          placeholder="Current email..."
          id="old_email_field"
        />
        <input type="email" placeholder="New email..." id="email_field" />

        <input
          type="password"
          placeholder="Current password..."
          id="old_password_field"
        />
        <input
          type="password"
          placeholder="New password..."
          id="password_field"
        />
        <button onClick={this.update}>Update Details</button>
        <br></br>
        <button onClick={this.goBack}>Go back</button>
      </div>
    );
  }
}

export default UpdateDetails;