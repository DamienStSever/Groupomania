import React, { useState,  } from "react";
import Axios from "axios";
import "../styles/Modal.css"
import Modal from "react-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";



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
const token = sessionStorage.getItem("token")

Modal.setAppElement("#root")
function UpdateProfil() {
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

    const [pseudo, setPseudo] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("")
    const update = () => {
        Axios.put("http://localhost:4200/api/user/"+ sessionStorage.id, {
            pseudo: pseudo,
            description: description,
            imageUrl: imageUrl
        },
        {
            headers: { Authorization: `${token}` },
         }).then((res) => {
            console.log(res);       
            window.location.reload()
        })
        
    };
    
    

    return (
        <div>

            <button onClick={openModal} className="userbutton"><FontAwesomeIcon icon={faPen} />Modifier le Profil</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Bienvenue à Groupomania</h2>
                <button onClick={closeModal} className="buttonClose">Fermer</button>
                <div className="form">Changer votre pseudo</div>
                <form>
                    <input id="inputPseudo" onChange={(e) => {
                        setPseudo(e.target.value)
                    }} />
                </form>
                <div className="form">Changer votre description</div>
                <form>
                    <textarea id="inputDescription"  onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                     <br />
                    Url de l'image ici
                            <input id="inputImage" onChange={(e) => {
                                setImageUrl(e.target.value)
                                console.log(imageUrl)
                            }}>

                            </input> <br />
                </form>

                <button onClick={update}>Valider</button>

            </Modal>

        </div>

    );

}



export default UpdateProfil