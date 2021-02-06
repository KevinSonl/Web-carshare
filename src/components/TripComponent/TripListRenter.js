import React from 'react';
import UserService from "../../services/UserService";
import TripService from "../../services/TripService";
import TripListRenterComponent from "./TripListRenterComponent";
import * as carService from "../../services/CarService";
import NavUser1 from "../NavUser1";

export default class TripListRenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tripService: new TripService(),
            userService: new UserService(),
            trips:[]
        }
        this.deleteTrip = this.deleteTrip.bind(this);
        this.removeAnId = this.removeAnId.bind(this);
    }

    componentDidMount() {
        this.state.tripService.findTripsForRenter(this.props.user.id).then(resp =>{
            this.setState({trips:resp.data})
        })
    }

    removeAnId(s,id){
        if(s === id){
            return "";
        }else{
            const ids=s.split('/');
            const result = ids.filter(word => word !== id);
            return result.join('/');
        }
    }

    deleteTrip(tid,trip){
        this.state.userService.findRenterById(this.props.user.id).then(resp =>{
            let tripId=''+ tid;
            let newUser=this.props.user;
            let s = resp.data.tripHistory;
            newUser.tripHistory = this.removeAnId(s,tripId);
            this.state.userService.updateRenter(this.props.user.id,newUser).then(resp =>{
                this.state.tripService.findTripsForRenter(this.props.user.id).then(resp =>{
                    this.setState({trips:resp.data})
                })
            })
        })
        carService.findCarByIdAxios(trip.vehicleId).then(resp =>{
            let tripId=''+ tid;
            let newCar=resp.data;
            let s = resp.data.renterHistory;
            newCar.renterHistory = this.removeAnId(s,tripId);
            carService.updateCar(trip.vehicleId, newCar);
            this.state.userService.findOwnerById(newCar.ownerId).then(resp =>{
                let newUser=resp.data;
                let s = resp.data.rentHistory;
                newUser.rentHistory = this.removeAnId(s,tripId);
                this.state.userService.updateOwner(newCar.ownerId,newUser);
            })
        });
        this.state.tripService.deleteTrip(tid);
    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <div className="container">
                    <h5 className="text-muted my-3 px-2">Your Trip History: </h5>
                    <table className="table table-borderless">
                        <thead className="border-bottom">
                        <tr>
                            <th scope="col">Vehicle</th>
                            <th scope="col" className="d-none d-lg-table-cell">Start</th>
                            <th scope="col" className="d-none d-lg-table-cell">End</th>
                            <th scope="col" className="d-none d-sm-table-cell">Fee</th>
                            <th scope="col" className="d-none d-md-table-cell" scope="col">Days</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.trips.map((trip,key) => <TripListRenterComponent trip={trip} key={key} deleteTrip={this.deleteTrip}/>)
                        }

                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
