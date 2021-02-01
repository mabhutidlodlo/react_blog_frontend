import react ,{ Component } from "react";
import {Link} from 'react-router-dom';
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import '../css/edit_profile.css';
import axios from "axios";
import FormData from 'form-data';
import { toastOnError } from "../../utils/Utils";
import {toast,toastify} from 'react-toastify';
import "mdbreact/dist/css/mdb.css";
import { MDBInput } from "mdbreact";

export default class EditProfile extends Component {
  constructor(props){
    super(props);

    this.state = {

      picture_url : '',
      profile :{},
      image_file:null,
      about:'',
      username:''
    }
  }
  componentDidMount(){
    this.setState({profile:JSON.parse(localStorage.getItem('profile'))})
    this.setState({image_file:JSON.parse(localStorage.getItem('profile')).avatar})
    this.setState({about:JSON.parse(localStorage.getItem('profile')).about})
    this.setState({username:JSON.parse(localStorage.getItem('profile')).username})

}

  handleFileInput = (e)=>{
    let uri = URL.createObjectURL(e.target.files[0])
    this.setState({picture_url:uri})
    this.setState({image_file:e.target.files[0]})
    console.log(e.target.files[0])
  }

  handlePostClick=()=>{
    let form_data = new FormData;
    form_data.append('avatar',this.state.image_file);
    form_data.append('about',this.state.about);

    if (this.state.profile.username === this.state.username){
      
    }
    else{
   const data = {
      username : this.state.username
    }
    axios.put('/accounts/add_user/',data).
    then(response=>{
      if(response.status===201){
      }
    }).
    catch(error=>{
      toastOnError(error)
    })

   }
    axios.put('/accounts/profile/',form_data,{headers:{
      'content-type': "multipart/form-data"
    }}).
    then(response=>{
      if(response.status === 201){
        this.profileUpdate()
        toast.success('profile successfully updated!')
      }
    }).
    catch(error=>{
      toastOnError(error)
    })


  }
  profileUpdate=()=>{
    axios.get('/accounts/profile/',).
    then(response=>{

      localStorage.setItem('profile',JSON.stringify(response.data))
    })
  }

  handleTextOnchange=(event)=>{
    this.setState({[event.target.name]:event.target.value})

  }

  render(){
  return(
    <div className = "container">
      <h3 className = "p-2">Edit profile:</h3>
      <div className = "mt-5 border ">
        <div className="d-flex justify-content-center">
          <label className="mt-2">
            <input 
            name="image_file"
            style = {{dispalay:'none'}}
            type = "file" 
            onChange={this.handleFileInput}/>
            <img 
            src={this.state.picture_url ? this.state.picture_url : "https://iivent.herokuapp.com"+this.state.image_file}  
            style={{width: 200, height: 200, borderRadius: 200/ 2}}
             alt="user pic"
          />
          </label>
        </div>
        <div className="description">
        <div>
        <MDBInput 
          label="username"
          icon="pencil-alt"
          name = "username"
          max_length = '50'
          rows="2"
          value = {this.state.username}
          onChange={this.handleTextOnchange}

        />
        </div>
        <MDBInput label="about"
        type ="textarea"
        max_length="150"
        name = "about"
        icon="pencil-alt"
        rows = '2'
        value = {this.state.about}
        onChange={this.handleTextOnchange}
      />
        </div>
        <div className="d-flex p-2 justify-content-center">
          <button onClick={this.handlePostClick} type="button" className="btn1">
            update
          </button>
        </div>
      </div>
    </div>
   )
  }
}