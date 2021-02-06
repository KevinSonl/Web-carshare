import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class CarSearchTable extends React.Component {

    render() {
        return (
            <div className="container">

                <div className="search-result">
                    <h5 className="p-2 text-muted font-weight-bolder font-italic">{this.props.style} Vehicles</h5>
                    <table className="table table-borderless">
                        <thead className="border-bottom">
                        <tr className="">
                            <th scope="col">MAKE</th>
                            <th className="text-muted">MODEL</th>
                            <th className="text-muted">YEAR</th>
                            <th className="text-muted">Mileage</th>
                            <th className="text-muted">Detail</th>

                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.props.cars.length > 0 && this.props.cars.map((car, key) =>
                                                    <tr>

                                                        <td>
                                                            {car.make}
                                                        </td>
                                                        <td>
                    <span className="">
                        {car.model}
                    </span>
                                                        </td>
                                                        <td>
                    <span className="">
                        {car.year}
                    </span>
                                                        </td>
                                                        <td>
                    <span className="">
                        {car.mileage}
                    </span>
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/details/${car.id}`}><Button
                                                                className="btn-md"
                                                                variant="outline-primary">Detail</Button></Link>

                                                        </td>
                                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    cars: state.carsReducer.cars,
    style: state.carsReducer.style
})

const propertyToDispatchMapper = (dispatch) => ({})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(CarSearchTable);

