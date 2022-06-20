import React, { useState, useEffect } from "react";
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

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription]= useState("")

  // Transforme le bouton S incrire en bouton Profil
  const [user, setUser] = useState(0)
  useEffect(() => {

      var id = sessionStorage.getItem("id")
      if (id == null) {
          id = " "


      } else {
          id = null
         
      }
      sessionStorage.getItem("id", id)
      setUser(id)

  }, []);

  const  signup  = () => {
    Axios.post("http://localhost:4200/api/user/signup", {
      pseudo: pseudo,
      email: email,
      password: password,
      description:description
    }).then((res) => {
      console.log(res);
        })
        

  };
  
  return (
    <div>
      {user &&<button onClick={openModal} className="userbutton">S'inscrire</button>}
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
        <div className="form">Password
        <form>
          <input id="inputPassword" type="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} /> <br />
                    
                    
        </form>
        </div>
        <div className="form"> Description
          <form>
          <textarea id="inputDescription"  onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
          </form>
        </div>
        <button onClick={signup}>Valider</button>
      </Modal>
    </div>

  );
}
export default Signup