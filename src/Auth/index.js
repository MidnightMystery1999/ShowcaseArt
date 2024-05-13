// isLoggedIn => token
export const isLoggedIn=()=>{
    if(localStorage.getItem("data")==null){
        return false;
    } else{
        return true;
    }
};


// doLogin => data => set to localStorage
export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    // callback
    next();
};


// doLogout=> remove from localStorage
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next()
};


// get currentUser=> get from localStorage
export const getCurrentUser=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }else{
        return undefined;
    }
};

export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).jwtToken;
    }else{
        return null;
    }
}