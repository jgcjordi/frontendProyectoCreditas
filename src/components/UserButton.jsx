import React, { Component } from 'react';
import './UserButton.css';

import ApiPhoneService from '../services/ApiPhoneService';
import BrowserStorageService from '../services/BrowserStorageService';

import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import {
    newShowLoginBox, newRememberMe,
    newIsLogged, newUser, newLastPurchaseRedirect
} from '../actions/user';


class UserButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailTextBox: "",
            nameTextBox: "",
            passwordTextBox: "",
            isEmailOrPasswordWrong: false
        };

        this.shouldRememberLastUser()
    }


    ////////////////METHODS////////////

    async shouldRememberLastUser() {
        if (BrowserStorageService.ifExistTokenOnLocalStorage()) {
            if (await ApiPhoneService.isValidToken(BrowserStorageService.getToken(true))) {
                this.props.newUser(BrowserStorageService.getUser(true))
                this.props.newIsLogged(true)
                this.props.newRememberMe(true)
            } else {
                BrowserStorageService.deleteDataLogin(this.props.rememberMe)
            }
        }
    }


    async trySignIn() {
        const dataUserFromApi = await ApiPhoneService.tryLogIn(this.state.emailTextBox, this.state.passwordTextBox);
        console.log(dataUserFromApi)
        if (dataUserFromApi) {
            this.props.newUser(dataUserFromApi)
            BrowserStorageService.saveUserOnBrowserStorage(dataUserFromApi, this.props.rememberMe)
            BrowserStorageService.saveTokenOnBrowserStorage(dataUserFromApi.password, this.props.rememberMe)

            this.props.newIsLogged(true)
            this.props.newShowLoginBox(false)
            this.setState({ isEmailOrPasswordWrong: false })
        } else {
            this.setState({ isEmailOrPasswordWrong: true })
        }
    }


    ////////////////LISTENERS////////////
    onUserClicked = () => {
        if (this.props.isLogged) {
            if (this.props.location.pathname !== "/purchased") {
                if (this.props.user.idLastPhonePurchased === -1) {
                    console.log("Yo haven't bought any phone yet")
                } else {
                    this.props.newLastPurchaseRedirect(true)
                }
            } else {
                console.log("Here te button User dont show nothing")
            }
        } else {
            this.props.newShowLoginBox(true)
        }
    }

    onRememberMeChange = () => {
        let aux = !this.props.rememberMe
        this.props.newRememberMe(aux)
    }

    onSignInClicked = () => {
        if (this.state.emailTextBox !== "" && this.state.passwordTextBox !== "") {
            this.trySignIn()
        } else {
            this.setState({ isEmailOrPasswordWrong: true })
        }

    }

    onBackgroundCoverClick = () => {
        this.props.newShowLoginBox(false)
        this.setState({ isEmailOrPasswordWrong: false })
    }


    ////////////////RENDER////////////

    showLoginPopup() {
        if (this.props.showLoginBox) {
            return (
                <div className="popupLogin">
                    <div className="backgroundCover" onClick={this.onBackgroundCoverClick}></div>
                    <div className="boxLogin">
                        <form>
                            <div>Login</div>
                            <input
                                className="textBoxLogin"
                                type="text"
                                placeholder="Email"
                                onChange={(ev) => this.setState({ emailTextBox: ev.target.value })}
                                value={this.state.emailTextBox}
                                onKeyDown={(ev) => ev.key === 'Enter' && this.onSignInClicked()}
                            />
                            <input
                                className="textBoxLogin"
                                type="text"
                                placeholder="Name"
                                onChange={(ev) => this.setState({ nameTextBox: ev.target.value })}
                                value={this.state.nameTextBox}
                                onKeyDown={(ev) => ev.key === 'Enter' && this.onSignInClicked()}
                            />
                            <input
                                className="textBoxLogin"
                                type="password"
                                placeholder="Password"
                                onChange={(ev) => this.setState({ passwordTextBox: ev.target.value })}
                                value={this.state.passwordTextBox}
                                onKeyDown={(ev) => ev.key === 'Enter' && this.onSignInClicked()}
                            />
                        </form>
                        <input type="checkbox" name="rememberMe" onChange={this.onRememberMeChange} defaultChecked={this.props.rememberMe} />Remember me
                        <br />
                        <button className="buttonSignIn" type="button" onClick={this.onSignInClicked}>Sign In</button>
                        {this.state.isEmailOrPasswordWrong &&
                            <h6>Email or password is wrong</h6>}
                    </div>
                </div>)
        }
    }


    render() {
        return (
            <div className="UserButton">
                <div>
                    <button className="button" type="button" onClick={this.onUserClicked}>User</button>
                </div>
                {this.showLoginPopup()}
                {this.props.lastPurchaseRedirect && <Redirect push to="/purchased" />}
            </div>
        );
    }

}



const mapStateToProps = state => ({
    showLoginBox: state.user.showLoginBox,
    isLogged: state.user.isLogged,
    rememberMe: state.user.rememberMe,
    user: state.user.user,
    lastPurchaseRedirect: state.user.lastPurchaseRedirect
})

const mapDispatchToProps = dispatch => ({
    newRememberMe: (rememberMe) => dispatch(newRememberMe(rememberMe)),
    newIsLogged: (isLogged) => dispatch(newIsLogged(isLogged)),
    newShowLoginBox: (showLoginBox) => dispatch(newShowLoginBox(showLoginBox)),
    newUser: (user) => dispatch(newUser(user)),
    newLastPurchaseRedirect: (lastPurchaseRedirect) => dispatch(newLastPurchaseRedirect(lastPurchaseRedirect))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserButton));
