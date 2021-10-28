import React from "react";
import "./Details.css";
class Details extends React.Component {

  // Details component constractor
  constructor(props) {
    super(props);
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div id="user_div" className="loggedin-div">
        <h1>Welcome {this.props.user.name}! </h1>
        <h3>Here are some details about you:</h3>
        <p>
          You live in <em>{this.props.user.address}</em>
        </p>
        <p>
          Your date of birth is <em>{this.props.user.birth_date}</em>
        </p>
        <p>
          Email: <em>{this.props.user.email}</em>
        </p>
        <p>
          Password: <mark>{this.props.user.password}</mark>, but shhh 🤫, dont
          tell anyone!
        </p>
        <button onClick={this.props.handler}>Update profile details</button>
        <br></br>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Details;
