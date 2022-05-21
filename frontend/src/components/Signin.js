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
function Signin() {
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

    const {login} = () => {
        Axios.post("http://localhost:4200/api/user/login", {
          email: email,
          password: password,
        }).then((response) => {
          localStorage.setItem("token", "Bearer " + response.data.token);
          localStorage.setItem("id", response.data.userId);
          localStorage.setItem("moderator", response.data.moderator);

        });
      };


  return (
    <div>
      <button onClick={openModal} className="userbutton">S'inscrire</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Rejoignez Groupomania</h2>
        <button onClick={closeModal} className="buttonClose">close</button>
        <div className="form">email</div>
        <form> 
          <input className="input"/>
        </form>
        <div className="form">Password</div>
        <form>
            <input className="input"/>
        </form>
        <button>Valider</button>
      </Modal>
    </div>

  );
}
export default Signin