import { act } from "react-dom/test-utils"
import {
    SET_TOKEN, 
    SET_CURRENT_USER, 
    UNSET_CURRENT_USER
} from "./LoginTypes"

const initialState = {
    token:"",
    user :{},
    isAuthenticated:false,
   
}

export const loginReducer =(state = initialState, action)=>{
    switch(action.type){
        case SET_TOKEN:
            return{
             ...state,
             isAuthenticated: true,
             token:action.payload
            }
        case SET_CURRENT_USER:
            return{
                ...state,
                user:action.payload
            }
        case UNSET_CURRENT_USER:
            return initialState;
        default:
            return state;
    }
};
