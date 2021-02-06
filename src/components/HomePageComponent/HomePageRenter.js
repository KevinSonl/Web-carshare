import React from 'react';
import HomePageMainRenter from "./HomePageMainRenter";
import NavUser1 from "../NavUser1";

export default class HomePageRenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <HomePageMainRenter isLogged={this.props.isLogged}/>
            </div>

        )
    }
}
