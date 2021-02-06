import React from 'react';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const CarCardComponent = (props) => {
    return (
        <div className="card " style={{ width: '16rem' }} >
            <div className="card-header">
                <b>{props.car.make} {props.car.model.substr(0, 18)}</b></div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Trim: {props.car.transmission.substr(0,20)}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Year: {props.car.year}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Mileage: {props.car.mileage}</h6>

                <p className="text-muted">{props.car.description.substr(0, 23)} ...</p>
                <div className="border-top pt-1">
                    <span className=""><b>${props.car.dailyPrice}/day</b></span>
                    <Link to={`/details/${props.car.id}`}>
                        <Button className="btn-md float-right" variant="outline-primary">Detail</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCardComponent;
