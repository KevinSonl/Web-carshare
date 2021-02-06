import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../../services/UserService";
import AllVehicles from "../VehicleListComponent/AllVehicles";
import NavUser1 from "../NavUser1";

export default class ProfileOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            userService: new UserService(),
            email: this.props.user.email,
            dateOfBirth: this.props.user.dateOfBirth,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            gender: this.props.user.gender,
        }
    }

    render() {
        return (
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>

                <div className="container">
                    <h5 className="text-muted font-weight-bold">Welcome
                        Back {this.props.user.username} !</h5>

                    {
                        !this.state.edit && <div>
                            <table className="table table-borderless">
                                <tbody>
                                <tr>
                                    <th scope="row">Username</th>
                                    <td>
                                        <label
                                            className="profile_username">{this.props.user.username}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Password</th>
                                    <td>
                                        <label
                                            className="profile_password">{this.props.user.password}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>
                                        <label
                                            className="profile_email">{this.props.user.email}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Date of Birth</th>
                                    <td>
                                        <label
                                            className="profile_dateOfBirth">{this.props.user.dateOfBirth}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">First Name</th>
                                    <td>
                                        <label
                                            className="profile_firstName">{this.props.user.firstName}</label>

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Last Name</th>
                                    <td>
                                        <label
                                            className="profile_lastName">{this.props.user.lastName}</label>

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Gender</th>
                                    <td>
                                        <label
                                            className="profile_gender">{this.props.user.gender}</label>

                                    </td>
                                </tr>

                                </tbody>
                            </table>
                            <button className="btn btn-primary edit_profile_btn" onClick={() => {
                                this.setState({edit: true})
                            }}>
                                Edit profile
                            </button>
                            <Link to="/profile/rent_history">
                                <button className="btn btn-primary view_rent_history_btn">
                                    View rent history
                                </button>
                            </Link>
                        </div>
                    }

                    {
                        this.state.edit && <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Username</label>
                                <input type="text" className="form-control" readOnly={true}
                                       id="exampleInputPassword1"
                                       placeholder={this.props.user.username}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="text" className="form-control" readOnly={true}
                                       id="exampleInputPassword1"
                                       placeholder={this.props.user.password}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       placeholder={this.props.user.email}
                                       onChange={event => this.setState(
                                           {email: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Date of Birth</label>
                                <input type="date" className="form-control"
                                       id="exampleInputPassword1"
                                       placeholder={this.props.user.dateOfBirth} onChange={event =>
                                    this.setState({dateOfBirth: event.target.value})}/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword1">First Name</label>
                                    <input type="text" className="form-control"
                                           id="exampleInputPassword1"
                                           placeholder={this.props.user.firstName}
                                           onChange={event =>
                                               this.setState({firstName: event.target.value})}/>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword1">Last Name</label>
                                    <input type="text" className="form-control"
                                           id="exampleInputPassword1"
                                           placeholder={this.props.user.lastName} onChange={event =>
                                        this.setState({lastName: event.target.value})}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Gender</label>
                                <select className="form-control"
                                        defaultValue={this.props.user.gender === "" ? "Female"
                                                                                    : this.props.user.gender}
                                        onChange={(event) => {
                                            this.setState({gender: event.target.value});
                                        }}>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={() => {
                                let newUser = this.props.user;
                                newUser.email = this.state.email;
                                newUser.dateOfBirth = this.state.dateOfBirth;
                                newUser.firstName = this.state.firstName;
                                newUser.lastName = this.state.lastName;
                                newUser.gender = this.state.gender;
                                this.state.userService.updateOwner(this.props.user.id, newUser)
                                    .then(resp => {
                                    });
                                this.setState({edit: false})
                            }}>
                                Confirm
                            </button>
                        </form>
                    }

                    <AllVehicles user={this.props.user}/>
                </div>


            </div>

        )
    }
}
