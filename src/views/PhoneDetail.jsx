import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';
import BrowserStorageService from '../services/BrowserStorageService';

import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newShowLoginBox, newUser, newIsLogged, newRememberMe } from '../actions/user';


class PhoneDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: [],

      color: "",
      version: 0,
      price: 0,

      purchaseRedirect: false,
    };

    ///Components to Render in Toolbar
    this.props.newIsBackButton(true)
    this.props.newIsSearchTextBox(false)


    this.getPhoneFromAPI()
  }



  ////////////////METHODS////////////

  async getPhoneFromAPI() {
    const currentPhoneId = this.props.match.params.id;
    const dataPhoneFromApi = await ApiPhoneService.getPhoneById(currentPhoneId);
    this.setState({
      phone: dataPhoneFromApi,
      color: dataPhoneFromApi.colors[0].idColorPhone,
      version: dataPhoneFromApi.versions[0].id_version_phone,
      price: dataPhoneFromApi.versions[0].price,

    })
  }

  async purchasePhone() {
    const dataUserFromApi = await ApiPhoneService.purchasePhone(this.props.user.id_user, this.state.phone.id_phone,
      this.state.version, this.state.color, BrowserStorageService.getToken(this.props.rememberMe));

    if (dataUserFromApi) {//Purchase Success
      BrowserStorageService.saveUserOnBrowserStorage(dataUserFromApi, this.props.rememberMe)
      this.props.newUser(dataUserFromApi)

      this.setState({ purchaseRedirect: true })

    } else {//Delete Data User
      BrowserStorageService.deleteDataLogin(this.props.rememberMe)

      this.props.newRememberMe(false)
      this.props.newIsLogged(false)
      this.props.newShowLoginBox(true)
    }

  }



  ////////////////LISTENERS////////////

  onRadioButtonColorChange = (ev) => {
    this.setState({
      color: parseInt(ev.currentTarget.value, 10)
    });
  }


  onRadioButtonVersionChange = (ev) => {
    const version = this.state.phone.versions.filter(version =>
      version.id_version_phone === parseInt(ev.currentTarget.value, 10))
    this.setState({
      version: parseInt(ev.currentTarget.value, 10),
      price: version[0].price
    });
  }

  onPurchaseButtonClicked = () => {
    if (this.props.isLogged) {
      this.purchasePhone()
    } else {
      this.props.newShowLoginBox(true)
    }
  }



  ////////////////RENDER////////////

  fillColorRadioButtons() {
    if (this.state.phone.colors !== undefined) {
      return this.state.phone.colors.map(color => (
        <div key={color.idColorPhone}>
          <input type="radio" name="color" value={color.idColorPhone}
            checked={this.state.color === color.idColorPhone}
            onChange={this.onRadioButtonColorChange} />
          {color.color}
        </div>
      ))
    }
  }


  fillVersionRadioButtons() {
    if (this.state.phone.versions !== undefined) {
      return this.state.phone.versions.map(version => (
        <div key={version.id_version_phone}>
          <input type="radio" name="version" value={version.id_version_phone}
            checked={this.state.version === version.id_version_phone}
            onChange={this.onRadioButtonVersionChange} />
          {`${version.ram} GB · ${version.storage} GB`}
        </div>
      ))
    }
  }

  render() {

    return (
      <div className='PhoneDetail'>
        <img className="img-phone" style={{ height: "30rem" }} src={this.state.phone.src} alt="Phone" />

        <div className="model-phone">{`${this.state.phone.brand} ${this.state.phone.model}`}</div>
        <div className="model-phone">{`${this.state.price}€`}</div>

        <div className="data-phone">{this.state.phone.data}</div>

        <form>
          <div>Color</div>
          {this.fillColorRadioButtons()}
        </form>

        <form action="">
          <div>RAM · Storage</div>
          {this.fillVersionRadioButtons()}
        </form>

        <button className="btn" type="button" onClick={this.onPurchaseButtonClicked} >Purchase</button>
        {this.state.purchaseRedirect && <Redirect push to="/purchased" />}

      </div >
    );
  }
}

const mapStateToProps = state => ({
  isBackButton: state.toolbar.isBackButton,
  isSearchTextBox: state.toolbar.isSearchTextBox,
  isLogged: state.user.isLogged,
  showLoginBox: state.user.showLoginBox,
  user: state.user.user,
  rememberMe: state.user.rememberMe
})

const mapDispatchToProps = dispatch => ({
  newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
  newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
  newShowLoginBox: (showLoginBox) => dispatch(newShowLoginBox(showLoginBox)),
  newIsLogged: (isLogged) => dispatch(newIsLogged(isLogged)),
  newRememberMe: (rememberMe) => dispatch(newRememberMe(rememberMe)),
  newUser: (user) => dispatch(newUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetail);
