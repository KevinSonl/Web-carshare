import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import '../css/style.css';
import "font-awesome/css/font-awesome.css";
import HomePage from "./HomePage";
import LogInPage from "../components/LogInPage";
import RegisterPage from "../components/RegisterPage";
import UserProfile from "./UserProfile";
import {combineReducers, createStore} from "redux";
import carsReducer from "../reducers/carsReducer";
import carDetailReducer from "../reducers/carDetailReducer";
import {Provider} from "react-redux";
import CarDetail from "./CarDetail";
import PublicProfileOwner from "../components/ProfileComponent/PublicProfileOwner";
import tripsReducer from "../reducers/tripsReducer";
import TripListRenter from "../components/TripComponent/TripListRenter";
import CreateTrip from "../components/TripComponent/CreateTrip";
import profileReducer from "../reducers/profileReducer";
import LikeList from "../components/VehicleListComponent/LikeList";
import VehicleEdit from "../components/VehicleListComponent/VehicleEdit";
import TripListOwner from "../components/TripComponent/TripListOwner";
import PublicProfileRenter from "../components/ProfileComponent/PublicProfileRenter";
import Search from "./Search";
import Privacy from "./Privacy";


const rootReducer = combineReducers({
                                        carsReducer: carsReducer,
                                        carDetailReducer: carDetailReducer,
                                        tripsReduce:tripsReducer, profileReducer: profileReducer

                                    })

const store=createStore(rootReducer);

export default class WebsiteContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogged:false,
            currentUser:null,
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }


    login(user){
        this.setState({isLogged:true,currentUser:user})
    }

    logout(){
        this.setState({isLogged:false,currentUser:null})
    }



    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Route path="/"
                           exact = {true}
                           render={() => <HomePage isLogged={this.state.isLogged} user={this.state.currentUser} logout={this.logout}/>}/>
                    <Route path="/login"
                           exact = {true}
                           render={() => <LogInPage login={this.login}/>}/>
                    <Route path="/register"
                           exact = {true}
                           render={() => <RegisterPage login={this.login}/>}/>
                    <Route path="/profile"
                           exact = {true}
                           render={() => <UserProfile user={this.state.currentUser} logout={this.logout}/>}/>
                    <Route path="/privacy"
                           exact = {true}
                           render={() => <Privacy user={this.state.currentUser} logout={this.logout}/>}/>
                    <Route path={["/search", "/search/make/:make", "/search/make/" , "/search/vin/:vin", "/search/vin/"]}
                           exact = {true}
                           render={(props) => <Search {...props} isLogged={this.state.isLogged} user={this.state.currentUser} logout={this.logout}/>}/>
                    <Route path="/profile/trip_history"
                           exact = {true}
                           render={() => <TripListRenter user={this.state.currentUser} logout={this.logout}/>}/>
                    <Route path="/profile/like_list"
                           exact = {true}
                           render={() => <LikeList user={this.state.currentUser} logout={this.logout}/>}/>
                    <Route path="/profile/rent_history"
                           exact = {true}
                           render={() => <TripListOwner user={this.state.currentUser} logout={this.logout}/>}/>
                    <Route path = "/cars/profile/:carId"
                           exact = {true}
                           render={(props) => <VehicleEdit
                               {...props}
                               carId={props.match.params.carId}
                               logout={this.logout}
                               user={this.state.currentUser}/>}/>
                    <Route path = "/details/:carId"
                           exact = {true}
                           render={(props) => <CarDetail
                               {...props}
                               carId={props.match.params.carId}
                               isLogged={this.state.isLogged}
                               login={this.login}
                               logout={this.logout}
                               user={this.state.currentUser}/>}/>
                    <Route path = "/users/owners/profile/:ownerId"
                           exact = {true}
                           render={(props) => <PublicProfileOwner
                               {...props}
                               ownerId={props.match.params.ownerId}
                               isLogged={this.state.isLogged}
                               logout={this.logout}
                               user={this.state.currentUser}/>}/>
                    <Route path = "/users/renters/profile/:renterId"
                           exact = {true}
                           render={(props) => <PublicProfileRenter
                               {...props}
                               renterId={props.match.params.renterId}
                               logout={this.logout}
                               user={this.state.currentUser}/>}/>
                    <Route path = "/cars/order/:carId"
                           exact = {true}
                           render={(props) => <CreateTrip
                               {...props}
                               carId={props.match.params.carId}
                               logout={this.logout}
                               user={this.state.currentUser}/>}/>
                </Router>
            </Provider>
        )
    }
}
