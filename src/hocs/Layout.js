import react, { Children } from "react"
import NavBar from "../components/navbar/NavBar"

const Layout = (props)=>{
    return(
        <div>
            <NavBar/>
            {props.children}
        </div>
    )
}
export default Layout