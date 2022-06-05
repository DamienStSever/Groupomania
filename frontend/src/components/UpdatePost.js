import React, { useState,  } from "react";
import Axios from "axios";
import "../styles/Modal.css"
import Modal from "react-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";




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
const UpdatePost =() => {
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

    const [content, setContent] = useState("");

  
    const update = () => {
        Axios.put("http://localhost:4200/api/post", {
            content: content
        }).then((res) => {
            console.log(res);

            
        })
        
    };
    
    

    return (
        <div>

            <button onClick={openModal} className="userbutton"><FontAwesomeIcon className="icon" icon={faPenToSquare} />Modifier Post</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Bienvenue à Groupomania</h2>
                <button onClick={closeModal} className="buttonClose">Fermer</button>
                
                <div className="form">Changer votre Post</div>
                <form>
                    <input id="inputPost"  onChange={(e) => {
                        setContent(e.target.value)
                    }} />
                </form>

                <button onClick={update}>Valider</button>

            </Modal>

        </div>

    );

}



export default UpdatePost