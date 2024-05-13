import { axiosApi } from "./helper";

export const SignUp=(user)=>{
    return axiosApi.post('/auth/register',user)
        .then((response)=>response.data)
}; 

export const LogIn=(loginDetail)=>{
    return axiosApi.post('/auth/login',loginDetail)
        .then((response)=>response.data)
}