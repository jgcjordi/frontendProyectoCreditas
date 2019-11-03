import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';
import { Link } from 'react-router-dom';
import CardPhone from '../components/CardPhone';



class PhonesAll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phones: [],
            searchPhoneText: ""

        };

        this.getDataAllPhonesFromAPI()
    }



    ////////////////METHODS////////////

    async getDataAllPhonesFromAPI() {
        const dataPhonesFromApi = await ApiPhoneService.getAllPhones();
        console.log(dataPhonesFromApi)
        this.setState({
            phones: dataPhonesFromApi,
        })
    }

    async getDataPhonesFilteredByKeywords() {
        const dataPhonesFromApi = await ApiPhoneService.getPhonesFilteredByKeywords(this.state.searchPhoneText);
        console.log(dataPhonesFromApi)
        this.setState({
            phones: dataPhonesFromApi,
        })
    }



    ////////////////LISTENERS////////////

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.getDataPhonesFilteredByKeywords()
        }
    }

    onSearchPhonesTextChanged = (event) => {
        this.setState({ searchPhoneText: event.target.value })
    }

    onBtnSearchClicked = () => {
        this.getDataPhonesFilteredByKeywords()
    }



    ////////////////RENDER////////////

    render() {
        return (
            <div className="PhonesAll">
                <div>
                    <input
                        className="searcherTextBox"
                        type="text"
                        placeholder="Mobile Phone"
                        onChange={this.onSearchPhonesTextChanged}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.phoneSearchText} />
                    <button className="buttonSearch" onClick={this.onBtnSearchClicked}>Search</button>
                </div>
                <div className='phonesList'>
                    {this.state.phones.map(phone => (
                        <Link to={'/phone/' + phone.id} key={phone.id}>
                            <CardPhone phone={phone} key={phone.id} />
                        </Link>

                    ))}
                </div>
            </div>
        );
    }

}

export default PhonesAll;