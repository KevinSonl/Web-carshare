import React from 'react';
import * as carService from "../../services/CarService";
import UserService from "../../services/UserService";
import AllVehiclesComponent from "./AllVehiclesComponent";


export default class AllVehicles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cars:null,
            userService: new UserService(),
            add:false,
            vin:'',
            dailyPrice:0,
            description:'',
            user:this.props.user,
            validVin:""
        }
        this.addToEnd = this.addToEnd.bind(this);
        this.updateOwner = this.updateOwner.bind(this);
        this.removeCar = this.removeCar.bind(this);
    }

    componentDidMount() {
        this.state.userService.findVehiclesByUser(this.props.user.id).then(resp =>{
            this.setState({cars:resp.data});
        })
        // console.log(this.props.user);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.cars === null){
            this.state.userService.findVehiclesByUser(this.props.user.id).then(resp =>{
                this.setState({cars:resp.data});
            })
        }
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

    updateOwner(vid){
        // console.log("Add car");
        // console.log(this.props.user);
        let newUser = this.props.user;
        let s = this.props.user.vehicles;
        newUser.vehicles = this.addToEnd(s,vid);
        this.state.userService.updateOwner(this.props.user.id,newUser).then(resp =>{
            this.state.userService.findVehiclesByUser(this.props.user.id).then(resp =>{
                this.setState({cars:resp.data});
            })
        })
    }

    removeCar(vid){
        this.state.userService.findOwnerById(this.props.user.id).then(resp =>{
            let vehicleId = '' + vid;
            let newUser = this.props.user;
            let backup = resp.data.rentHistory;
            let s = this.props.user.vehicles;
            console.log(this.props.user);
            if(s === vehicleId){
                newUser.vehicles="";
            }else{
                const ids = s.split('/');
                const result = ids.filter(word => word !== vehicleId);
                newUser.vehicles = result.join('/');
            }
            //
            // console.log(newUser.vehicles);
            newUser.rentHistory = backup
            // // console.log(backup)
            this.state.userService.updateOwner(this.props.user.id,newUser).then(resp =>{
                this.state.userService.findVehiclesByUser(this.props.user.id).then(resp =>{
                    this.setState({cars:resp.data});
                })
            });
        })
        carService.deleteCar(vid);
    }



    render(){
        return(
            <div>
                <h5 className="text-muted font-weight-bold my-3 px-2 font-italic">Your Listed Vehicles </h5>
                {
                    this.state.cars !== null&&
                    <table className="table table-borderless">
                        <thead className="border-bottom">
                        <tr>
                            {/*<th scope="col">VIN</th>*/}
                            <th scope="col">Make</th>
                            <th className="can-hide" scope="col">Model</th>
                            <th scope="col">Year</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.cars.map((car,key) => <AllVehiclesComponent
                                car={car}
                                key={key}
                                removeCar={this.removeCar} />)
                        }
                        </tbody>
                    </table>

                }
                <div className="add-car">
                    {
                        !this.state.add&&
                        <button className="btn btn-primary mb-5" onClick={()=>{
                            this.setState({add:true})
                        }
                        }>Add new Car</button>
                    }
                    {
                        this.state.add&&
                        <div className=" mb-3">
                            {
                                this.state.validVin === "invalid"&&
                                <div className="invalid-vin">
                                    <label className="invalid-vin-text">Invalid Vin number</label>
                                </div>
                            }

                            <div className="form-group row">
                                <label className="col-sm-3 vin-label">Vin</label>
                                <div className="col-sm-9">
                                    <input className="vin-input form-control" id="vin-input"
                                           placeholder="Input Vin" onChange={event =>
                                        this.setState({vin: event.target.value})}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 vin-label">Price per day</label>
                                <div className="col-sm-9">
                                    <input className="price-input form-control" id="price-input"
                                           placeholder="Input Price" onChange={event =>
                                        this.setState({dailyPrice: parseFloat(event.target.value)})}/>
                                </div>

                            </div>
                            <div className="add-car-description">
                                <span>Description: </span>
                                <textarea className="form-control my-2"
                                          aria-label="With textarea"
                                          placeholder="Please write a good description of your car!"
                                          onChange={(event) =>{
                                              this.setState({description: event.target.value})
                                          }}/>
                            </div>
                            <button className="btn btn-primary confirm-add-btn" onClick={()=>{
                                // console.log("hello");
                                carService.findSpecsByVin(this.state.vin).then(resp => {
                                    console.log(resp);
                                    if(! resp.success){
                                        this.setState({validVin:"invalid"})
                                    }else{

                                        let newCar = {};
                                        newCar.vin = this.state.vin;
                                        newCar.ownerId = this.props.user.id
                                        newCar.make = resp.specification.make;
                                        newCar.model = resp.specification.model;
                                        newCar.year = resp.specification.year;
                                        newCar.style = resp.specification.style.split(" ")[0];
                                        let styles = ["Sedan", "Coupe", "SUV", "Convertible", "Wagon", "Hatchback"];
                                        if (newCar.style === 'SAV') {
                                            newCar.style = "SUV"
                                        }
                                        if (!styles.includes(newCar.style)) {
                                            newCar.style = "Others"
                                        }

                                        newCar.dailyPrice = this.state.dailyPrice;
                                        newCar.description = this.state.description;
                                        newCar.transmission = resp.specification.trim_level;
                                        carService.createCar(newCar).then(resp =>{
                                            // console.log(resp);
                                            this.updateOwner(resp.data.id);
                                        });
                                        this.setState({add:false,validVin:""});
                                    }
                                })
                            }
                            }>Confirm</button>
                            <button className="btn btn-primary cancel-add-btn" onClick={() =>{
                                this.setState({add:false,validVin:""});
                            }}>Cancel</button>

                        </div>
                    }
                </div>
            </div>
        )
    }
}
