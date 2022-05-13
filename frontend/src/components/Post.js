import { useEffect, useState } from "react"


function Post() {
    const post = useState([])
    useEffect(() => {
        fetch("http://localhost:4200/api/post")
            .then(function (res) {
                if (res.ok) {
                    return res.json()
                    ;
                    
                }
            })
            // Mise en place des données sur la page index
            .then(function (post) {
                for (let i = 0; i < post.length; i++) {
                    console.log(post);

                }
            })
    })
    return (
        <div>

    <h1>Dernières publications</h1>
    <ul>
        {post.map(({content})=>(
            <div key= {content}>{content}</div>
        ))}
    </ul>
        </div>
        )
}
    
export default Post