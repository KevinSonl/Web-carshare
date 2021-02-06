import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";
import Nav1 from "./Nav1";
export default class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: "Renter",
            username: "",
            password: "",
            email:"",
            userService: new UserService(),
            canRegister:false,
            check:0
        }
        this.checkValid = this.checkValid.bind(this);
    }

    checkValid(user){
        if(user !== ""){
            this.setState({check:-1});
            return false;
        }
        this.setState({check:1});
        return true;
    }

    render(){
        return(
            <div>
                <Nav1/>
                <div className="container">
                    <div className="login-register-label">
                        <label className="login-register-label-text">Register</label>
                    </div>

                    {
                        this.state.check === -1&&
                        <div className="invalid-username">
                            <label className="invalid-username-text-invalid">Username exists</label>
                        </div>
                    }
                    {
                        this.state.check === 1&&
                        <div className="invalid-username">
                            <label className="invalid-username-text-valid">You can register</label>
                        </div>
                    }

                    <div className="form-group row login-register-information">
                        <label className="col-sm-3 col-form-label">Register as</label>
                        <div className="col-sm-9 type-select">
                            <select className="form-control" defaultValue={this.state.type}
                                    onChange={(event)=>{
                                        this.setState({type:event.target.value});
                                    }}>
                                <option value="Renter">Renter</option>
                                <option value="Owner">Owner</option>
                            </select>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Username</label>
                        <div className="col-sm-9">
                            <input className="username-input form-control" id="username-input"
                                   placeholder="Input Username" onChange={event =>
                                this.setState({username: event.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <input className="password-input form-control" id="password-input" type="password"
                                   placeholder="Input Password" onChange={event =>
                                this.setState({password: event.target.value})}/>
                        </div>
                    </div>

                    {
                        !this.state.canRegister&&
                        <div>
                            <button className="btn btn-primary register_btn" onClick={()=>{
                                let user = {username: this.state.username, password:this.state.password, email: this.state.email}
                                if(this.state.type === "Renter"){
                                    this.state.userService.findRenterByName(this.state.username).then(resp =>{
                                        if(this.checkValid(resp.data)){
                                            this.state.userService.createRenter(user).then(resp => {
                                                this.props.login(resp.data);
                                            });

                                            this.setState({canRegister:true});
                                        }
                                    })
                                }else if(this.state.type === "Owner"){
                                    this.state.userService.findOwnerByName(this.state.username).then(resp =>{
                                        if(this.checkValid(resp.data)){
                                            this.state.userService.createOwner(user).then(resp => {
                                                this.props.login(resp.data);
                                            })
                                            this.setState({canRegister:true});
                                        }
                                    })
                                }
                            }
                            }>Check Username
                            </button>
                        </div>
                    }
                    {
                        this.state.canRegister&&
                        <div>
                            <Link to="/">
                                <button className="btn btn-primary register-btn">
                                    Register as {this.state.type}
                                </button>
                            </Link>
                        </div>

                    }

                    <div className="row privacy-register">
                        <p className="privacy-register-text">Please read the privacy policy before register.</p>
                        <Link to={"/privacy"} >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>



        )
    }
}
