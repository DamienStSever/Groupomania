import { useEffect, useState } from "react"
import axios from "axios"
import "../styles/Comment.css"
const dayjs = require('dayjs')
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


function Comment() {
const [comments, setComments] = useState([])
    const [comment, setComment] = useState([])
     

    const fetchData = async () => {
       
        const { data } = await axios.get(`http://localhost:4200/api/comment/ofpost/`)
        setComments(data)
    }
    console.log(comments);
    const userId = JSON.parse(sessionStorage.getItem("id"))
    

    const postComment = () => {

        axios.post("http://localhost:4200/api/comment", {
            content: comment,
            userId: userId,

        }).then((res) => {
            console.log(comment);

        })
    }
    useEffect(() => {
        fetchData();
    }, [])

    console.log("Comment");
    return (

        <div className="Comments">
        
            <div className="createComment">
                <form>Parlez ici
                    <input id="inputComment" onChange={(e) => {
                        setComment(e.target.value)
                    }}>

                    </input>
                    <button onClick={postComment}>Valider</button>
                </form>
            </div>
            {comments.map(comment => (

                <div key={comment.id}>


                    <div className="comment">

                        <div className="date"> {dayjs(comment.createdAt).fromNow()}</div>

                        <div className="user">{comment.User}</div>

                        
                        {comment.content}


                    </div>

                </div>

            ))}

        </div>

    )

}


export default Comment