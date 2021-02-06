
import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";
import Nav1 from "./Nav1";

export default class LogInPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: "Renter",
            username: "",
            password: "",
            userService: new UserService(),
            canLog:false,
            userExist:0,
            passwordValid:0
        }
    }

    checkUser(user){
        // console.log(user);
        if(user === ""){
            this.setState({userExist:-1,passwordValid:0})
            return false;
        }
        if(user.password !== this.state.password){
            this.setState({userExist:1,passwordValid:-1})
            return false;
        }
        this.setState({userExist:1,passwordValid:1})
        this.props.login(user);
        return true;
    }

    render(){
        return(
            <div>
                <Nav1/>
                <div className="container">
                    <div className="login-register-label">
                        <label className="login-register-label-text">Login</label>
                    </div>

                    {
                        this.state.userExist === -1&&
                        <div className="invalid-username">
                            <label className="invalid-username-text-invalid">Invalid username</label>
                        </div>
                    }
                    {
                        this.state.passwordValid === -1&&
                        <div className="invalid-username">
                            <label className="invalid-username-text-invalid">Wrong password</label>
                        </div>
                    }

                    {
                        this.state.passwordValid === 1&&
                        <div className="invalid-username">
                            <label className="invalid-username-text-valid">You can login</label>
                        </div>
                    }

                    <div className="form-group row login-register-information">
                        <label className="col-sm-3 col-form-label">Log in as</label>
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
                        !this.state.canLog&&
                        <div>
                            <button className="btn btn-primary login_btn" onClick={()=>{
                                console.log(this.state.type)
                                if(this.state.type === "Renter"){
                                    this.state.userService.findRenterByName(this.state.username).then(resp =>{
                                        if(this.checkUser(resp.data)) {
                                            this.setState({canLog: true})
                                        }
                                    })
                                }else if(this.state.type === "Owner"){
                                    this.state.userService.findOwnerByName(this.state.username).then(resp =>{
                                        if(this.checkUser(resp.data)) {
                                            this.setState({canLog: true})
                                        }
                                    })
                                }
                            }
                            }>Login
                            </button>

                        </div>

                    }
                    {
                        this.state.canLog&&
                        <div>
                            {
                                this.state.canLog &&
                                <div>
                                    <Link to="/">
                                        <button className="btn btn-primary register-btn">
                                            Login as {this.state.type}
                                        </button>
                                    </Link>
                                </div>

                            }
                        </div>
                    }
                </div>
            </div>

        )
    }
}
