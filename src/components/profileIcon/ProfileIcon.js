import react from "react";

export default function ProfileIcon(props){

    return(
        <div className = "container">
          <div className = "d-flex mt-2 content-justify-right" onClick={e=>props.onClick2(props.author.id)}>
            <img
              src={props.author.avatar}
              style={{width: 30, height: 30, borderRadius: 30/ 2}}
           />
           <p>{props.author.username}</p>
           {props.author.followers  && props.articleView ?
           <p className = "ml-3">followers {props.author.followers.length} </p>
              :""
             }
          </div>
        </div>
    )
}
