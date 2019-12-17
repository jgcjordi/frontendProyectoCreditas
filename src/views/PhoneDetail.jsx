import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';
import BrowserStorageService from '../services/BrowserStorageService';

import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newShowLoginBox, newUser, newIsLogged, newRememberMe, newIsNewPurchase } from '../actions/user';

import './PhoneDetail.scss';
import Radio from '@material-ui/core/Radio';
import Fab from '@material-ui/core/Fab';




class PhoneDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productsOfModel: [],
      productSelected: [],

      src: "",
      brand: "",
      model: "",
      description: "",
      price: 0,
      version: 0,
      color: "",

      allProductsCombination: [],
      versions: [],
      colors: [],


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
    const dataProductsOfModel = await ApiPhoneService.getAllProductsOfThisModelWithStockOrderedByPrice(currentPhoneId);

    //Get array whit all versions
    const allProductsCombination = dataProductsOfModel.map(x => {
      let version = {
        id: x.id,
        version: `${x.ram.value} GB · ${x.storage.value} GB`,
        color: x.color.name
      }
      return version
    })

    //Delete duplicated ram-storage
    let unique = []
    const versions = allProductsCombination.filter(x => {
      if (unique.includes(x.version)) {
        return false
      } else {
        unique.push(x.version)
        return true
      }
    })

    const colors = allProductsCombination.filter(x => x.version === allProductsCombination[0].version)

    this.setState({
      productsOfModel: dataProductsOfModel,
      productSelected: dataProductsOfModel[0],

      brand: dataProductsOfModel[0].brand.name,
      src: dataProductsOfModel[0].model.image,
      model: dataProductsOfModel[0].model.name,
      description: dataProductsOfModel[0].model.description,
      price: dataProductsOfModel[0].price,
      version: dataProductsOfModel[0].id,
      color: dataProductsOfModel[0].id,

      allProductsCombination: allProductsCombination,
      versions: versions,
      colors: colors
    })
  }

  async purchasePhone() {
    const dataUserFromApi = await ApiPhoneService.purchasePhone(this.props.user.id, this.state.color,
      BrowserStorageService.getToken(this.props.rememberMe));

    if (dataUserFromApi) {//Purchase Success
      // BrowserStorageService.saveUserOnBrowserStorage(dataUserFromApi, this.props.rememberMe)
      // this.props.newUser(dataUserFromApi)
      this.props.newIsNewPurchase(true)

      this.setState({ purchaseRedirect: true })

    } else {//Delete Data User
      BrowserStorageService.deleteDataLogin(this.props.rememberMe)

      this.props.newRememberMe(false)
      this.props.newIsLogged(false)
      this.props.newShowLoginBox(true)
    }

  }



  ////////////////LISTENERS////////////

  onRadioButtonVersionChange = (ev) => {
    let idProductSelected = parseInt(ev.currentTarget.value, 10)
    const model = this.state.productsOfModel.filter(model => model.id === idProductSelected)
    const productCombination = this.state.allProductsCombination.find(x => x.id === idProductSelected)
    const colorsAvailable = this.state.allProductsCombination.filter(product => product.version === productCombination.version)
    
    this.setState({
      price: model[0].price,
      version: model[0].id,
      color: model[0].id,
      colors: colorsAvailable
    });
  }

  onRadioButtonColorChange = (ev) => {
    let idProductSelected = parseInt(ev.currentTarget.value, 10)
    const model = this.state.productsOfModel.filter(model => model.id === idProductSelected)
    this.setState({
      price: model[0].price,
      color: idProductSelected
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

  fillVersionRadioButtons() {
    return this.state.versions.map(version => (
      <div key={version.id}>
        <Radio
          checked={this.state.version === version.id}
          color="secondary"
          onChange={this.onRadioButtonVersionChange}
          value={version.id}
          name="version"
          inputProps={{ 'aria-label': 'version' }}
        />
        {`${version.version}`}
      </div>
    ))
  }

  fillColorRadioButtons() {
    return this.state.colors.map(color => (
      <div key={color.id}>
        <Radio
          checked={this.state.color === color.id}
          color="secondary"
          onChange={this.onRadioButtonColorChange}
          value={color.id}
          name="color"
          inputProps={{ 'aria-label': 'color' }}
        />
        {color.color}
      </div>
    ))
  }


  render() {

    return (
      <div className='PhoneDetail'>
        <div className='image-forms'>
          <div className='image-model-price'>
            <img className="img-phone" src={this.state.src} alt="Product" />
            <div className='model-price'>
              <div className='model'>{`${this.state.brand} ${this.state.model}`}</div>
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
          <div className="data">{this.state.description}</div>
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
  newUser: (user) => dispatch(newUser(user)),
  newIsNewPurchase: (isNewPurchase) => dispatch(newIsNewPurchase(isNewPurchase))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetail);
