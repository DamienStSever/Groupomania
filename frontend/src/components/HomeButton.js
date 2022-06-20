import React, { useState, useEffect } from "react";
import "../styles/Logout.css"
import { Link } from "react-router-dom";

function HomeButton(){

     // Transforme le bouton Se déconnecter en Se connecter
    const [user, setUser] = useState()
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

    
  
    
    return(
        <div >
            <Link to={"/"}>
               {user &&<button className="button" >Home </button>}
                
            </Link>
        </div>
    )
}

export default HomeButton