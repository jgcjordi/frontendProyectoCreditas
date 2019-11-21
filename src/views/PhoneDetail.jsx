import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';
import BrowserStorageService from '../services/BrowserStorageService';

import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newShowLoginBox, newUser, newIsLogged, newRememberMe } from '../actions/user';

import './PhoneDetail.scss';

import Radio from '@material-ui/core/Radio';
import Fab from '@material-ui/core/Fab';




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
          <Radio
            checked={this.state.color === color.idColorPhone}
            color="secondary"
            onChange={this.onRadioButtonColorChange}
            value={color.idColorPhone}
            name="color"
            inputProps={{ 'aria-label': 'color' }}
          />
          {color.color}
        </div>
      ))
    }
  }


  fillVersionRadioButtons() {
    if (this.state.phone.versions !== undefined) {
      return this.state.phone.versions.map(version => (
        <div key={version.id_version_phone}>
          <Radio
            checked={this.state.version === version.id_version_phone}
            color="secondary"
            onChange={this.onRadioButtonVersionChange}
            value={version.id_version_phone}
            name="version"
            inputProps={{ 'aria-label': 'version' }}
          />
          {`${version.ram} GB · ${version.storage} GB`}
        </div>
      ))
    }
  }


  render() {

    return (
      <div className='PhoneDetail'>
        <div className='image-forms'>
          <div className='image-model-price'>
            <img className="img-phone" src={this.state.phone.src} alt="Phone" />
            <div className='model-price'>
              <div className='model'>{`${this.state.phone.brand} ${this.state.phone.model}`}</div>
              <div className='price'>{`${this.state.price}€`}</div>
            </div>
          </div>

          <form>
            <div className="title-version">Color</div>
            {this.fillColorRadioButtons()}
          </form>

          <form>
            <div className="title-version">RAM · Storage</div>
            {this.fillVersionRadioButtons()}
          </form>

        </div>

        <div className="data-purchase-btn" >
          <div className="data">{this.state.phone.data}</div>
          <div className="btn-container">
            <Fab
              variant="extended"
              size="large"
              color="secondary"
              aria-label="purchase"
              className="purchase-button"
              onClick={this.onPurchaseButtonClicked}
            >
              <span className="text-name">PURCHASE</span>

            </Fab>
          </div>
        </div>
        {this.state.purchaseRedirect && <Redirect push to="/purchased" />}
      </div >
    );
  }
}



////////////////REDUX////////////

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
