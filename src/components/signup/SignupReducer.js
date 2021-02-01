import {
    CREATE_USER_SUBMIT,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
} from "./SignupTypes";

//this is the initial state of the store
const initialState = {
    usernameErr:"",
    passwordErr : "",
    first_nameErr : "",
    last_nameErr :"",
    isSubmitted : false,
};

export const signupReducer = (state = initialState, action)=>{
 switch(action.type){
     case CREATE_USER_SUBMIT:
        return{
            usernameErr : "",
            passwordErr : "",
            first_nameErr : "",
            last_nameErr : "",
            isSubmitted : true,
        };
     case CREATE_USER_ERROR:
         const errState = {
             usernameErr : "",
             passwordErr :"",
             first_nameErr : "",
             last_nameErr : "",
             isSubmitted :false
         };

         if(action.errorData.hasOwnProperty("username")){
            errState.usernameErr = action.errorData['username']
         };
         if(action.errorData.hasOwnProperty("password")){
             errState.passwordErr = action.errorData['password']
         };
         if(action.errorData.hasOwnProperty("first_name")){
             errState.first_nameErr = action.errorData["first_name"]
         }
         if(action.errorData.hasOwnProperty("last_name")){
             errState.last_nameErr = action.errorData['last_name']
         }
         return errState;

     case CREATE_USER_SUCCESS:
         return {
             usernameErr:"",
             passwordErr:"",
             first_nameErr : "",
             last_nameErr : "",
             isSubmitted:false
         };
     default:
         return state;

         
    }

}