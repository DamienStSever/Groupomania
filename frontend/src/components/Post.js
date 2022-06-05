import { useEffect, useState } from "react"
import Axios from "axios"
import "../styles/Post.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from "@fortawesome/free-solid-svg-icons"
import UpdatePost from "./UpdatePost"


const dayjs = require('dayjs')

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


function Post() {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState("")
    const [file, setFile]= useState("")

    const fetchData = async () => {
        const { data } = await Axios.get("http://localhost:4200/api/post")
        setPosts(data)
    }
    console.log(post.id);
    const userId = JSON.parse(sessionStorage.getItem("id"))

    const postPost = () => {

        Axios.post("http://localhost:4200/api/post", {
            content: post,
            userId: userId,
            file: file
        }).then((res) => {
            console.log(post.id);

        })
    }
    useEffect(() => {
        fetchData();
    }, [])
 
    return (

        <div className="Posts">
            <div className="createPost">
                <form>Parlez ici
                    <input id="inputPost" onChange={(e) => {
                        setPost(e.target.value)
                        setFile()
                    }}>

                    </input>
                    <button onClick={postPost}>Valider</button>
                </form>
            </div>
            <h1>Dernières publications</h1>
            {posts.map(post => (

                <div key={post.id}>


                    <div className="post">
                    <UpdatePost/>
                        
                        <div className="date"> {dayjs(post.createdAt).fromNow()}</div>

                       

                        
                        {post.content}


                        <div className="comment">
                        <div className="user">{post.User.pseudo}</div>
                            <Link to={"/comment/"+post.id}>
                                <FontAwesomeIcon className="iconeComment" icon={faComment} />
                                Commentaire
                            </Link>
                            
                            {console.log(post.Comments[0])}
                        </div>

                    </div>

                </div>

            ))}

        </div>

    )

}


export default Post