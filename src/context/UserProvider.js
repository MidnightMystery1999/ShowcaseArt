 import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

 const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        email:"socialshivangi.2806@gmail.com"
    });


     return (
         <UserContext.Provider value={user}>
            {children}
         </UserContext.Provider>
     )
 }

export default UserProvider;