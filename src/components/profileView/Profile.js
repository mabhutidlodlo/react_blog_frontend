import Axios from "axios";
import react ,{useState, useEffect}from "react";
import '../css/profileView.css';

export default function Profile(props){
const [ info ,setInfo] = useState({});
const [profile, setProfile] = useState({})

  useEffect(()=>{
   const id = props.match.params.id
    const getProfile= async()=>{
      const res = await Axios.get(`/accounts/info/${id}`,)
      setInfo(res.data)
      setProfile(res.data.profile)
      console.log(res.data)
    }
    getProfile()
  },[])

  return(
    <div className = "container">
      <h3 className = "mt-3">Profile:</h3>
      <div id="profile_view_holder" className = 'mt-2 border'>
        <div className= "image_holder d-flex justify-content-center">
        <img 
          src={"https://iivent.herokuapp.com"+ profile.avatar}  
          style={{width: 200, height: 200, borderRadius: 200/2}} 
        />
      </div>
     <div className="text text-center">{profile.username}</div>
        <div className="text text-center">{profile.about}</div>
          <div className=" text border d-flex icons">
            <div className="flex-fill">
            <i class="far fa-newspaper fa-lg">{info.num_post}</i>
            </div>
            <div className="flex-fill">
              <i class="far fa-thumbs-up fa-lg">{info.average_likes}</i>
            </div>
            <div className="flex-fill">
            <i class="far fa-comments fa-lg">{info.comments}</i>       
            </div>
          </div>
        </div>
      </div>
    )

}