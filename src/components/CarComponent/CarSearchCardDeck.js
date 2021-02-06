import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import SuggestCars from "./SuggestCars";
import CarSpecsBlock from "./CarSpecsBlock";
import CarCardComponent from "./CarCardComponent";

class CarSearchCardDeck extends Component {

    render() {
        return <div className="container">
            <div>
                {
                    (this.props.cars.length < 1 && !this.props.apiCar) &&
                    <div>

                        {
                            this.props.isValidVin === false && <h5 className="text-danger mx-2 my-4 font-weight-bolder">Invalid VIN... Please provide valid vin number!</h5>
                        }
                        {
                            (this.props.isValidVin === null ) && <h5 className="text-danger mx-2 my-4 font-weight-bolder">No result found...Please try other brand!</h5>
                        }
                        {
                            (this.props.topCars.length >= 1) &&
                            <div className="m-2">
                                <h5 className="p-2 text-muted font-weight-bolder font-italic">check out our latest vehicles: </h5>
                                <div className="p-2">
                                    <SuggestCars suggestCars={this.props.topCars}/>
                                </div>

                            </div>
                        }

                    </div>
                }

            </div>

            <div className="card-deck card-deck-search">
                {
                    this.props.cars.map((car) =><CarCardComponent car={car}/>)
                }
            </div>


            {
                this.props.apiCar && <div>
                    <CarSpecsBlock car={this.props.apiCar}/>
                    {
                        this.props.hasSearchCar && <div>
                            <Link to={`/details/${this.props.carId}`}>
                                <button className="btn btn-primary m-3" >Detail</button>
                            </Link>
                        </div>
                    }
                </div>
            }

            {
                (this.props.suggestCars.length >= 1 && (this.props.isValidVin === true) ) &&
                <div className="m-2">
                    <h5 className="p-2 text-muted font-weight-bolder font-italic">Similar Cars base on your search: </h5>
                    <div className="p-1 ">
                        <SuggestCars suggestCars={this.props.suggestCars}/>
                    </div>
                </div>
            }

        </div>;
    }
}

const stateToPropertyMapper = (state) => ({
    cars: state.carsReducer.cars,
    apiCar: state.carsReducer.apiCar,
    suggestCars: state.carsReducer.suggestByMake.concat(state.carsReducer.suggestByStyle),
    topCars: state.carsReducer.topCars,
    isValidVin: state.carsReducer.isValidVin,
    hasSearchCar: state.carsReducer.hasSearchCar,
    carId: state.carsReducer.carId,
    searchType: state.carsReducer.searchType
})

const propertyToDispatchMapper = (dispatch) => ({})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(CarSearchCardDeck);
