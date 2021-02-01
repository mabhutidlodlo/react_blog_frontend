import axios from 'axios';
import react,{useState, useEffect} from 'react';
import ProfileIcon from '../profileIcon/ProfileIcon';

export default function CommentsView(props){
  const [users, setUsers] = useState([]);
  const [body, setBody] = useState('');


  const onClick= (e)=>{
  
   if (body.length>0){
   const data = {
      body:body
    }
    props.onClick1(data,e)
    setBody('')
  }
  }
  
  return(
    <div className = "container">
      <h3>Comments</h3>
      {props.comments.map((comment)=>(
        <div className="border mb-2" >
          <ProfileIcon author = {comment.author} onClick2={props.onClick2}/>
          <p className="p-2">{comment.body}</p>
          {comment.author === JSON.parse(localStorage.getItem('profile')).username ? 
          <div className="d-flex justify-content-end">
          <i class="far fa-trash-alt mb-2 ml-2"></i>
          </div>
          :
          ""
          }
        </div>
        
       )

      )}
      
      
      <div className = "">
      <textarea
        className="form-control mb-2 round InputActive textarea"
        id="txtarea-dwip-service-description"
        name="hint"
        value={body}
        maxLength="500" 
        placeholder= "write your comment here"
        onChange={e => setBody(e.target.value)}      />
      <div>
          <button onClick = {e=>onClick(e)} type = "button" className = "btn1"  >comment</button>
      </div>
      </div>

    </div>
  )
}