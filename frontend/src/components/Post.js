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
    const[users] = useState([])
    useEffect(() => {
        fetchData() ; 
    }, [])
    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:4200/api/post")
        setPosts(data)
        data.forEach(post=> {
            fetchUserByPost(post.userId)
            console.log(post.userId);
        }) 
    }
    
    const fetchUserByPost = async (userId) => {
        const { data } = await axios.get("http://localhost:4200/api/user/"+userId)
        console.log(userId);

       // setUsers(data)

        
    }

     console.log(posts);
    console.log(users); 
  
    return (
        <div className="Posts">

            <h1>Dernières publications</h1>
            {posts.map(post => (
                
                <div key={post.id}>
                

                    <p className="post">
                        <div className="date"> {dayjs(post.createdAt).fromNow()}</div>
                        {users.map(user => (
                            <div key={user.id} className="user">{user.pseudo }</div>
                        ))}
                        
                        {post.content}
                        <div className="like"> 
                        <img src={iconeLike} alt="icone commentaire" className="iconeLike"></img> 
                        Like </div>
                        <div className="comment">
                        <img src={iconeComment} alt="Icone commentaire" className="iconeComment"></img>
                        Commentaire
                    </div>
                    </p>
                   
                </div>
            ))}
        </div>
        
    )
    
}


export default Post