import React from 'react';

import ApiPhoneService from '../services/ApiPhoneService';

import { connect } from 'react-redux';
import { newPhoneSearchText } from '../actions/toolbar';
import { newPhonesJSON, newIsBarPagesVisible, newActivePage } from '../actions/phones';

import SearchIcon from '@material-ui/icons/Search';
import './SearcherTextBox.scss';



function SearcherTextBox(props) {

    const getDataPhonesFilteredByKeywords = async () => {
        if (props.phoneSearchText === "") {
            const dataPhonesFromApi = await ApiPhoneService.getAllPhonesPaged(0);
            props.newPhonesJSON(dataPhonesFromApi.phoneList)
            props.newIsBarPagesVisible(true)
            props.newActivePage(1)
        } else {
            const dataPhonesFromApi = await ApiPhoneService.getPhonesFilteredByKeywords(props.phoneSearchText);
            props.newPhonesJSON(dataPhonesFromApi)
            props.newPhoneSearchText("")
            props.newIsBarPagesVisible(false)
        }

    }


    return (
        <div className="SearcherTextBox" style={{ visibility: props.visibility }}>
                <div className="searchIcon">
                    <SearchIcon/>
                </div>
            <input
                className="textBoxSearch"
                type="text"
                placeholder="Mobile Phone..."
                onChange={(ev) => props.newPhoneSearchText(ev.target.value)}
                onKeyDown={(ev) => ev.key === 'Enter' && getDataPhonesFilteredByKeywords()}
                value={props.phoneSearchText}
            />
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