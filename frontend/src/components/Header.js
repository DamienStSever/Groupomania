import "../styles/Header.css"
import logo from "../assets/logos/icon.png"

function Header() {
    
    return (
        <div>
            <img src={logo} alt="Groupomania" className="groupologo" />

            

            <button  className="userbutton"> S'inscrire</button>

        </div>

        
    )

}


export default Header