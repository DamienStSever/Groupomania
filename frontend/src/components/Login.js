import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/Modal.css"
import Modal from "react-modal"


// Style de la Modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },

};


Modal.setAppElement("#root")
function Login() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const login = () => {
        Axios.post("http://localhost:4200/api/user/login", {
            email: email,
            password: password,
        }).then((res) => {
            sessionStorage.setItem("token", "Bearer " + res.data.token); 
            sessionStorage.setItem("id", res.data.userId);
            sessionStorage.setItem("admin", res.data.admin)
            console.log(res.data.admin);
            window.location.reload()

        // Si le mot de passe ou l'email sont incorrect
        }).catch(err => {
            console.log(err);
            alert("L'email ou le mot de passe sont incorrects. \n Veuillez retentez ou alors inscrivez vous ")
            
        })
           
        
        
        
    };
    
    //  Disparition du bouton si connecter à un utilisateur
    const [user, setUser] = useState(0)
    useEffect(() => {

        var login = sessionStorage.getItem("id")
        if (login == null) {
            login = " "


        } else {
            login = null

        }
        
        setUser(login)

    }, []);
    
    
    return (
        <div>

            {user && <button onClick={openModal} className="userbutton">se connecter</button>}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Bienvenue à Groupomania</h2>
                <button onClick={closeModal} className="buttonClose">Fermer</button>
                <div className="form">email</div>
                <form>
                    <input id="inputEmail" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </form>
                <div className="form">Password</div>
                <form>
                    <input id="inputPassword" type="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </form>

                <button onClick={login}>Valider</button>

            </Modal>

        </div>

    );

}



export default Login