import { useEffect, useState } from "react"
import Axios from "axios"
import "../styles/Post.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import UpdatePost from "./UpdatePost"
import Comment from "./Comment"
import { BrowserRouter as Router, Route,  } from "react-router-dom"
import DeletePost from "./DeletePost"
import Like from "./Like.js"




const dayjs = require('dayjs')
const token = sessionStorage.getItem("token")
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


function Post() {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState("")
    const [imageUrl, setImageUrl] = useState("")




    const fetchData = async () => {
        const { data } = await Axios.get("http://localhost:4200/api/post/")
        setPosts(data)

    }

    const userId = JSON.parse(sessionStorage.getItem("id"))

    const postPost = (e) => {

        console.log(imageUrl);
        console.log(setImageUrl);
        Axios.post("http://localhost:4200/api/post", {
            headers: {
                Authorization:token,    
              },
            content: post,
            userId: userId,
            imageUrl: imageUrl

        }).then((res) => {


        })
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Router>
            <div className="Posts">

                <div className="createPost">
                    <form>Parlez ici
                        <textarea className="inputPost" onChange={(e) => {
                            setPost(e.target.value)

                        }}>

                        </textarea> <br />
                         Url de l'image ici
                            <input id="inputImage" onChange={(e) => {
                                setImageUrl(e.target.value)
                                console.log(imageUrl)
                            }}>

                            </input> <br />

                            <button onClick={postPost}>Valider</button>
                        
                    </form>
                </div>
                <h1>Dernières publications</h1>
                {posts.map(post => (

                    <div key={post.id}>


                        <div className="post">

                            <Link to={"/post/" + post.id}>
                                <UpdatePost />
                                <DeletePost />
                            </Link>
                            
                            <div className="date"> {dayjs(post.createdAt).fromNow()}</div>

                            {post.content}

                            <img src={post.imageUrl} alt="" />
                            {console.log(post.imageUrl)}
                            <div className="like">

                            </div>
                            <div className="comment">

                                <div className="user">{post.User.pseudo}</div>


                                <Link to={"/comment/ofpost/" + post.id}>
                                    <Route path={"/comment/ofpost/" + post.id}>

                                        <Comment />
                                    </Route>

                                    <FontAwesomeIcon className="iconeComment" icon={faComment} />
                                    Commentaire

                                </Link>



                            </div>


                            <div>
                                <Route path={"/post/" + post.id+"/like" } >
                                    <Like />
                                </Route>
                            </div>



                        </div>

                    </div>

                ))}

            </div>
        </Router>
    )

}


export default Post