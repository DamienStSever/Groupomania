import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/Modal.css"
import Modal from "react-modal"

//Style Modal
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

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("")
  
  // Fait apparraitre le bouton si l utilisateur n est pas connecté
  const [user, setUser] = useState(0)
  useEffect(() => {

    var signup = sessionStorage.getItem("id")
    if (signup == null) {
      signup = " "


    } else {
      signup = null

    }

    setUser(signup)

  }, []);

  const signup = () => {
    Axios.post("http://localhost:4200/api/user/signup", {
      pseudo: pseudo,
      email: email,
      password: password,
      description: description
    }).then((res) => {
      
    })
  };
 function emailValid(email, password){
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^[A-Za-z\d]{6,}$/;
  if (!email.match(emailRegex)){
    alert("Erreur: votre email est invalide")
  } else if(!password.match(passwordRegex)){
    alert("Mot de passe trop court ou mauvais caractères utilisés \n 6 caractères minimum (Lettres ou numéros)")
  } else{
  signup()
  window.location.reload()
  alert("Compte crée veuillez vous pouvez vous connecter à présent")
  }
 }
  return (
    <div>
      {user && <button onClick={openModal} className="userbutton">S'inscrire</button>}
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
        <div className="form">Password ( 6 lettres ou caractères minimum)
          <form>
            <input id="inputPassword" type="password" onChange={(e) => {
              setPassword(e.target.value)
            }} /> <br />


          </form>
        </div>
        <div className="form"> Description
          <form>
            <textarea id="inputDescription" onChange={(e) => {
              setDescription(e.target.value)
            }} />
          </form>
        </div>
        <button onClick={(() => signup, () => emailValid(email, password)) }>Valider</button>
      </Modal>
    </div>

  );
}
export default Signup