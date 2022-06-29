import { useState, useEffect } from "react";
import "../styles/Logout.css"
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"


function Like(props) {
    const [post] = useState("")
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

        <button className="like"onClick={() =>Like()}> {likes}
                            <FontAwesomeIcon className="iconeLike" icon = {faThumbsUp}/>
                            Like: {props.data}</button>
    )
}

export default Like