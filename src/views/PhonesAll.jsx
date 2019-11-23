import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';
import { Link } from 'react-router-dom';
import CardPhone from '../components/CardPhone';
import './PhonesAll.scss';


import { connect } from 'react-redux';
import { newIsBackButton, newIsSearchTextBox } from '../actions/toolbar';
import { newPhonesJSON, newActivePage } from '../actions/phones';

import { Pagination } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css'



class PhonesAll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
        };

        ///Components to Render in Toolbar
        this.props.newIsBackButton(false)
        this.props.newIsSearchTextBox(true)


        //this.getDataAllPhonesFromAPI()
        this.getPhonesPagedFromAPI(this.props.activePage-1)

    }



    ////////////////METHODS////////////

    async getPhonesPagedFromAPI(page) {
        const dataPhonesFromApi = await ApiPhoneService.getAllPhonesPaged(page);
        this.props.newPhonesJSON(dataPhonesFromApi.phoneList)
        this.setState({ totalPages: dataPhonesFromApi.totalPages });
    }

    ////////////////LISTENERS////////////

    onPageChange = (e, pageInfo) => {
        this.getPhonesPagedFromAPI(pageInfo.activePage - 1)
        this.props.newActivePage(pageInfo.activePage)
    }


    ////////////////RENDER////////////

    render() {
        return (
            <div className="PhonesAll">
                <div className='phonesList'>
                    {this.props.phonesJSON.map(phone => (
                        <div key={phone.id_phone}>
                            <div className='phoneCardLink'>
                                <Link to={'/phone/' + phone.id_phone} key={phone.id_phone} style={{textDecoration: "none"}}>
                                    <CardPhone phone={phone} key={phone.id_phone} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                {this.props.isBarPagesVisible &&
                    <div className='paginationBar'>
                        <Pagination
                            activePage={this.props.activePage}
                            onPageChange={this.onPageChange}
                            totalPages={this.state.totalPages}
                            siblingRange={0}
                            boundaryRange={1}
                        />
                    </div>
                }
                {this.props.phonesJSON.length === 0 &&
                    <div>No results found for that search.</div>
                }
            </div>
        );
    }

}


////////////////REDUX////////////

const mapStateToProps = state => ({
    isBackButton: state.toolbar.isBackButton,
    isSearchTextBox: state.toolbar.isSearchTextBox,
    phoneSearchText: state.toolbar.phoneSearchText,
    phonesJSON: state.phones.phonesJSON,
    isBarPagesVisible: state.phones.isBarPagesVisible,
    activePage: state.phones.activePage


})

const mapDispatchToProps = dispatch => ({
    newIsBackButton: (isBackButton) => dispatch(newIsBackButton(isBackButton)),
    newIsSearchTextBox: (isSearchTextBox) => dispatch(newIsSearchTextBox(isSearchTextBox)),
    newPhonesJSON: (phonesJSON) => dispatch(newPhonesJSON(phonesJSON)),
    newActivePage: (activePage) => dispatch(newActivePage(activePage))

})

export default connect(mapStateToProps, mapDispatchToProps)(PhonesAll);
