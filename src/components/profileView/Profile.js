import axios from "axios";
import react ,{useState, useEffect}from "react";
import '../css/profileView.css';
import {Websocket} from 'react-websocket'


export default function Profile(props){

  const [ info ,setInfo] = useState({});
  const [profile, setProfile] = useState({})
  const [websocket,setSocket] = useState('')

  useEffect(()=>{

    setSocket(new WebSocket('ws://iivent.herokuapp.com/ws/notify/'+JSON.parse(localStorage.getItem('profile')).id+'/'+JSON.parse(localStorage.getItem('token'))+'/'))
    getProfile()
  },[])

  const getProfile=()=>{

    const id = props.match.params.id
    const getProfile= async()=>{

       const res = await axios.get(`/accounts/info/${id}`,)
       setInfo(res.data)
       setProfile(res.data.profile)
       console.log(res.data)
     }
     getProfile()
  }
  const handleFollowClick=(id,command,username)=>{

    axios.post(`/accounts/follow/${id}`).
    then(response=>{

      getProfile()
      websocket.send(
          {'command':command,
          'username':username
        }
        )
    }).
    catch(e=>{
      console.log(e)
    })

  }
  return(
    <div className = "container">
      <h3 className = "mt-3">Profile:</h3>
      <div id="profile_view_holder" className = 'mt-2 border'>
      {profile && JSON.parse(localStorage.getItem('profile')).username === profile.username ? ""
        :
        <div className = "d-flex">

          {info.following ===true ?

            <button
              className="m-2 text-muted"
              id='follow-unfollow'
              title = "unfollow"
              style={{border:'1.5px','border-radius':'4px',height:'30px','background-color':'#33B0AD'}}
              onClick ={e=>handleFollowClick(profile.id,'unfollow',profile.username)}
              >unfollow</button>
          :

            <button
              className=" m-2 text-muted" id='follow-unfollow'
              title = "unfollow"
              style={{border:'1.5px','border-radius':'4px',height:'30px','background-color':'#33B0AD'}}
              onClick ={e=>handleFollowClick(profile.id,'follow',profile.username)}
              >follow</button>

          }
          <p className="m-2 text-muted">following {info.num_following} </p>
          <p className="m-2 text-muted">followers {info.num_followers} </p>

        </div>
      }
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
