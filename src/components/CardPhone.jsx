import React from 'react';
import './CardPhone.scss';


function CardPhone({ phone }) {
    return (
        <div className="CardPhone">
            <img className="imagePhone" src={phone.model.image} alt="Phone" />
            <div className="body-card">
                <div className="brand-model">
                    <div className="brand">{`${phone.brand.name}`}</div>
                    <div className="model">{` ${phone.model.name}`}</div>
                </div>
                <div className="price">{`${phone.price}€`}</div>
                <div className="seeProduct">SEE PRODUCT</div>
            </div>
        </div>
    );
}

export default CardPhone;