import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import axios from "axios";
import HomePageNotLog from "../components/HomePageComponent/HomePageNotLog";
import LogInPage from "../components/LogInPage";
import HomePageOwner from "../components/HomePageComponent/HomePageOwner";
import HomePageRenter from "../components/HomePageComponent/HomePageRenter";
import ProfileRenter from "../components/ProfileComponent/ProfileRenter";
import ProfileOwner from "../components/ProfileComponent/ProfileOwner";

export default class UserProfile extends React.Component{
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

                {this.props.user.type === "Renter" &&
                 <ProfileRenter user={this.props.user} logout={this.props.logout}/>
                }
                {this.props.user.type === "Owner" &&
                 <ProfileOwner user={this.props.user} logout={this.props.logout}/>
                }

            </div>

        )
    }
}
