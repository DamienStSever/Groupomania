import "../styles/Header.css"
import logo from "../assets/logos/icon.png"
import { Link, } from "react-router-dom"




const name = sessionStorage.getItem("id")


function Header() {

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior:"smooth"
    })
}
    return (
        <div>
            
                <Link to={"/"}>
                    
                    <img src={logo} alt="Groupomania" className="groupologo" onClick={scrollToTop}/>

                </Link>


        </div>


    )

}


export default Header