import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';
import { Link } from 'react-router-dom';
import CardPhone from '../components/CardPhone';
import './PhonesAll.css';


import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newPhonesJSON } from '../actions/phones';



class PhonesAll extends Component {

    constructor(props) {
        super(props);

        ///Components to Render in Toolbar
        this.props.newIsBackButton(false)
        this.props.newIsSearchTextBox(true)
        
        
        this.getDataAllPhonesFromAPI()
    }



    ////////////////METHODS////////////

    async getDataAllPhonesFromAPI() {
        const dataPhonesFromApi = await ApiPhoneService.getAllPhones();
        console.log(dataPhonesFromApi)
        this.props.newPhonesJSON(dataPhonesFromApi)
    }


    ////////////////RENDER////////////

    render() {
        return (
            <div className="PhonesAll">
                <div className='phonesList'>
                    {this.props.phonesJSON.map(phone => (
                        <Link to={'/phone/' + phone.id_phone} key={phone.id_phone}>
                            <CardPhone phone={phone} key={phone.id_phone} />
                        </Link>
                    ))}
                </div>
                {this.props.phonesJSON.length === 0 &&
                    <div>No results found for that search.</div>
                }
            </div>
        );
    }

}


const mapStateToProps = state => ({
    isBackButton: state.toolbar.isBackButton,
    isSearchTextBox: state.toolbar.isSearchTextBox,
    phonesJSON: state.phones.phonesJSON

})

const mapDispatchToProps = dispatch => ({
    newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
    newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
    newPhonesJSON: (phonesJSON) => dispatch(newPhonesJSON(phonesJSON))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhonesAll);
