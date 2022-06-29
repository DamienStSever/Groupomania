import { useState, useEffect } from "react";
import "../styles/Logout.css"
import Axios from "axios";



function Like() {
    const [post, setPost] = useState("")
    const [likes, setLikes] = useState([]);
    

    const userId = JSON.parse(sessionStorage.getItem("id"))
    
        Axios.post("http://localhost:4200/api/post/like",  {
            
                postId: post,
                userId: userId,
                likeValue: 1
                
            
        })

            .then(res => res.json())
            .then(
                (result) => {
                    setLikes(result.like)
                   
                }, (error) => {
                    if (error) {

                    }
                })
    
    useEffect(() => {

    }, [])


    return (

        <div className="likes">
            <button onClick={Like}>

                Likes : {likes}

            </button>
        </div>
    )
}

export default Like