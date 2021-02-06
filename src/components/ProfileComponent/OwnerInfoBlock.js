import React, {Component} from 'react';
import {Link} from "react-router-dom";

class OwnerInfoBlock extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <div className="row">
                    <h6 className="text-muted col-2 font-weight-bold">Owner: </h6>
                    <div className="table col-4">
                        <h4 className="my-2 font-weight-bold">{this.props.owner.firstName} {this.props.owner.lastName} </h4>
                        <h5 className="font-weight-bold text-muted">gender: {this.props.owner.gender}</h5>
                        <h5 className="font-weight-bold text-muted">rate: {this.props.owner.rate}</h5>
                    </div>

                </div>
                <div className="row">
                    <h6 className="text-muted col-2 font-weight-bold">Contract: </h6>
                    <div className="table col-4">
                        <h5 className="font-weight-bold text-muted">email: {this.props.owner.email}</h5>
                        <Link to={`/users/owners/profile/${this.props.owner.id}`}>
                            view profile
                        </Link>
                    </div>
                </div>


            </div>
        );
    }
}
export default OwnerInfoBlock;
