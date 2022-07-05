import React, { useState, useEffect } from "react";
import "../styles/Logout.css"
import { Link } from "react-router-dom";

function HomeButton(){

     // Apparition du bouton si connecter à un utilisateur
    const [user, setUser] = useState()
    useEffect(() => {

        var home = sessionStorage.getItem("id")
        if (home == null) {
            home = null


        } else {
            home = " "
           
        }
        
        setUser(home)

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