import react,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import { toastOnError } from '../../utils/Utils';

export default function Dashboard(props){
  const [myArticles, setArticles] = useState([]);
  const [profile, setProfile] =useState({});

  useEffect(()=>{
    const getData= async()=>{
      
      const  response = await axios.get('/blog/myPost',)
      setArticles(response.data)
      setProfile(JSON.parse(localStorage.getItem('profile')))
      console.log(profile)

    }

    getData();

  },[])


  useEffect(()=>{
  
    const getProfile= async()=>{
      const id = JSON.parse(localStorage.getItem('profile')).id
      const  response = await axios.get(`/accounts/info/${id}`,)
      setProfile(response.data)
      console.log(profile)

    }

    getProfile();

  },[])

  const clickUpdateHandler=(slug)=>{
    props.history.push(`/create_post/${slug}`)
  }

  const deleteHandler = (slug, article)=>{
    axios.delete(`/blog/my_article/${slug}`,).
    then(response=>{
      toast.success('successfully deleted article')
      setArticles(myArticles.filter(item=> item != article ))
    }).
    catch(error=>{
      toastOnError(error);
    })

  }

  const handleImageClick =(slug)=>{
   
    props.history.push(`/article/${slug}`)
  }
  
  return(

    <div className="container">

    <h3 className = "mt-2">Your dashboard:</h3>
        <div className="col-md-10">
        <div className="text-muted mt-3 mb-3">stats:</div>
        <div style={{width:"100%"}} className=" text border d-flex icons">
            <div className="flex-fill">
              <i class="far fa-newspaper fa-lg">{profile.num_post}</i>
            </div>
            <div className="flex-fill">
              <i class="far fa-thumbs-up fa-lg">{profile.average_likes}</i>
            </div>
            <div className="flex-fill">
             <i class="far fa-comments fa-lg">{profile.comments}</i>       
            </div>
          </div>

          <div className="text-muted mt-3 mb-3">articles:</div>
          
          {myArticles.map((article)=>(

            <div key = {article.id} className="d-flex-row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="div" onClick = {e=>handleImageClick(article.slug)}>
               <img width= "600" height = "200" src = {"https://iivent.herokuapp.com"+article.pic}></img>
              </div>
              <h4 className="ml-2"> {article.title}</h4>
              

              <div className="d-flex justify-content-end ">

               <i class="p-2 far fa-trash-alt fa-lg"
               onClick = {(e)=>deleteHandler(article.slug , article)}
               title = "delete"
               ></i>

              <i 
              className="p-2 fas fa-pencil-alt fa-lg"
              title = "edit"
              onClick = {()=>clickUpdateHandler(article.slug)}
              ></i>
              </div>
            </div> 
          ))}
          {myArticles.length==0? 
          <p> you dont have an article click post to create one</p>
          :
          ""
          }
        </div>
      </div>
  )
}
