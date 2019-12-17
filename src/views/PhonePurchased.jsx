import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';


import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newLastPurchaseRedirect } from '../actions/user';

import './PhonePurchased.scss';
import BrowserStorageService from '../services/BrowserStorageService';


class PhonePurchased extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: [],
      src: "",
      brand: "",
      model: "",
      color: "",
      price: 0,
      ram: 0,
      storage: 0,
      dataPhone: "",
      
      lastPhonePurchasedDataRecived: false,
    };

    ///Components to Render in Toolbar
    this.props.newIsBackButton(false)
    this.props.newIsSearchTextBox(false)
    this.props.newLastPurchaseRedirect(false)

    this.getLastUserPurchaseFromAPI()
  }



  ////////////////METHODS////////////

  async getLastUserPurchaseFromAPI() {
    const token = BrowserStorageService.getToken(this.props.rememberMe)
    const dataPhoneFromApi = await ApiPhoneService.getLastProductPurchase(token);
    this.setState({
      phone: dataPhoneFromApi,
      src: dataPhoneFromApi.model.image,
      brand: dataPhoneFromApi.brand.name,
      model: dataPhoneFromApi.model.name,
      color: dataPhoneFromApi.color.name,
      price: dataPhoneFromApi.price,
      ram: dataPhoneFromApi.ram.value,
      storage: dataPhoneFromApi.storage.value,
      dataPhone: dataPhoneFromApi.model.description,
      lastPhonePurchasedDataRecived: true
    })
  }

  lastPurchaseExist() {
    return <div>
      <h2 className="congratulations">
        {this.props.isNewPurchase ? "Congratulations " : "Hi, "}
        {this.props.user.name}</h2>
      <h5 className="phonePurchased">
        {this.props.isNewPurchase ? "You have purchased a new phone! " : "This is your last phone purchased: "}</h5>
      <div className="dataPhone">
        <img className="imgPhone" src={this.state.src} alt="Phone Purchased" />
        <div className="allDataText">
          <div className="model-price">
            <div>{this.state.brand} {this.state.model}</div>
            <div className="price">{this.state.price}€</div>
          </div>
          <div className="features">Color: {this.state.color} - RAM: {this.state.ram}GB · Storage: {this.state.storage}GB</div>
          <div>{this.state.dataPhone}</div>
        </div>
      </div>
    </div >
  }


  ////////////////RENDER////////////


  render() {

    return (
      <div className='PhonePurchased'>
        {this.state.lastPhonePurchasedDataRecived && this.lastPurchaseExist()}
      </div >
    );

  }
}


////////////////REDUX////////////

const mapStateToProps = state => ({
  isBackButton: state.toolbar.isBackButton,
  isSearchTextBox: state.toolbar.isSearchTextBox,
  user: state.user.user,
  lastPurchaseRedirect: state.user.lastPurchaseRedirect,
  isNewPurchase: state.user.isNewPurchase,
  rememberMe: state.user.rememberMe
})

const mapDispatchToProps = dispatch => ({
  newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
  newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
  newLastPurchaseRedirect: (lastPurchaseRedirect) => dispatch(newLastPurchaseRedirect(lastPurchaseRedirect))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhonePurchased);
