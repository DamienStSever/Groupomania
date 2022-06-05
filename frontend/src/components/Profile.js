import React, { useState, useEffect } from "react";
import "../styles/Logout.css"

import { Link } from "react-router-dom";



function Profile() {

    
    const [user, setUser] = useState(0)

// Transforme le bouton Se déconnecter en Se connecter
    useEffect(() => {

        var id = sessionStorage.getItem("id")
        if (id == null) {
            id = null


        } else {
            id = " "

        }
        sessionStorage.getItem("id", id)
        setUser(id)

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