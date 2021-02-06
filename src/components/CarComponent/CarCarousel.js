import React, {Component} from 'react';
import * as carService from "../../services/CarService";
import {connect} from "react-redux";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'
import OwlCarousel from "react-owl-carousel";

class CarCarousel extends Component {
    state = {
        items: [
            {
                img: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=424&w=318',
                style: 'All'
            },
            {
                img: 'https://resources.turo.com/f/81934/424x318/5e38b8adff/category-carousel_car-2x.jpg',
                style: 'Sedan'
            },
            {
                img: 'https://resources.turo.com/f/81934/424x318/c35be3fdd1/category-carousel_sport-2x.jpg',
                style: 'Coupe'
            },
            {
                img: 'https://resources.turo.com/f/81934/424x318/904d436edb/category-carousel_suv-2x.jpg',
                style: 'SUV'
            },
            {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnMIOGgplaEgrVP-smoS8-a6HMrgtDejT9ng&usqp=CAU',
                style: 'Convertible'
            },
            {
                img: 'https://resources.turo.com/f/81934/424x318/3fc8dbffa5/category-carousel_minivan-2x.jpg',
                style: 'Wagon'
            },
            {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2IOCQ7QK_6_h8P0rDBYlDm5YzfQAGvv0_3w&usqp=CAU',
                style: 'Hatchback'
            },
            {
                img: 'https://resources.turo.com/f/81934/424x318/4027b7703b/category-carousel_van-2x.jpg',
                style: 'Others'
            },
        ],
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 3,
            },
            600: {
                items: 4,
            },
            1000: {
                items: 5,
            },
        },
    }

    render() {
        const {items} = this.state;
        return (
            <div>
                <h5 className="p-2 text-muted font-weight-bolder font-italic">View by category</h5>
                <OwlCarousel className={'owl-theme'}
                             items="5"
                             nav={true}
                             navText = {['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']}
                             autoplay
                             responsive={this.state.responsive}
                >
                    {items.map((car, index) =>
                                   <div key={index} className="card m-2">
                                       <img className="card-img-top" src={car.img}
                                            alt="Card image cap"
                                            onClick={() => this.props.findCarByStyle(car.style)}/>
                                       <label
                                           className="my-1 row justify-content-center align-items-center search-by-style-text">
                                           {car.style}
                                       </label>
                                   </div>
                    )}
                </OwlCarousel>
            </div>

        )
    }
}

const stateToPropertyMapper = (state) => ({})

const propertyToDispatchMapper = (dispatch) => ({
    findCarByStyle: (style) => {
        if (style === "All") {
            carService.findAllCars()
                .then(cars => dispatch({
                                           type: "FIND_ALL_CARS",
                                           cars: cars,
                                           style: "All"
                                       }))
        } else {
            carService.findCarsByStyle(style)
                .then(cars => dispatch({
                                           type: "FIND_CARS_BY_STYLE",
                                           cars: cars,
                                           style: style
                                       }))
        }
    }
})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(CarCarousel);
