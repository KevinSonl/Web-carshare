import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import NavUser1 from "../NavUser1";

class LikeListComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userService: new UserService(),
            likeList :null
        }
        this.removeCar = this.removeCar.bind(this);
    }

    componentDidMount() {
        const userService = new UserService();
        userService.findLikeListByUser(this.props.user.id).then(resp =>{
            this.setState({likeList:resp.data})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.likeList === null){
            const userService = new UserService();
            userService.findLikeListByUser(this.props.user.id).then(resp =>{
                this.setState({likeList:resp.data})
            })
        }
    }

    removeCar(vid){
        let vehicleId = '' + vid;
        let newUser = this.props.user;
        let s = this.props.user.likeList;
        const ids = s.split('/');
        const result = ids.filter(word => word !== vehicleId);
        newUser.likeList = result.join('/');
        this.state.userService.updateRenter(this.props.user.id, newUser).then(resp =>{
            this.state.userService.findLikeListByUser(this.props.user.id).then(resp =>{
                this.setState({likeList:resp.data})
            })
        });
    }

    render() {
        return (
            <div>
                <NavUser1 user={this.props.user} logout={this.props.logout}/>
                <div className="container">
                    {
                        this.state.likeList !== null &&
                        <table className="table table-borderless">
                            <thead className="border-bottom">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Make</th>
                                <th scope="col">Model</th>
                                <th scope="col">Detail</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.likeList.map(function(item, idx){
                                return (
                                    <tr key={idx}>

                                        <th scope="row">{idx+1}</th>
                                        <td>{item.make}</td>
                                        <td>{item.model}</td>
                                        <td>
                                            <Link to={`/details/${item.id}`}>
                                                See details
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    }
                </div>


            </div>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    likeCars: state.profileReducer.likeCars
})
const propertyToDispatchMapper = (dispatch) => ({

})

const LikeList = connect(stateToPropertyMapper, propertyToDispatchMapper)(LikeListComponent)

export default LikeList
