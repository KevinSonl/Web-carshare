import React from 'react';

import {Link} from 'react-router-dom';
import UserService from "../../services/UserService";
import * as carService from "../../services/CarService";
import TripService from "../../services/TripService";

export default class TripListOwnerComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            vehicle:null,
            renter:null,
            trip:this.props.trip,
            userService:new UserService(),
            tripService:new TripService()
        }
    }
    //
    componentDidMount() {
        carService.findCarByIdAxios(this.props.trip.vehicleId).then(resp =>{
            this.setState({vehicle:resp.data})
        })
        this.state.userService.findRenterById(this.props.trip.renterId).then(resp =>{
            this.setState({renter:resp.data})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.renter === null){
            this.state.userService.findRenterById(this.props.trip.renterId).then(resp =>{
                this.setState({renter:resp.data})
            })
        }
    }

    render(){
        return(

            <tr>
                <td>
                    {
                        this.state.renter !== null &&
                        <Link to={`/users/renters/profile/${this.state.renter.id}`}>{this.state.renter.username}</Link>
                    }
                </td>
                <td>
                    {
                        this.state.vehicle !== ""&&
                        <Link to={`/cars/profile/${this.props.trip.vehicleId}`}>{this.props.trip.make} {this.props.trip.model}</Link>
                    }
                    {
                        this.state.vehicle === ""&&
                        <label>{this.props.trip.make} {this.props.trip.model}</label>
                    }

                </td>
                <td className="d-none d-lg-table-cell">{this.props.trip.startDate}</td>
                <td className="d-none d-lg-table-cell">{this.props.trip.endDate}</td>
                <td className="d-none d-sm-table-cell">{this.props.trip.fee}</td>
                <td className="d-none d-md-table-cell">{this.props.trip.days}</td>
                {
                    this.state.vehicle !== ""&&
                    <td>
                        <div className="btn-group">
                            {
                                this.state.trip.pending && this.state.trip.renterStatus && this.state.trip.ownerStatus&&
                                    <button className="cancel-trip-btn btn btn-sm btn-danger"  type="button" onClick={() =>{
                                        let newTrip=this.props.trip;
                                        newTrip.pending = false;
                                        newTrip.ownerStatus = false;
                                        this.state.tripService.updateTrip(this.props.trip.id,newTrip).then(resp1 =>{
                                            this.state.tripService.findTripById(this.props.trip.id).then(resp =>{
                                                this.setState({trip:resp.data})
                                            })
                                        });
                                    }}>
                                        Cancel
                                    </button>
                            }
                            {
                                this.state.trip.pending && this.state.trip.renterStatus && this.state.trip.ownerStatus&&
                                    <button className="confirm-trip-btn btn-sm btn-success" type="button" onClick={() =>{
                                        let newTrip=this.props.trip;
                                        newTrip.pending = false;
                                        this.state.tripService.updateTrip(this.props.trip.id,newTrip).then(resp1 =>{
                                            this.state.tripService.findTripById(this.props.trip.id).then(resp =>{
                                                this.setState({trip:resp.data})
                                            })
                                        });
                                    }}>
                                        Confirm
                                    </button>
                            }
                            {/*//cancel by renter*/}
                            {
                                !this.state.trip.renterStatus &&
                                <label>Cancel by renter</label>
                            }
                            {/*//cancel by self*/}
                            {
                                !this.state.trip.ownerStatus &&
                                <label>Cancel by yourself</label>
                            }
                            {/*// confirm by owner and wait to finish*/}
                            {
                                !this.state.trip.pending && !this.state.trip.ownerFinishStatus&&this.state.trip.renterStatus &&this.state.trip.ownerStatus&&
                                <button className="finish-trip-btn btn btn-sm form-inline" onClick={() =>{
                                    let newTrip=this.props.trip;
                                    newTrip.ownerFinishStatus = true;
                                    this.state.tripService.updateTrip(this.props.trip.id,newTrip).then(resp1 =>{
                                        this.state.tripService.findTripById(this.props.trip.id).then(resp =>{
                                            this.setState({trip:resp.data})
                                        })
                                    });
                                }}>
                                    Finish
                                </button>
                            }
                            {/*// wait to finish by self*/}
                            {
                                !this.state.trip.pending && this.state.trip.ownerFinishStatus&&!this.state.trip.renterFinishStatus&&
                                <label>Waiting for renter to finish</label>
                            }
                            {
                                !this.state.trip.pending && this.state.trip.renterFinishStatus&&this.state.trip.ownerFinishStatus&&
                                <label>Finished</label>
                            }
                        </div>

                    </td>
                }
                {
                    this.state.vehicle === ""&&
                    <td>Car removed by yourself</td>
                }
            </tr>
        )
    }
}
