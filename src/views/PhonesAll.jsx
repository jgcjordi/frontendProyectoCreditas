import React, { Component } from 'react';
import ApiPhoneService from '../services/ApiPhoneService';
import {Link} from 'react-router-dom';
import CardPhone from '../components/CardPhone';



class PhonesAll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phones: []
        };

        this.getDataPhonesFromAPI()
    }

    async getDataPhonesFromAPI() {
        const dataPhonesFromApi = await ApiPhoneService.getAllPhones();
        console.log(dataPhonesFromApi)
        this.setState({
            phones: dataPhonesFromApi,
        })
    }

    render() {
        return (
            <div className='PhonesAll'>
                {this.state.phones.map(phone => (
                    <Link to={'/phone/' + phone.id} key={phone.id}>
                        <CardPhone phone={phone} key={phone.id} />
                    </Link>

                ))}
            </div>
        );
    }

}

export default PhonesAll;