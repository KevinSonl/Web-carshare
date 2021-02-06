import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as carService from "../services/CarService";
import UserService from "../services/UserService";
import CarSpecsBlock from "../components/CarComponent/CarSpecsBlock";
import Jumbotron from "../components/Jumbotron";
import Nav1 from "../components/Nav1";
import NavUser1 from "../components/NavUser1";

class CarDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userService: new UserService(),
            isLiked: false,
            likeList: this.props.user === null ? [] : this.props.user.likeList
        }

        this.checkInLikeList = this.checkInLikeList.bind(this);
        this.removeCar = this.removeCar.bind(this);
    }

    checkInLikeList(vid) {
        if(this.props.user.type==="Renter"){
            let vehicleId = '' + vid;
            let s = this.props.user.likeList;
            const ids = s.split('/');
            const index = ids.indexOf(vehicleId);
            return index !== -1;
        }else{
            return false;
        }


    }

    removeCar(vid) {
        let vehicleId = '' + vid;
        let newUser = this.props.user;
        let s = this.props.user.likeList;
        const ids = s.split('/');
        const result = ids.filter(word => word !== vehicleId);
        newUser.likeList = result.join('/');
        this.state.userService.updateRenter(this.props.user.id, newUser);
    }

    componentDidMount() {
        const carId = this.props.carId;
        this.props.findDetailsById(carId);
        if (this.props.isLogged) {
            this.setState({isLiked: this.checkInLikeList(this.props.carId)});
        }

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.user.likeList !== this.props.user.likeList){
    //         console.log("hahahah");
    //
    //         this.setState({isLiked:
    // this.checkInLikeList(this.props.carId),likeList:this.props.user.likeList}) } }

    render() {
        return (
            <div>
                <div>
                    {
                        !this.props.isLogged &&
                        <Nav1/>
                    }
                    {
                        this.props.isLogged &&
                        <NavUser1 user={this.props.user} logout={this.props.logout}/>
                    }
                    <Jumbotron/>
                    <div className="container">
                        {
                            !this.props.isLogged &&
                            <div className="car-detail-unlog">
                                <CarSpecsBlock car={this.props.apiCar}/>

                                <table className="table table-borderless car-description-table">
                                    <tbody>
                                    <tr>
                                        <th><h6 className="text-muted font-weight-bold">Daily
                                            Price: </h6></th>
                                        <th><h6>${this.props.car.dailyPrice}/day </h6></th>
                                    </tr>
                                    <tr>
                                        <th><h6
                                            className="text-muted font-weight-bold">Mileage: </h6>
                                        </th>
                                        <th><h6>{this.props.car.mileage} </h6></th>
                                    </tr>
                                    <tr>
                                        <th><h6
                                            className="text-muted font-weight-bold">Owner: </h6>
                                        </th>
                                        <th>
                                            <Link to={`/users/owners/profile/${this.props.owner.id}`}>
                                                <button className="btn">

                                                    <i className="fa fa-user-circle"></i>
                                                    <p className="font-weight-bolder">{this.props.owner.username}</p>
                                                </button>
                                            </Link>

                                        </th>
                                    </tr>
                                    <tr>
                                        <th><h6
                                            className="text-muted font-weight-bold">Description: </h6>
                                        </th>
                                        <th>
                                            <div className="card description-card">
                                                <div className="card-body">
                                                    <p className="card-text">{this.props.car.description}</p>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    </tbody>
                                </table>

                                <div className="row">
                                    <div className="col text-center Book-this-car mb-5">
                                        <Link to={'/login'}>
                                            <button
                                                className='btn btn-primary book-this-car'>
                                                Book this car
                                            </button>
                                        </Link>
                                        <Link to={'/login'}>
                                            <button className='btn btn-primary add-to-list'>
                                                Add to Like List
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        }


                        {
                            this.props.isLogged && this.props.car !== null &&
                            <div className="car-detail-log">
                                <CarSpecsBlock car={this.props.apiCar}/>

                                <table className="table table-borderless car-description-table">
                                    <tbody>
                                    <tr>
                                        <th><h6 className="text-muted font-weight-bold">Daily
                                            Price: </h6></th>
                                        <th><h6>${this.props.car.dailyPrice}/day </h6></th>
                                    </tr>
                                    <tr>
                                        <th><h6
                                            className="text-muted font-weight-bold">Mileage: </h6>
                                        </th>
                                        <th><h6>{this.props.car.mileage} </h6></th>
                                    </tr>
                                    <tr>
                                        <th><h6
                                            className="text-muted font-weight-bold">Owner: </h6>
                                        </th>
                                        <th>
                                            <Link to={`/users/owners/profile/${this.props.owner.id}`}>
                                                <button className="btn">

                                                    <i className="fa fa-user-circle"></i>
                                                    <p className="font-weight-bolder">{this.props.owner.username}</p>
                                                </button>
                                            </Link>

                                        </th>
                                    </tr>
                                    <tr>
                                        <th><h6
                                            className="text-muted font-weight-bold">Description: </h6>
                                        </th>
                                        <th>
                                            <div className="card description-card">
                                                <div className="card-body">
                                                    <p className="card-text">{this.props.car.description}</p>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    </tbody>
                                </table>
                                {
                                    this.props.user.type==="Renter"&&
                                    <div className="row">
                                        <div className=" col book-this-car text-center mb-5">
                                            <Link to={`/cars/order/${this.props.car.id}`}>
                                                <button className='btn btn-primary book-this-car'>
                                                    Book this car
                                                </button>
                                            </Link>
                                            {
                                                this.state.isLiked &&
                                                <button className='btn btn-primary add-to-list'
                                                        onClick={() => {
                                                            this.removeCar(this.props.car.id);
                                                            this.setState({isLiked: false})
                                                        }
                                                        }>
                                                    Remove from like list
                                                </button>
                                            }

                                            {
                                                !this.state.isLiked &&
                                                <button className='btn btn-primary add-to-list'
                                                        onClick={() => {

                                                            let oldLike = this.props.user.likeList;
                                                            let newLike = '';

                                                            if (oldLike === '') {
                                                                newLike = '' + this.props.car.id;
                                                            } else {
                                                                newLike =
                                                                    oldLike + '/' + this.props.car.id
                                                            }

                                                            let newUser = this.props.user;
                                                            newUser.likeList = newLike;
                                                            this.state.userService.updateRenter(
                                                                this.props.user.id, newUser);
                                                            this.setState({isLiked: true})
                                                        }}>Add to Like List</button>
                                            }
                                        </div>
                                    </div>
                                }



                            </div>
                        }
                    </div>

                </div>

            </div>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    car: state.carDetailReducer.car,
    apiCar: state.carsReducer.apiCar,
    owner: state.carDetailReducer.owner
})

const propertyToDispatchMapper = (dispatch) => ({
    findDetailsById: (carId) => {
        return carService.findCarById(carId)
            .then(car => {
                      carService.findSpecsByVin(car.vin).then(
                          apiCar => dispatch({
                                                 type: "FIND_FROM_API_BY_VIN",
                                                 car: apiCar.specification,
                                             })
                      )

                      new UserService().findOwnerById(car.ownerId).then(owner => {
                          console.log(owner.data)
                          dispatch({
                                       type: "FIND_HOST_BY_ID",
                                       owner: owner.data,
                                   })
                      })

                      dispatch({
                                   type: "FIND_CAR_BY_ID",
                                   car: car,
                                   carId: carId
                               })
                  }
            );
    }

})

const CarDetail = connect(stateToPropertyMapper, propertyToDispatchMapper)(CarDetailComponent)
export default CarDetail
