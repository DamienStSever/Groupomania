import { useEffect, useState } from "react"
import Axios from "axios"
import "../styles/Comment.css"
const dayjs = require('dayjs')
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


function Comment() {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState([])
    const [imageUrl, setImageUrl] = useState("")

    const fetchData = async () => {

        const { data } = await Axios.get("http://localhost:4200/api"+window.location.pathname)
        setComments(data)
        console.log(data);
    }
    
    const userId = JSON.parse(sessionStorage.getItem("id"))


    const postComment = () => {

        Axios.post("http://localhost:4200/api"+window.location.pathname, {
            content: comment,
            userId: userId,
            imageUrl: imageUrl

        }).then((res) => {
            window.location.reload()
            console.log(comment);

        })
    }
    useEffect(() => {
        fetchData();
    }, [])


    return (

        <div className="Comments">

            <div className="createComment">
                <form>Parlez ici
                    <input id="inputComment" onChange={(e) => {
                        setComment(e.target.value)
                    }}>

                    </input> <br />
                    Url de l'image ici
                            <input id="inputImage" onChange={(e) => {
                                setImageUrl(e.target.value)
                                console.log(imageUrl)
                            }}>

                            </input> <br />
                        
                    <button onClick={postComment}>Valider</button>
                </form>
            </div>

            {comments.map(comment => (
                <div key={comment.id}>
                    <div className="comment">
                        <div className="date"> {dayjs(comment.createdAt).fromNow()}</div>
                        <div className="user">{comment.User}</div>
                        {comment.content}
                        <img src={comment.imageUrl} alt="" />
                            
                    </div>
                </div>

            ))}
        </div>
    )
}


export default Comment