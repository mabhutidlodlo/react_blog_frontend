import react from "react";
import {Link} from "react-router-dom";

export default function ListArticle(props){

  return(
    <div className = " mt-2 container">
        <div className="m-3">
          {props.articles.map((article)=>(
            <div key = {article.id} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="row-auto">
               <img width= "100%" height = "200" src = {article.pic}></img>
              </div>
              <div className="col d-flex flex-column position-static">
               <h4 className="mb-0"> {article.title}</h4>
               <p className="mb-auto">{article.hint}</p>
               <Link to ={{pathname: `/article/${article.slug}`}} className="text-muted stretched-link">Continue reading</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
