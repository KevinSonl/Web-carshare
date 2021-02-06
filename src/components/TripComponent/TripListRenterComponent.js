import React from 'react';

import {Link} from 'react-router-dom';
import TripService from "../../services/TripService";
import * as carService from "../../services/CarService";

export default class TripListRenterComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            vehicle:null,
            tripService:new TripService(),
            trip:this.props.trip
        }
    }

    componentDidMount() {
        carService.findCarByIdAxios(this.props.trip.vehicleId).then(resp =>{
            console.log(resp.data)
            this.setState({vehicle:resp.data})
        })
    }

    render(){
        return(
            <tr>
                <td>
                    {
                        this.state.vehicle !== ""&&
                        <Link to={`/details/${this.props.trip.vehicleId}`}>{this.props.trip.make} {this.props.trip.model}</Link>
                    }
                    {
                        this.state.vehicle === ""&&
                        <label>{this.props.trip.make} {this.props.trip.model}</label>
                    }
                </td>
                <td className="d-none d-lg-table-cell ">{this.props.trip.startDate}</td>
                <td className="d-none d-lg-table-cell">{this.props.trip.endDate}</td>
                <td className="d-none d-sm-table-cell">${this.props.trip.fee}</td>
                <td className="d-none d-md-table-cell">{this.props.trip.days}</td>
                {
                    this.state.vehicle !== ""&&
                    <td>

                        {/*//订单最开始*/}
                        {
                            this.state.trip.pending && this.state.trip.renterStatus && this.state.trip.ownerStatus&&
                            <label>Waiting owner to confirm</label>
                        }
                        {
                            this.state.trip.pending && this.state.trip.renterStatus && this.state.trip.ownerStatus&&
                            <button className="cancel-trip-btn btn btn-sm btn-danger" onClick={() =>{
                                this.props.deleteTrip(this.props.trip.id,this.props.trip);
                            }}>
                                Cancel
                            </button>
                        }
                        {/*//cancel by self*/}
                        {
                            !this.state.trip.renterStatus &&
                            <label>Cancel by yourself</label>
                        }
                        {/*//cancel by owner*/}
                        {
                            !this.state.trip.ownerStatus &&
                            <label>Cancel by owner</label>
                        }
                        {/*// confirm by owner and wait to finish*/}
                        {
                            !this.state.trip.pending && !this.state.trip.renterFinishStatus&&this.state.trip.renterStatus&&this.state.trip.ownerStatus&&
                            <button className="finish-trip-btn btn btn-sm btn-success" onClick={() =>{
                                let newTrip=this.props.trip;
                                newTrip.renterFinishStatus = true;
                                this.state.tripService.updateTrip(this.props.trip.id,newTrip).then(resp1 =>{
                                    this.state.tripService.findTripById(this.props.trip.id).then(resp =>{
                                        this.setState({trip:resp.data})
                                    })
                                });
                            }}>
                                Finish
                            </button>
                        }
                        {/*// wait to finish by owner*/}
                        {
                            !this.state.trip.pending && this.state.trip.renterFinishStatus&&!this.state.trip.ownerFinishStatus&&
                            <label>Waiting owner to confirm</label>
                        }
                        {
                            !this.state.trip.pending && this.state.trip.renterFinishStatus&&this.state.trip.ownerFinishStatus&&
                            <label>Finished</label>
                        }
                    </td>
                }
                {
                    this.state.vehicle === ""&&
                    <td>Car removed by owner</td>
                }
            </tr>
        )
    }
}
