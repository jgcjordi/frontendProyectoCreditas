import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';


class PhoneDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: []
    };

    this.getPhoneFromAPI()
  }

  async getPhoneFromAPI() {
    const currentPhoneId = this.props.match.params.id;
    const dataPhoneFromApi = await ApiPhoneService.getPhoneById(currentPhoneId);
    this.setState({
      phone: dataPhoneFromApi,
    })
  }

  fillColorRadioButtons() {
    if (this.state.phone.colors !== undefined) {
      return this.state.phone.colors.map(color => (
        <div key={color}><input type="radio" name="color" value={color}/>{color}</div>
      ))
    }
  }

  fillVersionRadioButtons() {
    if (this.state.phone.version !== undefined) {
      return this.state.phone.colors.map(color => (
        <div key={color}><input type="radio" name="color" value={color}/>{color}</div>
      ))
    }
  }

  render() {

    return (
      <div className='PhoneDetail'>
        <img className="img-phone" style={{ height: "30rem" }} src={this.state.phone.src} alt="Phone" />
        <h3 className="data-phone">{this.state.phone.data}</h3>

        {/* <form action="">
        <span><input type="radio" name="color" value="male" />{"Hola"}</span><br/>
        <span><input type="radio" name="color" value="male" />{"Hola2"}</span><br/>
        </form> */}

        <form>
          {this.fillColorRadioButtons()}
        </form>

        <form action="">
          {this.fillColorRadioButtons()}
        </form>


      </div >
    );

  }
}

export default PhoneDetail;