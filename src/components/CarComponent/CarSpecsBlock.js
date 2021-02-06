import React, {Component} from 'react';

class CarSpecsBlock extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <h1>{this.props.car.make} {this.props.car.model}</h1>
                <h2 className="align-bottom">{this.props.car.year} </h2>
                    {/*<h6 className="text-muted col-2 font-weight-bold">Specs :</h6>*/}
                    <table className="table table-borderless">
                        <tbody>
                        <tr>
                            <th><h6 className="text-muted col-2 font-weight-bold">Specs:</h6></th>
                            <th><h6>Engine :</h6></th>
                            <td><h6>{this.props.car.engine}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>Style :</h6></th>
                            <td><h6>{this.props.car.style}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>Seat :</h6></th>
                            <td><h6>{this.props.car.standard_seating}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>Trim :</h6></th>
                            <td><h6>{this.props.car.trim_level}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>ABS System :</h6></th>
                            <td><h6>{this.props.car.anti_brake_system}</h6></td>
                        </tr>
                        <tr>
                            <th><h6 className="text-muted col-2 font-weight-bold">Dimension:</h6></th>
                            <th><h6>City:</h6></th>
                            <td><h6>{this.props.car.city_mileage}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>Highway:</h6></th>
                            <td><h6>{this.props.car.highway_mileage}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>Height:</h6></th>
                            <td><h6>{this.props.car.overall_height}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>Length:</h6></th>
                            <td><h6>{this.props.car.overall_length}</h6></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th><h6>Width:</h6></th>
                            <td><h6>{this.props.car.overall_width}</h6></td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        );
    }
}

export default CarSpecsBlock;
