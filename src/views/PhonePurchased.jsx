import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';


import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newLastPurchaseRedirect } from '../actions/user';

import './PhonePurchased.scss';


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

  }



  ////////////////METHODS////////////

  startGetPhoneFromAPI() {
    this.getPhoneFromAPI()
    return null
  }

  async getPhoneFromAPI() {
    const dataPhoneFromApi = await ApiPhoneService.getPhoneById(this.props.user.idLastPhonePurchased);
    const version = dataPhoneFromApi.versions.filter(version =>
      version.id_version_phone === this.props.user.idLastPhonePurchasedVersion)
    const color = dataPhoneFromApi.colors.filter(color =>
      color.idColorPhone === this.props.user.idLastPhonePurchasedColor)
    this.setState({
      phone: dataPhoneFromApi,
      src: dataPhoneFromApi.src,
      brand: dataPhoneFromApi.brand,
      model: dataPhoneFromApi.model,
      color: color[0].color,
      price: version[0].price,
      ram: version[0].ram,
      storage: version[0].storage,
      dataPhone: dataPhoneFromApi.data,
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
        {this.props.user.idLastPhonePurchased &&
          !this.state.lastPhonePurchasedDataRecived &&
          this.startGetPhoneFromAPI()}
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
  isNewPurchase: state.user.isNewPurchase
})

const mapDispatchToProps = dispatch => ({
  newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
  newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
  newLastPurchaseRedirect: (lastPurchaseRedirect) => dispatch(newLastPurchaseRedirect(lastPurchaseRedirect))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhonePurchased);
