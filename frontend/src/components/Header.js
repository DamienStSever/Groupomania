import "../styles/Header.css"
import logo from "../assets/logos/icon-left-font.svg"

function Header() {
    
    return (
        <div>
            <img src={logo} alt="Groupomania" className="groupologo" />

            <button  className="userbutton"> Se connecter </button>

            <button  className="userbutton"> S'inscrire</button>

        </div>

        
    )

}


export default Header