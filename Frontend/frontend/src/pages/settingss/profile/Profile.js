import React, { useState, useEffect } from "react";
import "./profile.scss";
import * as Avatar from "@radix-ui/react-avatar";
import FormComponent from "./FormComponent";
import { useUserContext } from "../../../components/context/UserContext";
const Profile = () => {
  const { user, setUserData } = useUserContext();

  return (
    <div className="profile">
      <div className="avatar">
        <Avatar.Root className="AvatarRoot">
          <Avatar.Fallback className="AvatarFallback">
            {user.fullName
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </Avatar.Fallback>
        </Avatar.Root>
        <button className="btn-up">Upload New</button>
        <button className="btn-de">Delete Avatar</button>
      </div>
      <div className="inform">
        <div className="formIn flex">
          <FormComponent
            fullNameP={user.fullName}
            emailP={user.email}
            userNameP={user.userName}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
