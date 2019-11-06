import React, { Component } from 'react';
// import ApiPhoneService from '../services/ApiPhoneService';
// import { Link } from 'react-router-dom';


import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';


class PhonePurchased extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: [],
      name: "David Stanete",
      src:"https://cdn.phonehouse.es/res/products-image/3/7/7/5/7/377575-2221824.jpg",

      brand:"Xiaomi",
      model:"Mi 9T",
      price: 300.00,
      color: "Yellow",
      ram: 16,
      storage: 500,//esto y la ram por ahora no lo estoy usando
      dataPhone: "Data about the phone asdf asdf asdf asdf asdf asdf asdf asdf asdf asdfasdf asdf asdf asdf asdfasdf  asdf asdf asdf asdfasdf asd fasdf asdf asdf asdf asdf asdf asdf asdf asdfasdf asd fasdf asdf asdf asdf asdf asdf asdf asdf asdfasdf asd fasdf asdf asdf asdf asdf asdf asasd fasdf asdfasdfas dfasdf asd fasdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdfasdf",

    };

    ///Components to Render in Toolbar
    this.props.newIsBackButton(true)
    this.props.newIsSearchTextBox(false)

  }



  ////////////////METHODS////////////



  ////////////////LISTENERS////////////



  ////////////////RENDER////////////


  render() {

    return (
      <div className='PhonePurchased'>
        <h2>Congratulations {this.state.name}</h2>
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
})

const mapDispatchToProps = dispatch => ({
  newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
  newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhonePurchased);
