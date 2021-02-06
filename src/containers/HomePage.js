import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import HomePageNotLog from "../components/HomePageComponent/HomePageNotLog";
import HomePageOwner from "../components/HomePageComponent/HomePageOwner";
import HomePageRenter from "../components/HomePageComponent/HomePageRenter";

export default class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        // console.log(this.props.user);
    }

    render(){
        return(
            <div>
                {!this.props.isLogged &&
                 <HomePageNotLog isLogged={this.props.isLogged}/>
                }
                {this.props.isLogged && this.props.user.type === "Renter" &&
                 <HomePageRenter user={this.props.user} logout={this.props.logout} isLogged={this.props.isLogged}/>
                }
                {this.props.isLogged && this.props.user.type === "Owner" &&
                 <HomePageOwner user={this.props.user} logout={this.props.logout} isLogged={this.props.isLogged}/>
                }
            </div>

        )
    }
}
