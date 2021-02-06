import React, { Component } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'
import OwlCarousel from "react-owl-carousel";
import CarCardComponent from "./CarCardComponent";

class SuggestCars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsive:{
                0: {
                    items: 1,
                },
                500: {
                    items: 1,
                },
                800: {
                    items: 2,
                },
                1000: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
            },
        }
    }

    render () {
        return (
            <div>
                <OwlCarousel className={'owl-theme'}
                             loop={true}
                             margin={5}
                             nav={true}
                             navText = {['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']}
                             autoplay
                             responsive = {this.state.responsive}
                >
                    {this.props.suggestCars.map(car =>
                                                    <CarCardComponent car={car}/>
                    )}
                </OwlCarousel>
            </div>

        )
    }
}

export default SuggestCars;
