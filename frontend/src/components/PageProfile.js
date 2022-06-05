import React, { useState, useEffect } from "react";
import Update from "./UpdateProfil";
import Delete from "./DeleteUser";



import Axios from "axios";


function PageProfile() {

  const [profile, setProfile] = useState({})
  const fetchData = async () => {
    const { data } = await Axios.get("http://localhost:4200/api/user/" + sessionStorage.id)
    setProfile(data)

  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
    
     <Update/> 
    <Delete/>
      <div className="pseudo"> Pseudo :{profile.pseudo} </div>
      <div className="email"> Email : {profile.email}</div>
      <div className="imageUser"> {profile.imageUrl} </div>
      <div className="profilDescription">Description : {profile.description} </div>
      

    </div>

  )





}

export default PageProfile