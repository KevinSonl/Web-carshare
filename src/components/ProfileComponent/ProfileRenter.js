import React from 'react';

import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import axios from "axios";
import UserService from "../../services/UserService";
import NavUser1 from "../NavUser1";

export default class ProfileRenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            edit:false,
            userService: new UserService(),
            email:this.props.user.email,
            dateOfBirth:this.props.user.dateOfBirth,
            firstName:this.props.user.firstName,
            lastName:this.props.user.lastName,
            gender:this.props.user.gender,
            license:this.props.user.license,
        }
    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <div className="container">
                    <h5 className="text-muted font-weight-bold">Welcome Back {this.props.user.username} !</h5>
                    <table className="table table-borderless">
                        <tbody>
                        <tr>
                            <th scope="row">Username</th>
                            <td>
                                <label className="profile_username">{this.props.user.username}</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Password</th>
                            <td>
                                <label className="profile_password">{this.props.user.password}</label>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">Email</th>
                            <td>
                                {
                                    !this.state.edit &&
                                    <label className="profile_email">{this.props.user.email}</label>
                                }
                                {
                                    this.state.edit &&
                                    <input className="profile_edit_email" id="profile_edit_email" type="email"
                                           placeholder={this.props.user.email} onChange={event =>
                                        this.setState({email: event.target.value})}/>

                                }
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">Date of Birth</th>
                            <td>
                                {
                                    !this.state.edit &&
                                    <label className="profile_dateOfBirth">{this.props.user.dateOfBirth}</label>
                                }
                                {
                                    this.state.edit &&
                                    <input className="profile_edit_dateOfBirth" id="profile_edit_dateOfBirth" type="date"
                                           placeholder={this.props.user.dateOfBirth} onChange={event =>
                                        this.setState({dateOfBirth: event.target.value})}/>

                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">First Name</th>
                            <td>
                                {
                                    !this.state.edit &&
                                    <label className="profile_firstName">{this.props.user.firstName}</label>
                                }
                                {
                                    this.state.edit &&
                                    <input className="profile_edit_firstName" id="profile_edit_firstName"
                                           placeholder={this.props.user.firstName} onChange={event =>
                                        this.setState({firstName: event.target.value})}/>

                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Last Name</th>
                            <td>
                                {
                                    !this.state.edit &&
                                    <label className="profile_lastName">{this.props.user.lastName}</label>
                                }
                                {
                                    this.state.edit &&
                                    <input className="profile_edit_lastName" id="profile_edit_lastName"
                                           placeholder={this.props.user.lastName} onChange={event =>
                                        this.setState({lastName: event.target.value})}/>

                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Gender</th>
                            <td>
                                {
                                    !this.state.edit &&
                                    <label className="profile_gender">{this.props.user.gender}</label>
                                }
                                {
                                    this.state.edit &&
                                    <select defaultValue={this.props.user.gender === "" ? "Female":this.props.user.gender}
                                            onChange={(event)=>{
                                                this.setState({gender:event.target.value});
                                            }}>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Other">Other</option>
                                    </select>

                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">License</th>
                            <td>
                                {
                                    !this.state.edit &&
                                    <label className="profile_license">{this.props.user.license}</label>
                                }
                                {
                                    this.state.edit &&
                                    <input className="profile_edit_license" id="profile_edit_license"
                                           placeholder={this.props.user.license} onChange={event =>
                                        this.setState({license: event.target.value})}/>

                                }
                            </td>
                        </tr>


                        </tbody>
                    </table>
                    <div className="form-group row profile-edit-btn">
                        {
                            !this.state.edit &&
                            <div className="col-4">
                                <button className="btn btn-primary edit-profile-btn" onClick={() =>{
                                    this.setState({edit:true})
                                }}>
                                    Edit profile
                                </button>
                            </div>

                        }
                        {
                            !this.state.edit &&
                            <div className="col-4">
                                <Link to="/profile/trip_history">
                                    <button className="btn btn-primary view-trip-history-btn">
                                        Trip History
                                    </button>
                                </Link>
                            </div>

                        }
                        {
                            !this.state.edit &&
                            <div className="col-4">
                                <Link to="/profile/like_list">
                                    <button className="btn btn-primary view-like-list-btn">
                                        Like List
                                    </button>
                                </Link>
                            </div>

                        }
                        {
                            this.state.edit &&
                            <div className="col-4">
                                <button className="btn btn-primary confirm-profile-btn" onClick={() =>{
                                    let newUser = this.props.user;
                                    newUser.email=this.state.email;
                                    newUser.dateOfBirth = this.state.dateOfBirth;
                                    newUser.firstName = this.state.firstName;
                                    newUser.lastName = this.state.lastName;
                                    newUser.gender = this.state.gender;
                                    newUser.license = this.state.license;
                                    this.state.userService.updateRenter(this.props.user.id,newUser).then(resp =>{});
                                    this.setState({edit:false})
                                }}>
                                    Confirm
                                </button>
                            </div>

                        }
                    </div>

                </div>

            </div>

        )
    }
}
