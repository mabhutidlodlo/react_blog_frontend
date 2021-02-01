import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    CREATE_USER_SUBMIT,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR
} from "./SignupTypes"

export const signupNewUser = userData => dispatch=>{
    dispatch({type: CREATE_USER_SUBMIT});
    axios.post("accounts/register/", userData)
    .then(response=>{
        toast.success(
        "account for " +
        userData.username +
        " created succesfully, login"
        );
        dispatch({type: CREATE_USER_SUCCESS})
    })
    .catch(error => {
        if(error.response){
            toast.error(JSON.stringify(error.response.data))
            dispatch({
                type: CREATE_USER_ERROR,
                errorData: error.response.data,
            })
        }
        else if(error.message){
            toast.error(JSON.stringify(error.message))
        }
        else{
            toast.error(JSON.stringify(error))
        }
    });
};