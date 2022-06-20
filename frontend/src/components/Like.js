import React, { useState, useEffect } from "react";
import "../styles/Logout.css"
import Axios from "axios";


console.log(sessionStorage.id);

const articleId = URLSearchParams.id


function Like() {
    const [likes, setLikes] = useState([]);

    const userId = JSON.parse(sessionStorage.getItem("id"))
    const like = () => {
        Axios.post("http://localhost:4200/api"+ window.location.pathname,  {
            
                articleId: articleId,
                userId: userId,
                like: 1
                
            
        })

            .then(res => res.json())
            .then(
                (result) => {
                    setLikes(result.like)

                }, (error) => {
                    if (error) {

                    }
                })
    }
    useEffect(() => {

    }, [])


    return (

        <div className="likes">
            <button onClick={like}>

                Likes : {likes}

            </button>
        </div>
    )
}

export default Like