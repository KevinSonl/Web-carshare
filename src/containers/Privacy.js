import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import axios from "axios";
import HomePageNotLog from "../components/HomePageComponent/HomePageNotLog";
import LogInPage from "../components/LogInPage";
import HomePageOwner from "../components/HomePageComponent/HomePageOwner";
import HomePageRenter from "../components/HomePageComponent/HomePageRenter";
import Nav1 from "../components/Nav1";
import NavUser1 from "../components/NavUser1";

export default class Privacy extends React.Component{
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
                 <Nav1/>
                }
                {this.props.isLogged &&
                 <NavUser1 user={this.props.user} logout={this.props.logout}/>
                }
                <div className="container">
                    <div className="m-2 p-2">
                        <h2>Privacy Policy on our website</h2>
                        <h3>Information we collect</h3>
                        <h3>Things you create or provide to us</h3>
                        <p>When you register an account, you do not need to provide any private information.
                            However, if you want to use our service, You will need to provide us some private information</p>
                        <p>As a renter, you must provide your driving license. And if you want,
                            you can give us your email, birthday, gender and some other information you would like to share.</p>
                        <p>As a owner, you must provide the vin number of the cars you want to list on our website. And if you want,
                            you can give us your email, birthday, gender and some other information you would like to share.</p>
                        <h3>Information we collect as you use our services</h3>
                        <h5>Trip service</h5>
                        <p>We will collect the renters' birthday and gender when they book a car.
                            Also we will collect the corresponding car information
                            as well as the daily price and the length of the length of the trip.</p>
                        <h3>How we will handle these data</h3>
                        <p>We know that driving licenses are so private that others shouldn't know. So we will keep it only for website function.</p>
                        <p>Since the vin number of cars can be found across the internet and they don't contain private information like the owner's information,
                            so we will allow others to get the vin numbers.</p>
                        <p>For all other data except what we collect from the trip service, we will not share with third parties and keep them only on this website.</p>
                        <p>For the data we collect when you book a car,
                            we will work with third parties to analyze these data to find out
                            the preferences of different groups of people for vehicles and prices.
                            This will help us to improve the website</p>
                    </div>
                </div>

            </div>

        )
    }
}
