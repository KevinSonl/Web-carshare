import React from 'react';

import TripService from "../../services/TripService";
import VehicleTripHistoryComponent from "./VehicleTripHistoryComponent";

export default class VehicleTripHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tripService: new TripService(),
            trips:[]
        }
    }

    componentDidMount() {
        this.state.tripService.findTripsForVehicle(this.props.carId).then(resp =>{
            this.setState({trips:resp.data})
        })
    }

    render(){
        return(
            <div>
                <h2>Rent history for this car</h2>
                <table className="table table-borderless mb-5">
                    <thead className="border-bottom">
                    <tr>
                        <th scope="col">Renter</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Days</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.trips.map((trip,key) => <VehicleTripHistoryComponent trip={trip} key={key}/>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
