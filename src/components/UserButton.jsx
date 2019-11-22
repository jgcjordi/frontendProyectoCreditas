import React, { Component } from 'react';

import LoginDialog from './LoginDialog';
import SnackBarTimer from './SnackbarTimer';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import ApiPhoneService from '../services/ApiPhoneService';
import BrowserStorageService from '../services/BrowserStorageService';

import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    newShowLoginBox, newRememberMe,
    newIsLogged, newUser, newLastPurchaseRedirect
} from '../actions/user';

import './UserButton.scss';





class UserButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSnackBar: false,
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
                BrowserStorageService.deleteDataLogin(true)
            }
        } else if (BrowserStorageService.ifExistTokenOnSessionStorage()) {
            if (await ApiPhoneService.isValidToken(BrowserStorageService.getToken(false))) {
                this.props.newUser(BrowserStorageService.getUser(false))
                this.props.newIsLogged(true)
            } else {
                BrowserStorageService.deleteDataLogin(false)
            }
        }
    }

    async userStillLoggedShowPurchase() {
        if (await ApiPhoneService.isValidToken(BrowserStorageService.getToken(this.props.rememberMe))) {
            if (this.props.user.idLastPhonePurchased === -1) {
                console.log("Yo haven't bought any phone yet")
                this.setState({ showSnackBar: true })
            } else {
                this.props.newLastPurchaseRedirect(true)
            }
        } else {
            BrowserStorageService.deleteDataLogin(this.props.rememberMe)
            this.props.newRememberMe(false)
            this.props.newIsLogged(false)
            this.props.newShowLoginBox(true)
        }

    }

    userLogOut(){
        BrowserStorageService.deleteDataLogin(this.props.rememberMe)
        this.props.newIsLogged(false)
        this.props.newRememberMe(false)
    }


    ////////////////LISTENERS////////////
    onUserClicked = () => {
        if (this.props.isLogged) {
            if (this.props.location.pathname !== "/purchased") {
                this.userStillLoggedShowPurchase()
            } else {
                console.log("Here te button User dont show nothing")
                this.userLogOut()
                this.props.history.push('/')
            }
        } else {
            this.props.newShowLoginBox(true)
        }
    }

    render() {
        return (
            <div className="UserButton">
                <IconButton
                    className="userIcon"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.onUserClicked}
                    color="inherit"
                    size="small"
                >
                    <AccountCircle />
                </IconButton>
                <LoginDialog />
                <SnackBarTimer
                    className="snackBar"
                    open={this.state.showSnackBar}
                    onClose={(ev, reason) => this.setState({ showSnackBar: false })}
                    message="You have not bought anything yet" />
                {this.props.lastPurchaseRedirect && <Redirect push to="/purchased" />}

            </div>
        );
    }

}



////////////////REDUX////////////

const mapStateToProps = state => ({
    showLoginBox: state.user.showLoginBox,
    isLogged: state.user.isLogged,
    rememberMe: state.user.rememberMe,
    user: state.user.user,
    lastPurchaseRedirect: state.user.lastPurchaseRedirect
})

const mapDispatchToProps = dispatch => ({
    newShowLoginBox: (showLoginBox) => dispatch(newShowLoginBox(showLoginBox)),
    newIsLogged: (isLogged) => dispatch(newIsLogged(isLogged)),
    newRememberMe: (rememberMe) => dispatch(newRememberMe(rememberMe)),
    newUser: (user) => dispatch(newUser(user)),
    newLastPurchaseRedirect: (lastPurchaseRedirect) => dispatch(newLastPurchaseRedirect(lastPurchaseRedirect))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserButton));
