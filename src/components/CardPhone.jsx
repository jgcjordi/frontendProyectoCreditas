import React from 'react';

function CardPhone({ phone }) {
    return (
        <div className="CardPhone">
            <div className="card" style={{ width: "12rem" }}>
                <img className="card-img-top" style={{ height: "18rem" }} src={phone.src} alt="Phone" />
                <div className="body-card" style={{ height: "6rem" }}>
                    <div className="brand-model">{`${phone.brand} ${phone.model}`}</div>
                    <div className="price">{`${phone.versions[0].price}€`}</div>
                </div>
            </div>
        </div>
    );
}

export default CardPhone;