import React, { useContext } from "react";
import Base from "../../components/Base";
import UserContext from "../../context/UserContext";

const ProfileInfo = () => {
    const user = useContext(UserContext);
    return (
        <Base>
        <br />
            <div>ProfileInfo - WELCOME!!</div>
            <h1> Welcome {user.email}</h1>
        </Base>
    )
};

export default ProfileInfo;