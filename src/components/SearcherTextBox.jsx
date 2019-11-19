import React from 'react';

import ApiPhoneService from '../services/ApiPhoneService';

import { connect } from 'react-redux';
import { newPhoneSearchText } from '../actions/toolbar';
import { newPhonesJSON, newIsBarPagesVisible, newActivePage } from '../actions/phones';



function SearcherTextBox(props) {

    const getDataPhonesFilteredByKeywords = async () => {
        if(props.phoneSearchText === ""){
            const dataPhonesFromApi = await ApiPhoneService.getAllPhonesPaged(0);
            console.log(dataPhonesFromApi)
            props.newPhonesJSON(dataPhonesFromApi.phoneList)
            props.newIsBarPagesVisible(true)
            props.newActivePage(1)
        }else{
            const dataPhonesFromApi = await ApiPhoneService.getPhonesFilteredByKeywords(props.phoneSearchText);
            console.log(dataPhonesFromApi)
            props.newPhonesJSON(dataPhonesFromApi)
            props.newPhoneSearchText("")
            props.newIsBarPagesVisible(false)
        }

    }


    return (
        <div className="SearcherTextBox" style={{visibility: props.visibility}}>
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
    phoneSearchText: state.toolbar.phoneSearchText,
    isBarPagesVisible: state.phones.isBarPagesVisible
})

const mapDispatchToProps = dispatch => ({
    newPhoneSearchText: (phoneSearchText) => dispatch(newPhoneSearchText(phoneSearchText)),
    newPhonesJSON: (phonesJSON) => dispatch(newPhonesJSON(phonesJSON)),
    newIsBarPagesVisible: (isBarPagesVisible) => dispatch(newIsBarPagesVisible(isBarPagesVisible)),
    newActivePage: (activePage) => dispatch(newActivePage(activePage))

})

export default connect(mapStateToProps, mapDispatchToProps)(SearcherTextBox);