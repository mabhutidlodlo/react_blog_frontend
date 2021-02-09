import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { login } from "./LoginActions.js";
import './../css/login.css';
import { toast } from "react-toastify";

class Login extends Component{

  constructor(props){
    super(props);
    this.state ={

      username:"",
      password:"",
      errors: {

        username: '',
        password: '',
      }
    }
  }
  onChange = e =>{

    const{name,value} = e.target
    let errors = this.state.errors
    switch(name){

      case 'username':

        errors.username = value.length > 5 ? '' : "username too short"
        break

      case 'password':

        errors.password = value.length >= 8 ? '' : "password not valid"
        break

      default:

        break

    }
    this.setState({errors,[name]:value})

  }


  validateForm = (errors) => {

    let valid = true;
    Object.values(errors).forEach(

      (val) => val.length > 0 && (valid = false)

    );
    return valid;
  }


  onLoginClick = (e)=>{

    e.preventDefault();
    if(this.validateForm(this.state.errors)){

      const userData = {

        username: this.state.username,
        password: this.state.password
      };
      this.props.login(userData, "/dashboard");

    }
    else{

      toast.error('check all fields are filled!')
    }

  };

  render(){

    return(

      <div className = "container" id="container">

        <div className="inner.contain">

          <div className = "contents">

            <h3>Login</h3>
            <Form className="form">

              <Form.Group controlId="usernameId">

                <Form.Label>Username</Form.Label>
                <Form.Control
                type="text"
                name="username"
                placeholder="Enter user name"
                value={this.state.username}
                onChange={this.onChange}
                required
                />
                {this.state.errors.username.length > 0 &&

                  <span className='error'>{this.state.errors.username}</span>

                }

              </Form.Group>

            <Form.Group controlId="passwordId">

              <Form.Label>Password</Form.Label>

                <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.onChange}
                required
                />
                {this.state.errors.password.length > 0 &&

                  <span className='error'>{this.state.errors.password}</span>

                }

              </Form.Group>

            </Form>
            <button onClick={this.onLoginClick} type="button" className="btn1">

              Login

            </button>
            <p className="mt-2">

              Don't have account? <Link className = "link" to="/signup">Signup</Link>

            </p>

          </div>

        </div>

      </div>
    )
  }
}

Login.propTypes = {

    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(mapStateToProps, {
    login
  })(withRouter(Login));
