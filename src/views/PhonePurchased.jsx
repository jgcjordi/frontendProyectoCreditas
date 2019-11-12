import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';


import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newLastPurchaseRedirect } from '../actions/user';


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
    };

    ///Components to Render in Toolbar
    this.props.newIsBackButton(true)
    this.props.newIsSearchTextBox(false)
    this.props.newLastPurchaseRedirect(false)
    this.getPhoneFromAPI()
  }



  ////////////////METHODS////////////

  async getPhoneFromAPI() {
    const dataPhoneFromApi = await ApiPhoneService.getPhoneById(this.props.user.idLastPhonePurchased);
    console.log(dataPhoneFromApi)
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
      dataPhone: dataPhoneFromApi.data

    })
  }



  ////////////////RENDER////////////


  render() {

    return (
      <div className='PhonePurchased'>
        <h2>Congratulations {this.props.user.name}</h2>
        <h5>You have purchased a new phone!</h5>
        <img className="imgPhone" style={{ height: "18rem" }} src={this.state.src} alt="Phone" />
        <h5>{this.state.brand} {this.state.model}</h5>
        <h5>{this.state.price}€</h5>
        <h5>Color: {this.state.color} - RAM: {this.state.ram}GB · Storage: {this.state.storage}GB</h5>
        <h5>{this.state.dataPhone}</h5>
      </div >
    );

  }
}

const mapStateToProps = state => ({
  isBackButton: state.toolbar.isBackButton,
  isSearchTextBox: state.toolbar.isSearchTextBox,
  user: state.user.user,
  lastPurchaseRedirect: state.user.lastPurchaseRedirect
})

const mapDispatchToProps = dispatch => ({
  newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
  newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
  newLastPurchaseRedirect: (lastPurchaseRedirect) => dispatch(newLastPurchaseRedirect(lastPurchaseRedirect))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhonePurchased);
