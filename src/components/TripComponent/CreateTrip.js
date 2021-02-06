import React from 'react';
import UserService from "../../services/UserService";
import TripService from "../../services/TripService";

import * as carService from "../../services/CarService";
import {Link} from "react-router-dom";
import NavUser1 from "../NavUser1";

export default class CreateTrip extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tripService: new TripService(),
            userService: new UserService(),
            car:null,
            validDate:1,
            startDate:"",
            endDate:"",
            days:0,
            fees:0,
            trips:[]
        }
        this.calculateDays = this.calculateDays.bind(this);
        this.updateRenter = this.updateRenter.bind(this);
        this.addToEnd = this.addToEnd.bind(this);
        this.updateOwner = this.updateOwner.bind(this);
        this.updateVehicle = this.updateVehicle.bind(this);
    }

    componentDidMount() {
        carService.findCarById(this.props.carId).then(resp =>{
            this.setState({car:resp});
        })
        this.state.tripService.findTripsForVehicle(this.props.carId).then(resp =>{
            this.setState({trips:resp.data});
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.car === null){
            carService.findCarById(this.props.carId).then(resp =>{
                this.setState({car:resp})
            })
            this.state.tripService.findTripsForVehicle(this.props.carId).then(resp =>{
                this.setState({trips:resp.data});
            })
        }
    }

    calculateDays(){
        let dateStart = new Date(this.state.startDate);
        let dateEnd = new Date(this.state.endDate);
        let days = (dateEnd - dateStart) / (1000 * 60 * 60 * 24) + 1;
        console.log(days);
        if(isNaN(days) || days <= 0){
            this.setState({validDate:-1,days:0});
            return;
        }
        for(let i = 0; i< this.state.trips.length;i++){
            let t = this.state.trips[i];
            let start = new Date(t.startDate);
            let end = new Date(t.endDate);

            if((dateStart - start >= 0 && dateStart - end <= 0)
               || (dateEnd-end <= 0 && dateEnd - start>= 0)||(dateEnd-end>=0 && dateStart - start <= 0)){
                this.setState({validDate:0,days:0});
                return;
            }

        }
        this.setState({days:days,validDate:1});
    }


    addToEnd(s,id){
        let result='';
        if(s === ""){
            result ='' + id;
        }else{
            result = s + '/' + id;
        }

        return result;
    }

    updateRenter(tid){
        let newUser = this.props.user;
        let s = this.props.user.tripHistory;
        newUser.tripHistory = this.addToEnd(s, tid);
        this.state.userService.updateRenter(this.props.user.id,newUser);
    }

    updateVehicle(tid){
        let newCar = this.state.car;
        let s = this.state.car.renterHistory;
        newCar.renterHistory = this.addToEnd(s,tid);
        carService.updateCar(this.state.car.id, newCar);
    }

    updateOwner(tid){
        this.state.userService.findOwnerById(this.state.car.ownerId).then(resp =>{
            let newOwner = resp.data;
            let s = resp.data.rentHistory;
            newOwner.rentHistory = this.addToEnd(s,tid);
            console.log(newOwner.rentHistory);
            this.state.userService.updateOwner(this.state.car.ownerId,newOwner);
        })
    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <div className="container">
                    {
                        this.state.car !== null &&
                        <div className="book-car">
                            <div className="book-car-input">
                                <h4 className="p-2 text-muted  font-italic">Select Dates: </h4>
                                {
                                    this.state.validDate === -1&&
                                    <div className="invalid-username">
                                        <h5 className="text-danger mx-2 my-4 ">Invalid Date... End date must after start date!</h5>
                                    </div>
                                }
                                {
                                    this.state.validDate === 0&&
                                    <div className="invalid-username">
                                        <label className="invalid-username-text-invalid">
                                            <h5 className="text-danger mx-2 my-4 ">These date have been occupied </h5>
                                        </label>
                                    </div>
                                }
                                <div className="form-group row book-car-input-start">

                                    <label className="col-sm-2 col-form-label"><h6 className="p-2 text-muted  font-italic">State Dates </h6></label>
                                    <div className="col-sm-9">
                                        <input className="book-car-input-startDate form-control" id="book-car-input-startDate" type="date"
                                               onChange={event => {
                                                   this.setState({startDate: event.target.value})
                                                   if(this.state.days > 0){
                                                       this.calculateDays();
                                                   }
                                               }}/>
                                    </div>

                                </div>

                                <div className="form-group row book-car-input-end">
                                    <label className="col-sm-2 col-form-label"><h6 className="p-2 text-muted  font-italic">End Dates </h6></label>
                                    <div className="col-sm-9">
                                        <input className="book-car-input-endDate form-control" id="book-car-input-endDate" type="date"
                                               onChange={event => {
                                                   this.setState({endDate: event.target.value})
                                                   if(this.state.days > 0){
                                                       this.calculateDays();
                                                   }
                                               }}/>
                                    </div>
                                </div>

                                <button className="btn btn-primary book-car-check" onClick={() =>{
                                    this.calculateDays();
                                }}>
                                    Show Summary
                                </button>
                            </div>
                            {
                                this.state.days > 0 &&
                                <div className="book-car-summary mt-3">
                                    <h4 className="p-2 text-muted  font-italic">Order Summary: </h4>
                                    <div className="book-car-information">
                                        <table className="table table-borderless">
                                            <tbody>
                                            <tr>
                                                <td><h6 className="text-muted font-weight-bold">Car :</h6></td>
                                                <td><h6>{this.state.car.make} {this.state.car.model}</h6></td>
                                            </tr>
                                            <tr>
                                                <td><h6 className="text-muted font-weight-bold">Start
                                                    Date: </h6></td>
                                                <td><h6>{this.state.startDate}</h6></td>
                                            </tr>
                                            <tr>
                                                <td><h6 className="text-muted font-weight-bold">End
                                                    Date: </h6></td>
                                                <td><h6>{this.state.endDate}</h6></td>
                                            </tr>
                                            <tr>
                                                <td><h6 className="text-muted font-weight-bold">Total Days : </h6></td>
                                                <td><h6>{this.state.days} days</h6></td>
                                            </tr>
                                            <tr>
                                                <td><h6 className="text-muted font-weight-bold">Total Fee: </h6></td>
                                                <td><h6>$ {this.state.days * this.state.car.dailyPrice}</h6></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <Link to={`/details/${this.state.car.id}`}>
                                        <button className="btn btn-primary" onClick={()=>{
                                            this.state.tripService.createTrip(
                                                {
                                                    vehicleId:this.state.car.id,
                                                    renterId:this.props.user.id,
                                                    startDate:this.state.startDate,
                                                    endDate:this.state.endDate,
                                                    days: this.state.days,
                                                    fee:this.state.days* this.state.car.dailyPrice,
                                                    make:this.state.car.make,
                                                    model:this.state.car.model
                                                }
                                            ).then(resp =>{
                                                this.updateRenter(resp.data.id);
                                                this.updateVehicle(resp.data.id);
                                                this.updateOwner(resp.data.id);
                                            });
                                            alert("You have successfully book this car");
                                            // window.location.href=`/cars/${this.state.car.id}`

                                        }
                                        }>Confirm</button>
                                    </Link>

                                </div>
                            }
                        </div>
                    }
                </div>

            </div>

        )
    }
}
