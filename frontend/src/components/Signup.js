import React, { useState } from "react";
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
function Signup() {
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
  const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const  signup  = () => {
    Axios.post("http://localhost:4200/api/user/signup", {
      pseudo: pseudo,
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
        })
        

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
        <div className="form">pseudo</div>
        <form>
          <input id="inputPseudo" onChange={(e) => {
                        setPseudo(e.target.value)
                    }} />
        </form>
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
        
        <button onClick={signup}>Valider</button>
      </Modal>
    </div>

  );
}
export default Signup