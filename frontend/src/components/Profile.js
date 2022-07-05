import React, { useState, useEffect } from "react";
import "../styles/Logout.css"

import { Link } from "react-router-dom";



function Profile() {

    
    const [user, setUser] = useState(0)

//  Apparition du bouton si connecter à un utilisateur
    useEffect(() => {

        var profile = sessionStorage.getItem("id")
        if (profile == null) {
            profile = null


        } else {
            profile = " "

        }
        setUser(profile)

    }, []);


    return (

        <div >
            <Link to={"/profile"}>
               {user &&<button className="button"> Profil </button>}
                
            </Link>

        </div>
    )
}

export default Profile