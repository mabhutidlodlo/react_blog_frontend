import react from "react";
import {Link} from "react-router-dom"

export default function ListCategories(){

  return(
    <div className ="container">
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link className="p-2 link-secondary" to="/category/culture">Culture</Link>
          <Link className="p-2 link-secondary" to="/category/food">Food</Link>
          <Link className="p-2 link-secondary" to="/category/health">Health</Link>
          <Link className="p-2 link-secondary" to="/category/media">Media</Link>
          <Link className="p-2 link-secondary" to="/category/opinion">Opinion</Link>
          <Link className="p-2 link-secondary" to="/category/programing">Programing</Link>
          <Link className="p-2 link-secondary" to="/category/sport">Sport</Link>         
          <Link className="p-2 link-secondary" to="/category/world">World</Link>

        </nav>
      </div>
    </div>
  )
}