import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';

import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';


class PhoneDetail extends Component {

  constructor(props) {
    super(props);
    console.log("On Create PhoneDetail")

    this.state = {
      phone: [],

      color: "",
      versionIndex: 0,
      price: 0,
      ram: "",
      storage: "",//esto y la ram por ahora no lo estoy usando

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
      color: dataPhoneFromApi.colors[0],
      price: dataPhoneFromApi.version[0].price,
      storage: dataPhoneFromApi.version[0].storage,
      ram: dataPhoneFromApi.version[0].ram,
    })
  }



  ////////////////LISTENERS////////////

  onRadioButtonColorChange = (ev) => {
    this.setState({
      color: ev.currentTarget.value
    });
  }


  onRadioButtonVersionChange = (ev) => {
    this.setState({
      versionIndex: parseInt(ev.currentTarget.value, 10),
      price: this.state.phone.version[ev.currentTarget.value].price,
      ram: this.state.phone.version[ev.currentTarget.value].ram,
      storage: this.state.phone.version[ev.currentTarget.value].storage
    });
  }

  onPurchaseButtonClicked = () => {
    console.log("Purchase")
    this.setState({purchaseRedirect: true})
  }



  ////////////////RENDER////////////

  fillColorRadioButtons() {
    if (this.state.phone.colors !== undefined) {
      return this.state.phone.colors.map(color => (
        <div key={color}>
          <input type="radio" name="color" value={color}
            checked={this.state.color === color}
            onChange={this.onRadioButtonColorChange} />
          {color}
        </div>
      ))
    }
  }


  fillVersionRadioButtons() {
    if (this.state.phone.version !== undefined) {
      return this.state.phone.version.map((version, index) => (
        <div key={index}>
          <input type="radio" name="version" value={index}
            checked={this.state.versionIndex === index}
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
})

const mapDispatchToProps = dispatch => ({
  newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
  newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetail);
