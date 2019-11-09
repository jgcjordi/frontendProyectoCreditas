import React, { Component } from 'react';
import './UserButton.css';

import { connect } from 'react-redux';
import { newShowLoginBox, newEmail, newName, newPassword, newRememberMe, newIsLogged } from '../actions/user';


class UserButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLoginBox: false,
            email: "",
            name: "",
            password: "",
            rememberMe: true,
        };

    }



    ////////////////LISTENERS////////////
    onUserClicked = () => {
        this.props.newShowLoginBox(true)
        //this.setState({ showLoginBox: true })
    }

    onRememberMeChange = () => {
        let aux = !this.props.rememberMe
        this.props.newRememberMe(aux)
    }

    onSignInClicked = () => {
        console.log("Sign In")
        console.log(this.props.email)
        console.log(this.props.name)
        console.log(this.props.password)
        console.log(this.props.rememberMe)
    }

    showLoginPopup() {
        if (this.props.showLoginBox) {
            return (
                <div className="popupLogin">
                    <div className="backgroundCover" onClick={() => this.props.newShowLoginBox(false)}></div>
                    <div className="boxLogin">
                        <form>
                            <div>Login</div>
                            <input
                                className="textBoxLogin"
                                type="text"
                                placeholder="Email"
                                onChange={(ev) => this.props.newEmail(ev.target.value)}
                                value={this.props.email}
                            />
                            <input
                                className="textBoxLogin"
                                type="text"
                                placeholder="Name"
                                onChange={(ev) => this.props.newName(ev.target.value)}
                                value={this.props.name}
                            />
                            <input
                                className="textBoxLogin"
                                type="password"
                                placeholder="Password"
                                onChange={(ev) => this.props.newPassword(ev.target.value)}
                                value={this.props.password}
                            />
                        </form>
                        <input type="checkbox" name="rememberMe" onChange={this.onRememberMeChange}  defaultChecked={this.props.rememberMe}/>Remember me
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

const mapStateToProps = state => ({
    showLoginBox: state.user.showLoginBox,
    isLogged: state.user.isLogged,
    rememberMe: state.user.rememberMe,
    email: state.user.email,
    password: state.user.password,
    name: state.user.name
  })
  
  const mapDispatchToProps = dispatch => ({
    newEmail: (email) => dispatch(newEmail(email)),
    newPassword: (password) => dispatch(newPassword(password)),
    newName: (name) => dispatch(newName(name)),
    newRememberMe: (rememberMe) => dispatch(newRememberMe(rememberMe)),
    newIsLogged: (isLogged) => dispatch(newIsLogged(isLogged)),
    newShowLoginBox: (showLoginBox) => dispatch(newShowLoginBox(showLoginBox))
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserButton);
