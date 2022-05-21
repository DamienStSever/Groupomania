import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../styles/Modal.css"
import Modal from "react-modal"

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
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailError = document.querySelector(".email.error")
    const passwordError = document.querySelector(".password.error")

    const { login } = () => {
        Axios.post("http://localhost:4200/api/user/login", {
            email: email,
            password: password,
        }).then((res) => {
            if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.erros.password;
            } else{
                window.location = "/"
            }

        })
        .catch((err) => {
            console.log(err);
        })
    };


    return (
        <div>
            <button onClick={openModal} className="userbutton">Se connecter</button>
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
                    <input id="inputPassword" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </form>
                <button onClick={(() => login)}>Valider</button>
            </Modal>
        </div>

    );
}
export default Login