import React from 'react';
import AllVehicles from "../VehicleListComponent/AllVehicles";
import Jumbotron from "../Jumbotron";
import NavUser1 from "../NavUser1";

export default class HomePageOwner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <Jumbotron/>
                <div className="container">
                    <AllVehicles user={this.props.user}/>
                </div>

            </div>

        )
    }
}
