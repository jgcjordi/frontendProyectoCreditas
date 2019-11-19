import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';

import ApiPhoneService from '../services/ApiPhoneService';
import BrowserStorageService from '../services/BrowserStorageService';

import { connect } from 'react-redux';
import {
    newShowLoginBox, newRememberMe,
    newIsLogged, newUser
} from '../actions/user';




class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailTextBox: "",
            nameTextBox: "",
            passwordTextBox: "",
            isEmailOrPasswordWrong: false
        };
    }


    ////////////////METHODS////////////


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

    handleClose = () => {
        this.props.newShowLoginBox(false)
        this.setState({ isEmailOrPasswordWrong: false })
    };


    ////////////////RENDER////////////


    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.showLoginBox}>
                <div className="popupLogin">
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
                </div>
            </Dialog>
        );
    }

}



////////////////REDUX////////////

const mapStateToProps = state => ({
    showLoginBox: state.user.showLoginBox,
    isLogged: state.user.isLogged,
    rememberMe: state.user.rememberMe,
    user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
    newRememberMe: (rememberMe) => dispatch(newRememberMe(rememberMe)),
    newIsLogged: (isLogged) => dispatch(newIsLogged(isLogged)),
    newShowLoginBox: (showLoginBox) => dispatch(newShowLoginBox(showLoginBox)),
    newUser: (user) => dispatch(newUser(user)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginDialog);