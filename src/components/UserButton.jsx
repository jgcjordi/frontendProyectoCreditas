import React, { Component } from 'react';


class UserButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLoginBox: false,

            email: "",
            name: "",
            password: "",
            rememberMe: false,
        };

    }



    ////////////////LISTENERS////////////
    onUserClicked = () => {
        this.setState({ showLoginBox: true })
        console.log("User")
    }

    onSignInClicked = () => {
        console.log("Sign In")
        console.log(this.state.email)
        console.log(this.state.name)
        console.log(this.state.password)
        console.log(this.state.rememberMe)
    }

    showLoginPopup() {
        if (this.state.showLoginBox) {
            return (
                <div className="popupLogin">
                    <div className="boxLogin">
                        <form>
                            <div>Login</div>
                            <input
                                className="textBoxLogin"
                                type="text"
                                placeholder="Email"
                                onChange={(ev) => this.setState({ email: ev.target.value })}
                                value={this.state.email}
                            />
                            <input
                                className="textBoxLogin"
                                type="text"
                                placeholder="Name"
                                onChange={(ev) => this.setState({ name: ev.target.value })}
                                value={this.state.name}
                            />
                            <input
                                className="textBoxLogin"
                                type="password"
                                placeholder="Password"
                                onChange={(ev) => this.setState({ password: ev.target.value })}
                                value={this.state.password}
                            />
                        </form>
                        <input type="checkbox" name="rememberMe" value={this.state.rememberMe} />Remember me
                        <br />
                        <button className="buttonSignIn" type="button" onClick={this.onSignInClicked}>Sign In</button>
                    </div>
                </div>)
        }
    }



    ////////////////RENDER////////////

    render() {
        return (
            <div className="UserButton">
                <div>
                    <button className="button" type="button" onClick={this.onUserClicked}>User</button>
                </div>
                {this.showLoginPopup()}
            </div>
        );
    }

}


export default UserButton;
