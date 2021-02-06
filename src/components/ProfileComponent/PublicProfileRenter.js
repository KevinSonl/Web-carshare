import React from 'react';

import UserService from "../../services/UserService";
import NavUser1 from "../NavUser1";

export default class PublicProfileRenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userService : new UserService(),
            renter:null
        }
    }

    componentDidMount() {
        this.state.userService.findRenterById(this.props.renterId).then(resp => {
            this.setState({renter:resp.data})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.userService.findRenterById(this.props.renterId).then(resp => {
            this.setState({renter:resp.data})
        })
    }

    render(){
        return(
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <div className="container">
                    {
                        this.state.renter !== null &&
                        <div className="public_renter_profile">
                            <h5 className="p-2 text-muted font-weight-bolder font-italic">Renter Profile </h5>
                            <table className="table table-borderless">
                                <tbody>
                                <tr>
                                    <th scope="row">Username</th>
                                    <td>
                                        <label className="profile_username">{this.state.renter.username}</label>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Gender</th>
                                    <td>
                                        <label className="profile_gender">{this.state.renter.gender}</label>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Date of Birth</th>
                                    <td>
                                        <label className="profile_birthday">{this.state.renter.dateOfBirth}</label>
                                    </td>
                                </tr>

                                </tbody>
                            </table>

                        </div>
                    }

                </div>
            </div>

        )
    }
}
