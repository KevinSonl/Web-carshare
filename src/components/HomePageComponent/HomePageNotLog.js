import React from 'react';
import HomePageMainRenter from "./HomePageMainRenter";
import Nav1 from "../Nav1";

export default class HomePageNotLog extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Nav1/>
                <HomePageMainRenter isLogged={this.props.isLogged}/>
            </div>

        )
    }
}
