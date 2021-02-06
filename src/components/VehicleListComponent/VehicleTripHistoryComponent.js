import React from 'react';

import {Link} from 'react-router-dom';
import UserService from "../../services/UserService";


export default class VehicleTripHistoryComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            renter:null,
            userService:new UserService()
        }
    }

    componentDidMount() {
        this.state.userService.findRenterById(this.props.trip.renterId).then(resp =>{
            this.setState({renter:resp.data})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.renter === null){
            this.state.userService.findRenterById(this.props.trip.renterId).then(resp =>{
                this.setState({renter:resp.data})
            })
        }
    }

    render(){
        return(
            <tr>
                <td>
                    {
                        this.state.renter !== null &&
                        <Link to={`/users/renters/profile/${this.state.renter.id}`}>{this.state.renter.username}</Link>
                    }
                </td>
                <td>{this.props.trip.startDate}</td>
                <td>{this.props.trip.endDate}</td>
                <td>{this.props.trip.fee}</td>
                <td>{this.props.trip.days}</td>
            </tr>
        )
    }
}
