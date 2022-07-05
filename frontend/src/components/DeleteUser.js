import React, { useState,  } from "react";
import Axios from "axios";
import "../styles/Modal.css"
import Modal from "react-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
const DeleteUser = () => {
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
  
    const deleteUser = () => {
        Axios.delete("http://localhost:4200/api/user/"+ sessionStorage.id, {
            email: email,
            password: password,
        }).then((res) => {
            console.log(res);

            
        })
        
    };
    
    

    return (
        <div>

            <button onClick={openModal} className="userbutton"><FontAwesomeIcon icon={faTrashCan} />Supprimer le Profil</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Pour supprimer votre compte mettez</h2>
                <button onClick={closeModal} className="buttonClose">Fermer</button>
                <div className="form">Votre email</div>
                <form>
                    <input id="inputEmail" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </form>
                <div className="form">Votre Password</div>
                <form>
                    <input id="inputPassword" type="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </form>

                <button onClick={deleteUser}>Valider</button>

            </Modal>

        </div>

    );

}



export default DeleteUser