import axios from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";
import { Redirect } from "react-router-dom";

export const login  =  (userData, redirectTo)=> dispatch=>{
    axios.post("/accounts/login/", userData)
    .then(response=>{
        console.log(response.data)
       const auth_token = response.data.token;
       setAxiosAuthToken(auth_token);
       dispatch(setToken(auth_token))
       const profile = response.data.profile
       localStorage.setItem("profile", JSON.stringify(profile))
       const user = response.data.user
       dispatch(setCurrentUser(user, redirectTo))

    }).
    catch(error=>{
        dispatch(unsetCurrentUser());
        toastOnError(error);
    })
};

export const setToken = (token)=>dispatch=>{
setAxiosAuthToken(token);
localStorage.setItem("token", token);
dispatch({
    type:SET_TOKEN,
    payload:token
})
};

export const setCurrentUser = (user,redirectTo)=>dispatch=>{
    localStorage.setItem("user", JSON.stringify(user))
    dispatch({
        type:SET_CURRENT_USER,
        payload: user
    })

    console.log("set user " + redirectTo);
    if(redirectTo !== ""){
        dispatch(push(redirectTo));
    }
}

export const unsetCurrentUser= ()=> dispatch=>{
    setAxiosAuthToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");

    dispatch({
        type:UNSET_CURRENT_USER
    })
}