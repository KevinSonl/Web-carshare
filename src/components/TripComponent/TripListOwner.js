import React from 'react';
import UserService from "../../services/UserService";
import TripService from "../../services/TripService";
import TripListOwnerComponent from "./TripListOwnerComponent";
import NavUser1 from "../NavUser1";

export default class TripListOwner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tripService: new TripService(),
            userService: new UserService(),
            trips:[]
        }
    }

    componentDidMount() {

        this.state.tripService.findTripsForOwner(this.props.user.id).then(resp =>{
            this.setState({trips:resp.data})
        })
    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <div className="container">
                    <h5 className="font-italic text-muted mx-2 my-4 font-weight-bolder ">Your Trips History: </h5>
                    <table className="table table-borderless my-2">
                        <thead className="border-bottom">
                        <tr>
                            <th scope="col">Renter</th>
                            <th scope="col">Vehicle</th>
                            <th scope="col" className="d-none d-lg-table-cell">Start</th>
                            <th scope="col" className="d-none d-lg-table-cell">End</th>
                            <th scope="col" className="d-none d-sm-table-cell">Fee</th>
                            <th scope="col" className="d-none d-md-table-cell">Days</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.trips.map((trip,key) => <TripListOwnerComponent trip={trip} key={key}/>)
                        }

                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
