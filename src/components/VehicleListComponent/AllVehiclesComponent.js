import React from 'react';

import {Link} from 'react-router-dom';

export default class AllVehiclesComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <tr>
                <td>{this.props.car.make}</td>
                <td className="can-hide">{this.props.car.model}</td>
                <td>{this.props.car.year}</td>
                <td>
                    <Link to={`/cars/profile/${this.props.car.id}`} >
                        Detail
                    </Link>
                </td>
                <td>
                    <button className="delete-car-btn" onClick={() =>{
                        this.props.removeCar(this.props.car.id);
                    }}>
                        <i className="fa fa-times"/>
                    </button>
                </td>
            </tr>
        )
    }
}
