import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer, toast } from 'react-toastify';
import {  toastOnError } from "../../utils/Utils";
import CommentsView from "../comments/CommentsView";
import ProfileIcon from '../profileIcon/ProfileIcon';
import Profile from "../profileView/Profile";

const FullArticle = (props)=>{
  const [article, setArticle] =  useState({});
  const [comments, setComments] =  useState([]);
  const [claps, setClaps] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(()=>{
    const slug=props.match.params.slug;
      const getArticle = async()=>{
      const  response = await axios.get(`/blog/my_article/${slug}`)
        setArticle(response.data)
        setProfile(response.data.author)
        console.log()
    } ;  
      getArticle() 
  },[]);

const getComments=()=>{
  const slug = props.match.params.slug;
  const getComments = async()=>{
    const response = await axios.get(`/blog/comment/${slug}`)
    setComments(response.data)

  } ;  
  getComments() 
}

  useEffect(()=>{
    getComments()
  },[]);

  useEffect(()=>{
      const slug = props.match.params.slug;
      const getClaps = async()=>{
        const response = await axios.get(`/blog/claps/${slug}`)
        setClaps(response.data)
      } ;  
      getClaps() 
  },[]);

    //claps are the like button, naming should be changed
  const handleLikeClick =()=>{
    const slug = props.match.params.slug;
      axios.post(`/blog/claps/${slug}`).
      then(response=>{
        setClaps(response.data)
      }).
      catch(e=>{
        toastOnError(e)
      })
    }

const handleProfileClick = (id)=>{
 console.log(id)
 props.history.push(`/profile/${id}`)
}
  const handleCommentOnClick = (body)=>{
     
    const slug = props.match.params.slug;
    axios.post(`/blog/comment/${slug}`, body ).
    then(response=>{
      toast.success("successfully created")
      getComments()
    }).
    catch(e=>{
      toastOnError(e)
         
    })
  }

  const decodeHtmlTags=()=>{
    return {__html : article.content}
  }


  return(
    <div className="container">
      <div className ="col md-6">
        
        <div className = "pt-4">
          <h3>{article.title}</h3>
          <ProfileIcon author = {profile} onClick2={handleProfileClick} />
          <div className="muted-text">#{article.category}</div>
          <hr></hr>
        </div>
        
        <div className="row">
          <img width= "1200" height = "300" src ={"http://127.0.0.1:8000"+article.pic}></img>
        </div>

        <div className="row  position-static">
          <div dangerouslySetInnerHTML={{__html: article.content}}/>
        </div>
        
        <div className = "mt-2 row-auto">
          
          <i 
            className="far fa-thumbs-up fa-lg" 
            onClick={handleLikeClick}>
            { claps.num_claps}
          </i>  

          <i class="ml-4 far fa-comments fa-lg"> { comments.length}</i>       

          <Link to = {{pathname: `/category/${article.category}`}}
            className="g-0 ml-4 border text-muted rounded overflow-hidden">
            {article.category}
          </Link>

        </div>
        <hr/>
        {comments ?  
          <CommentsView comments = {comments}
            onClick1={handleCommentOnClick}
            onClick2={handleProfileClick}
          />
          : 
          <p>there are no comments yet</p>
        }

      </div>

    </div>
  )
}
export default FullArticle