import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Logout.css"

function Logout(){

     // Transforme le bouton Se déconnecter en Se connecter
    const [user, setUser] = useState(0)
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

    function logout(){
    sessionStorage.clear()
    window.location.reload()
    }
    return(
        <div >
        <Link to={"/"}>
            {user &&<button className="button" onClick={logout}> se déconnecter</button>}
            </Link>
        </div>
    )
}

export default Logout