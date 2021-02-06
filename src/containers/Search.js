import React from 'react';
import SearchBox from "../components/CarComponent/SearchBox";
import CarSearchCardDeck from "../components/CarComponent/CarSearchCardDeck";
import * as carService from "../services/CarService";
import {connect} from "react-redux";
import Nav1 from "../components/Nav1";
import NavUser1 from "../components/NavUser1";

class Search extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.findLatestCars()
        this.props.clearSearch()
        const vin = this.props.match.params.vin
        const make = this.props.match.params.make

        if (make !== undefined) {
            this.props.findCarsByMake(make)
        }
        if (vin !== undefined) {
            this.props.findCarByVin(vin)
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const vin = this.props.match.params.vin
        const make = this.props.match.params.make

        if (make !== prevProps.match.params.make) {
            this.props.findCarsByMake(make)
        }
        if (vin !== prevProps.match.params.vin && vin !== undefined) {
            this.props.clearSearch()
            this.props.findCarByVin(vin)
        }
    }

    render() {
        return (
            <div>

                {!this.props.isLogged &&
                 <Nav1/>
                }
                {this.props.isLogged &&
                 <NavUser1 user={this.props.user} logout={this.props.logout}/>
                }
                <SearchBox/>

                <CarSearchCardDeck/>
            </div>

        )
    }
}

const stateToPropertyMapper = (state) => ({
    cars: state.carsReducer.cars,
    isValidVin: state.carsReducer.isValidVin
})

const propertyToDispatchMapper = (dispatch) => ({
    findLatestCars: () => carService.findLatestCars()
        .then(cars => dispatch({
                                   type: "FIND_LATEST_CARS",
                                   cars: cars,
                               })),
    findCarsByMake: (make) => carService.findCarsByMake(make)
        .then(cars => {
            dispatch({
                         type: "VALIDATE_VIN",
                         isValidVin: true,
                     })
            dispatch({
                         type: "FIND_CARS_BY_MAKE",
                         cars: cars,
                         searchType: "make",
                     })
        }),
    findCarByVin: (vin) => carService.findCarByVin(vin)
        .then(resp => {
            if (resp.data === "") {
                /*alert("Not contain this car")*/
                dispatch({
                             type: "VIN_CAR_STAT",
                             hasSearchCar: false,
                             carId: ""
                         })
            } else {
                /*alert("contain this car!")*/
                dispatch({
                             type: "VIN_CAR_STAT",
                             hasSearchCar: true,
                             carId: resp.data.id
                         })
            }
            console.log(resp.data)
            carService.findSpecsByVin(vin)
                .then(resp => {
                    if (!resp.success) {
                        dispatch({
                                     type: "VALIDATE_VIN",
                                     isValidVin: false,
                                 })

                    } else {
                        dispatch({
                                     type: "VALIDATE_VIN",
                                     isValidVin: true,
                                 })
                        let newCar = resp.specification;
                        if (newCar.style !== null) {
                            newCar.style = resp.specification.style.split(" ")[0];
                            let styles = ["Sedan", "Coupe", "SUV", "Convertible", "Wagon",
                                          "Hatchback"];
                            if (newCar.style === 'SAV') {
                                newCar.style = "SUV"
                            }
                            if (!styles.includes(newCar.style)) {
                                newCar.style = "Others"
                            }
                        }
                        dispatch({
                                     type: "FIND_FROM_API_BY_VIN",
                                     car: newCar,
                                     searchType: "vin",
                                 })
                        carService.findCarsByStyle(newCar.style)
                            .then(cars => {
                                dispatch({
                                             type: "SUGGEST_SAME_STYLE",
                                             cars: cars,
                                         })
                            })
                        carService.findCarsByMake(newCar.make)
                            .then(cars => {
                                dispatch({
                                             type: "SUGGEST_SAME_MAKE",
                                             cars: cars,
                                         })
                            })
                    }
                })

        }),
    clearSearch: () => dispatch({
                                    type: "CLEAR_CARS"
                                }),
})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(Search);
