import React from 'react';

import ApiPhoneService from '../services/ApiPhoneService';

import { connect } from 'react-redux';
import { newPhoneSearchText } from '../actions/toolbar';
import { newPhonesJSON } from '../actions/phones';



function SearcherTextBox(props) {

    const getDataPhonesFilteredByKeywords = async () => {
        const dataPhonesFromApi = await ApiPhoneService.getPhonesFilteredByKeywords(props.phoneSearchText);
        console.log(dataPhonesFromApi)
        props.newPhonesJSON(dataPhonesFromApi)
        props.newPhoneSearchText("")
    }


    return (
        <div className="SearcherTextBox">
            <input
                className="textBoxSearch"
                type="text"
                placeholder="Mobile Phone"
                onChange={(ev) => props.newPhoneSearchText(ev.target.value)}
                onKeyDown={(ev) => ev.key === 'Enter' && getDataPhonesFilteredByKeywords()}
                value={props.phoneSearchText}
            />
            <button className="buttonSearch" onClick={getDataPhonesFilteredByKeywords}>Search</button>

        </div>
    );
}


const mapStateToProps = state => ({
    phoneSearchText: state.toolbar.phoneSearchText
})

const mapDispatchToProps = dispatch => ({
    newPhoneSearchText: (phoneSearchText) => dispatch(newPhoneSearchText(phoneSearchText)),
    newPhonesJSON: (phonesJSON) => dispatch(newPhonesJSON(phonesJSON))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearcherTextBox);