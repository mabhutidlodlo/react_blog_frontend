import {useState, useEffect} from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, NavLink, Link} from "react-router-dom";
import link from "react-router-dom"
import { login } from "../login/LoginActions"
import { Container,NavDropdown, Nav, } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import '../css/navBar.css';
import Websocket from 'react-websocket';
import {toast} from 'react-toastify';
import { MDBIcon } from "mdbreact";
import {unsetCurrentUser,logout} from '../login/LoginActions.js';
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";
import github from './github.png'

const NavBar = (props)=>{

  const [user,setUser] = useState({});
  const [notifications, setNotifications] = useState(0)

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')))

  },[localStorage.getItem('profile')])


  const handleClickProfile=()=>{
    props.history.push('/edit_profile');
  }

  const handleData = (e)=>{
    console.log(e)

    if(e){

    e ==='{"message": "new article"}' && setNotifications(notifications +1);
    if (props.location.pathname === '/subscribed'){
      setNotifications(0)
      toast('new article')
    }
  }
}

  const logoutClickHandler = ()=>{
    console.log('here')
    props.logout()
  }

  return(
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">!vent</Navbar.Brand>
      <Navbar.Toggle />

      { props.isAuthenticated ?
      <Navbar.Collapse className="justify-content-end">

      <NavLink to = '/subscribed'className = " notification mr-4" >
        <MDBIcon far style={{color:'#33B0AD'}}icon="bell" size = "1.8x"/>{notifications>0 ? notifications :''}
      </NavLink>

      {  props.location.pathname === '/create_post'  ? "" :
          <div className="mr-4">
          <NavLink style = {{color:'#33B0AD'}} to="/create_post">Post</NavLink>
          </div>
         }

        {  props.location.pathname === '/dashboard'? "" :

          <div className="mr-4">
            <NavLink to="/dashboard" style = {{color:'#33B0AD'}}>Dashboard</NavLink>
          </div>
         }
            {props.location.pathname === '/home'? "" :
          <div className="mr-4">
           <NavLink to="/home" style = {{color:'#33B0AD'}}>Home</NavLink>
          </div>
         }
         <Websocket url={'wss://iivent.herokuapp.com/ws/notify/'+JSON.parse(localStorage.getItem('profile')).id+'/'+JSON.parse(localStorage.getItem('token'))+'/'}
             onOpen={e=>handleData(e)}
             onMessage = {e=>handleData(e)}
             />

          <NavDropdown eventKey='3'
            title={
           <img
            src={user.avatar}
            style={{width: 30, height: 30, borderRadius: 30/ 2}}
             alt="user pic"
          />}
          className="mr-3" id="basic-nav-dropdown">
            <NavDropdown.Item onClick = {handleClickProfile}>profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item class="fas fa-sign-out-alt" title="logout" onClick={logoutClickHandler}>logout</NavDropdown.Item>
          </NavDropdown>

      </Navbar.Collapse>
      :
      <NavLink className="content-justify-end ml-5"to="/login" style = {{color:'#33B0AD'}}>login</NavLink>

    }
    </Navbar>

  )}
NavBar.propTypes = {
    login: PropTypes.func.isRequired,
    auth:  PropTypes.object.isRequired,
    isAuthenticated:PropTypes.bool.isRequired

}
const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps, {
    login,logout
  })(withRouter(NavBar));
