import React from 'react';

import UserService from "../../services/UserService";
import CarsByOwner from "./CarsByOwner";
import NavUser1 from "../NavUser1";
import Nav1 from "../Nav1";

export default class PublicProfileOwner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userService : new UserService(),
            owner:null
        }

    }

    componentDidMount() {
        const userService = new UserService();
        const ownerId = this.props.match.params.ownerId;
        userService.findOwnerById(ownerId).then(resp => {
            this.setState({owner:resp.data})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const userService = new UserService();
        if(this.state.owner === null){
            userService.findOwnerById(this.props.match.params.ownerId).then(resp => {
                this.setState({owner:resp.data});
            })
        }
    }

    render(){
        return(
            <div>
                {
                    this.props.isLogged&&
                    <NavUser1 user={this.props.user} logout={this.props.logout}/>
                }
                {
                    !this.props.isLogged&&
                    <Nav1/>
                }

                <div className="container">
                    {
                        this.state.owner !== null &&
                        <div className="public_owner_profile">
                            <h5 className="p-2 text-muted font-weight-bolder font-italic">Owner Profile </h5>
                            <table className="table table-borderless">
                                <tbody>
                                <tr>
                                    <th scope="row" >Username</th>
                                    <td>
                                        <label className="profile_username">{this.state.owner.username}</label>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Gender</th>
                                    <td>
                                        <label className="profile_gender">{this.state.owner.gender}</label>
                                    </td>
                                </tr>

                                </tbody>
                            </table>

                            <h5 className="p-2 text-muted font-weight-bolder font-italic">Vehicles From This Owner </h5>
                            <CarsByOwner ownerId={this.state.owner.id}/>
                        </div>
                    }

                </div>


            </div>

        )
    }
}
