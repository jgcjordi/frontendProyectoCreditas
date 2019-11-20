import React from 'react';
import './CardPhone.scss';


function CardPhone({ phone }) {
    return (
        <div className="CardPhone">
            <img className="imagePhone" src={phone.src} alt="Phone" />
            <div className="body-card">
                <div className="brand-model">
                    <div className="brand">{`${phone.brand}`}</div>
                    <div className="model">{` ${phone.model}`}</div>
                </div>
                <div className="price">{`${phone.versions[0].price}€`}</div>
                <div className="seeProduct">SEE PRODUCT</div>
            </div>
        </div>
    );
}

export default CardPhone;