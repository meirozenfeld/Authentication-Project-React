import React from "react";
import Details from "./components/details";
import Login from "./components/login";
import UpdateDetails from "./components/update_details";
import "./App.css";

class App extends React.Component {
    // App component constractor
    constructor(props) {
        super(props);
        let connect = false;

        this.state = { isLoggedIn: false, isEditingDetails: false, user: {}, db: null, userId: "" };

        // Connect to firebase
        const config = {
            apiKey: "AIzaSyD23fU_9xpkk2Oesvg3moN9mJWhsTh4HYU",
            authDomain: "moveoproject-983ba.firebaseapp.com",
            projectId: "moveoproject-983ba",
            storageBucket: "moveoproject-983ba.appspot.com",
            messagingSenderId: "258266267746",
            appId: "1:258266267746:web:2948b0de8554373392d13b",
            measurementId: "G-CSBXLLPVRY"
        };

        // Check config missing error 
        if (!config.apiKey) throw new Error("apiKey Missing");
        if (!config.authDomain) throw new Error("authDomain Missing");
        if (!config.projectId) throw new Error("projectId Missing");
        if (!config.storageBucket) throw new Error("storageBucket Missing");
        if (!config.messagingSenderId) throw new Error("messagingSenderId Missing");
        if (!config.appId) throw new Error("appId Missing");
        if (!config.measurementId) throw new Error("measurementId Missing");

        // Init firebase
        firebase.initializeApp(config);

        // Check user connection when auth listener
        firebase.auth().onAuthStateChanged((user) => {
            if (user) { // User connect
                // Get specific user by id from firestore
                const db = firebase.firestore();
                const users = db.collection("users");
                users.doc(user.uid).get()
                    .then((docRef) => {
                        let user_details = docRef.data();
                        // State updades
                        this.setState({
                            isLoggedIn: true,
                            user: user_details,
                            db: db,
                            userId: user.uid
                        });
                    });
            }
            else { // No user connected
                // State updades
                this.setState({
                    isLoggedIn: false,
                    user: {}
                });
            }
        });

        this.handlerOn = this.editHandlerOn.bind(this);
        this.handlerOf = this.editHandlerOf.bind(this);
        this.handlerBack = this.editHandlerBack.bind(this);
    }

    // Handler pages functions
    editHandlerOn() {
        this.setState({
            isEditingDetails: true
        });

    }

    editHandlerOf() {
        const users = (this.state.db).collection("users");
        users.doc(this.state.userId).get()
            .then((docRef) => {
                let user_details = docRef.data();
                // State updades
                this.setState({
                    isEditingDetails: false,
                    user: user_details

                });
            });
    }

    editHandlerBack() {
        this.setState({
            isEditingDetails: false
        });
    }

    render() {
        // User connect - render details
        if (this.state.isLoggedIn) {
            if (this.state.isEditingDetails) {
                return <UpdateDetails user={this.state.user} handler={this.handlerOf} handlerBack={this.handlerBack} db={this.state.db} userId={this.state.userId} />;
            } else {
                return <Details user={this.state.user} handler={this.handlerOn} />;
            }
        }
        // No User - render login
        return <Login />;


    }
}

export default App;