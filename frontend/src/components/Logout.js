
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Logout.css"


function Logout(){

    // Apparition du bouton si connecter à un utilisateur
    const [user, setUser] = useState(0)
    useEffect(() => {

        var logout = sessionStorage.getItem("id")
        if (logout == null) {
            logout = null


        } else {
            logout = " "
           
        }
        setUser(logout)

    }, []);

    function logout(){
    sessionStorage.clear();
    window.location.reload();
   
    }
    function logoutdelayed(){
        setTimeout(logout, 200)
    }
    return(
        <div >
        <Link to={"/"}>
            {user &&<button className="button" onClick={logoutdelayed}> se déconnecter</button>}
            </Link>
        </div>
    )
}

export default Logout