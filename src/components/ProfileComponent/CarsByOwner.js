import React from 'react';
import UserService from "../../services/UserService";
import CarRowComponent from "../CarComponent/CarRowComponent";
export default class CarsByOwner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cars:[],
            userService: new UserService()
        }
    }
    //
    componentDidMount() {
        this.state.userService.findVehiclesByUser(this.props.ownerId).then(resp =>{
            this.setState({cars:resp.data})
        });
    }



    render(){
        return(
            <table className="table table-borderless">
                <thead className="border-bottom">
                <tr>
                    <th scope="col">Make</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year</th>
                    <th scope="col">Detail</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.cars.map((car, key) =>
                                            <CarRowComponent car = {car} key={key}/>
                    )
                }
                </tbody>
            </table>
        )
    }
}
