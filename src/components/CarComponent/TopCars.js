import React from 'react';
import Carousel from "react-elastic-carousel";
import CarCardComponent from "./CarCardComponent";

const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
    {width: 1100, itemsToShow: 4},
]

const TopCars = (props) => {

    return (
        <div>
            <h5 className="mt-3 p-2  text-muted font-weight-bolder font-italic">Check out the latest vehicles </h5>
            <Carousel className="my-3" breakPoints={breakPoints}>
                {
                    props.topCars.map((car, index) =>
                        <CarCardComponent key={index} car={car}/>

                    )
                }
            </Carousel>
        </div>
    );
};

export default TopCars;
