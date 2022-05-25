import { useEffect, useState } from "react"
import iconeComment from "../assets/icones/bulle.png"
import iconeLike from "../assets/icones/like.png"
import axios from "axios"
import "../styles/Post.css"



const dayjs = require('dayjs')
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


function Post() {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState("")

    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:4200/api/post")
        
        setPosts (data)
    }

    
    const postPost = () => {
        axios.post("http://localhost:4200/api/post", {
            post: post,

        }).then((res) => {
            console.log(res);

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
                    }}>

                    </input>
                    <button onClick={postPost}>Valider</button>
                </form>
            </div>
            <h1>Dernières publications</h1>
            {posts.map(post => (

                <div key={post.id}>


                    <div className="post">

                        <div className="date"> {dayjs(post.createdAt).fromNow()}</div>

                            <div  className="user">{post.User.pseudo}</div>


                        {post.content}
                        <div className="like">
                            <img src={iconeLike} alt="icone commentaire" className="iconeLike"></img>
                            Like
                        </div>

                        <div className="comment">
                            <img src={iconeComment} alt="Icone commentaire" className="iconeComment"></img>
                            Commentaire
                        </div>

                    </div>

                </div>

            ))}

        </div>

    )

}


export default Post