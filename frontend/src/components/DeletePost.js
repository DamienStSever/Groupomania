import React from "react";
import Axios from "axios";
import "../styles/Modal.css"
import Modal from "react-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


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
const DeletePost = () => {
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


  
    const deletePost = () => {
        Axios.delete("http://localhost:4200/api"+ window.location.pathname,)
        
        .then((res) => {
            console.log(res);
            window.location.reload()

            
        })
        
    };
    
    

    return (
        <div>

            <button onClick={openModal} className="userbutton"><FontAwesomeIcon icon={faTrashCan} />Supprimer le Post</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Voulez-vous vraiment supprimez votre post ?</h2>
                <button onClick={closeModal} className="buttonClose">Fermer</button>


                <button onClick={deletePost}>Oui</button>
                <button onClick={closeModal}>Non</button>

            </Modal>

        </div>

    );

}



export default DeletePost