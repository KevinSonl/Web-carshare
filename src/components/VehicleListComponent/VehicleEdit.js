import React from 'react';

import * as carService from "../../services/CarService";
import VehicleTripHistory from "./VehicleTripHistory";
import NavUser1 from "../NavUser1";


export default class VehicleEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            edit:false,
            vin:'',
            car:null,
            dailyPrice:0,
            description:''
        }
    }

    componentDidMount() {
        carService.findCarById(this.props.carId).then(resp=>{
            this.setState({car:resp,vin:resp.vin,dailyPrice:resp.dailyPrice,description:resp.description});
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.car === null){
            carService.findCarById(this.props.carId).then(resp=>{
                this.setState({car:resp,vin:resp.vin,dailyPrice:resp.dailyPrice,description:resp.description});
            })
        }


    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <div className="container">
                    {
                        this.state.car !== null&&
                        <table className="table table-borderless">
                            <tbody>
                            <tr>
                                <th scope="row">Vin</th>
                                <td>
                                    <label>{this.state.car.vin}</label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Make</th>
                                <td>{this.state.car.make}</td>
                            </tr>
                            <tr>
                                <th scope="row">Model</th>
                                <td>{this.state.car.make}</td>
                            </tr>
                            <tr>
                                <th scope="row">Year</th>
                                <td>{this.state.car.year}</td>
                            </tr>
                            <tr>
                                <th scope="row">Style</th>
                                <td>{this.state.car.style}</td>
                            </tr>
                            <tr>
                                <th scope="row">Transmission</th>
                                <td>{this.state.car.transmission}</td>
                            </tr>
                            <tr>
                                <th scope="row">Price per Day</th>
                                <td>
                                    {
                                        !this.state.edit &&
                                        <label>{this.state.car.dailyPrice}</label>
                                    }
                                    {
                                        this.state.edit &&
                                        <input className="form-control" placeholder={this.state.car.dailyPrice} onChange={event =>
                                            this.setState({dailyPrice: parseFloat(event.target.value)})}/>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td>
                                    {
                                        !this.state.edit &&
                                        <label>{this.state.car.description}</label>
                                    }
                                    {
                                        this.state.edit &&
                                        <textarea className="form-control"
                                                  aria-label="With textarea"
                                                  placeholder={this.state.car.description}
                                                  onChange={(event) =>{
                                                      this.setState({description: event.target.value})
                                                  }}/>
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    }



                    <div className="profile_edit_btn">
                        {
                            !this.state.edit &&
                            <button className="btn btn-primary edit_profile_btn" onClick={() =>{
                                this.setState({edit:true})
                            }}>
                                Edit Vehicle
                            </button>
                        }
                        {
                            this.state.edit &&
                            <button className="btn btn-primary confirm_profile_btn" onClick={() =>{
                                console.log(this.state.vin);
                                carService.findSpecsByVin(this.state.vin).then(resp => {
                                    if(! resp.success){
                                        alert("Invalid vin");
                                    }else{
                                        let newCar = this.state.car;
                                        newCar.vin = this.state.vin;
                                        newCar.make = resp.specification.make;
                                        newCar.model = resp.specification.model;
                                        newCar.year = resp.specification.year;
                                        newCar.style = resp.specification.style;
                                        newCar.dailyPrice = this.state.dailyPrice;
                                        newCar.description = this.state.description;
                                        newCar.transmission = resp.specification.trim_level;
                                        this.setState({car:newCar,edit:false})
                                        carService.updateCar(this.props.carId,newCar);
                                    }
                                })

                            }}>
                                Confirm
                            </button>
                        }
                    </div>
                    <div>
                        {
                            this.state.car !== null&&
                            <VehicleTripHistory carId={this.state.car.id}/>
                        }
                    </div>
                </div>






            </div>

        )
    }
}
