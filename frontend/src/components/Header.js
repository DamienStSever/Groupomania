import "../styles/Header.css"
import logo from "../assets/logos/icon.png"


const name = sessionStorage.getItem("id")

function Header() {
   
    return (
        <div>
            <img src={logo} alt="Groupomania" className="groupologo" />

            
        Bonjour {name}
            

        </div>

        
    )

}


export default Header