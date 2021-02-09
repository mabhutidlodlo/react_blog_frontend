import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Container,
    Button,
    Row,
    Col,
    Form,
    FormControl
  } from "react-bootstrap";

import { signupNewUser } from "./SignupActions"; 
import { toast } from "react-toastify";

class SignUP extends Component{
  constructor(props){
    super(props);
    this.state = {

      username:"",
      password:"",
      first_name:"",
      last_name:"",
      errors:{

        username:"",
        password:"",
        first_name:"",
        last_name:""
      }

    }

  }

  onChange = e=>{
    const {name,value} = e.target
    let errors = this.state.errors
    switch(name){

      case "username":
        errors.username = value.length > 5 ? "" : "username is too short"
        break

      case "password":

        errors.password = value.length >= 8 ? "" : "password is too short"
        break

      case "first_name":

        errors.first_name = value.length > 1 ? "" : "first name is too short"
        break

      case "last_name":

        errors.last_name = value.length > 1 ? ""  : "last name is too short"
        break

      default:

       break

    }
    this.setState({errors,[name]:value})
  }

  validateForm = (errors)=>{

    let valid = true;
    Object.values(errors).forEach(

      (val) => val.length > 0 && (valid = false)

    );
    return valid;

  }

  onSignupClick = ()=>{

    if(this.validateForm(this.state.errors)){

      const userData = {

        username:this.state.username,
        password:this.state.password,
        first_name:this.state.first_name,
        last_name:this.state.last_name

      };
      this.props.signupNewUser(userData);
    }
    else{

      toast.error("make sure all the fields are valid!")
    }

  }
render(){

  return(

    <div className="container" id="container">

      <div className="inner.container">

        <div className="contents">
        <h3>Sign up</h3>
        <Form>

          <Form.Group controlId="usernameId">
          <Form.Label>Username</Form.Label>
            <Form.Control
            isInvalid={this.props.createUser.usernameError}
            type="text"
            name="username"
            placeholder="Enter user name"
            value={this.state.username}
            onChange={this.onChange}
            required
            />
            {this.state.errors.username.length >0 &&
            <span className = "error">{this.state.errors.username}</span>
            }

          </Form.Group>
          <Form.Group controlId="passwordId">

            <Form.Label>password</Form.Label>
            <Form.Control
            isInvalid={this.props.createUser.passwordError}
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.password}
            onChange={this.onChange}
            required
            />
            {this.state.errors.password.length >0 &&
            <span className = "error">{this.state.errors.password}</span>
            }

          </Form.Group>
          <Form.Group controlId="first_nameId">

            <Form.Label>First name</Form.Label>
            <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter first name"
            value={this.state.first_name}
            onChange={this.onChange}
            />
            {this.state.errors.first_name.length > 0 &&
            <span className = "error">{this.state.errors.first_name}</span>
            }

          </Form.Group>
          <Form.Group controlId="last_nameId">

            <Form.Label>Last name</Form.Label>
            <Form.Control
            isInvalid={this.props.createUser.last_nameErr}
            type="text"
            name="last_name"
            placeholder="Enter last name"
            value={this.state.last_name}
            onChange={this.onChange}
            required
            />
            {this.state.errors.last_name.length > 0  &&
            <span className = "error">{this.state.errors.last_name}</span>
            }

          </Form.Group>

        </Form>
        <button type="button" className="btn1" onClick={this.onSignupClick}>

          Sign up

        </button>
        <p className="mt-2">

          Already have account? <Link className="link" to="/login">Login</Link>

        </p>

      </div>

    </div>

  </div>
  )};
}
SignUP.propTypes = {

  signupNewUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createUser: state.createUser
});

export default connect(mapStateToProps, {
  signupNewUser
})(withRouter(SignUP));
