
import React, {Component} from 'react';
import Jumbotron from "../Jumbotron";
import CarSearchTable from "../CarComponent/CarSearchTable";
import carService from "../../services/CarService";
import {connect} from "react-redux";
import TopCars from "../CarComponent/TopCars";
import CarCarousel from "../CarComponent/CarCarousel";

class HomePageMainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { topCars: [] };
    }

    componentDidMount() {
        this.props.findLatestCars()
        /*carService.findLatestCars().then(cars => {
            this.setState({topCars: cars})
        })*/
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topCars != this.props.topCars) {
            this.props.findLatestCars()
        }
    }

    render() {
        return (
            <div>
                <Jumbotron/>
                <div className="main-content container">

                    {
                        this.props.isLogged&&
                        <CarCarousel/>
                    }
                    {
                        this.props.isLogged&&
                        <CarSearchTable/>
                    }

                    <TopCars topCars={this.props.topCars}/>
                    {/*<SuggestCars suggestCars={this.state.topCars}/>*/}
                </div>
            </div>
        );
    }
}


const stateToPropertyMapper = (state) => ({
    topCars: state.carsReducer.topCars
})

const propertyToDispatchMapper = (dispatch) => ({
    findLatestCars: () => carService.findLatestCars()
        .then(cars => dispatch({
                                   type: "FIND_LATEST_CARS",
                                   cars: cars,
                               })),

})

const HomePageMainRenter = connect(stateToPropertyMapper, propertyToDispatchMapper)(HomePageMainComponent)
export default HomePageMainRenter
