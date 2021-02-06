import React, {Component} from 'react';
import {Link} from "react-router-dom";

class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vinValue: '',
            makeValue: '',
        };

        this.handleMakeChange = this.handleMakeChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);


    }

    componentDidMount() {
        this.setState({
                          vinValue: '',
                          makeValue: '',
                      })
        this.render()
    }


    handleMakeChange(event) {
        this.setState({makeValue: event.target.value});
    }

    handleVinChange(event) {
        this.setState({vinValue: event.target.value});
    }

    render() {
        return (
            <div className="container search-box">

                <div className="input-group form-inline m-2">
                    <input type="text" id="make-input-id" className="form-control"
                           onChange={this.handleMakeChange} placeholder="input make"/>
                    <div className="input-group-append pr-3">
                        <Link to={`/search/make/${this.state.makeValue}`}>
                            <button className="btn btn-primary search-icon" type="button" onClick= {() =>{
                                document.getElementById('make-input-id').value=''
                                this.setState({makeValue:''})
                            }}>
                                <i className="fa fa-search"></i>
                            </button>
                        </Link>
                    </div>

                    <input className="form-control" id="vin-input-id" type="text"
                           onChange={this.handleVinChange} placeholder="input vin"/>
                    <div className="input-group-append">
                        <Link to={`/search/vin/${this.state.vinValue}`}>
                            <button className="btn btn-primary search-icon" type="button" onClick= {() =>{
                                document.getElementById('vin-input-id').value=''
                                this.setState({vinValue:''})
                            }} >
                                <i className="fa fa-search"></i>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>

        );
    }
}

export default SearchBox;

