import {useState, useEffect} from "react"
import { propTypes } from "react-bootstrap/esm/Image"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, NavLink, Link} from "react-router-dom";
import link from "react-router-dom"
import { login } from "../login/LoginActions"
import { Container,NavDropdown, Nav, } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import '../css/navBar.css';

const NavBar = (props)=>{
  const [user,setUser] = useState({});
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')))
    console.log(user)

  },[localStorage.getItem('profile')])

  const handleClickProfile=()=>{
    props.history.push('/edit_profile');
  }


  return(
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">!vent</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      {props.location.pathname === '/create_post'? "" :
      <div className="mr-4">
          <NavLink style = {{color:'#33B0AD'}} to="/create_post">Post</NavLink>
          </div>
         }
        
        {props.location.pathname === '/dashboard'? "" :
          <div className="mr-4">
            <NavLink to="/dashboard" style = {{color:'#33B0AD'}}>Dashboard</NavLink>
          </div>
         }
            {props.location.pathname === '/home'? "" :
          <div className="mr-4">
           <NavLink to="/home" style = {{color:'#33B0AD'}}>Home</NavLink>
          </div>
         }


          <NavDropdown eventKey='3'  
            title={
           <img 
            src={"https://iivent.herokuapp.com"+user.avatar}  
            style={{width: 30, height: 30, borderRadius: 30/ 2}}
             alt="user pic"
          />} 
          className="mr-3" id="basic-nav-dropdown">
            <NavDropdown.Item onClick = {handleClickProfile}>profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item class="fas fa-sign-out-alt" title="logout">logout</NavDropdown.Item>
          </NavDropdown>

      </Navbar.Collapse>
    </Navbar>

  )}
NavBar.propTypes = {
    login: PropTypes.func.isRequired,
    auth:  PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
    login
  })(withRouter(NavBar));