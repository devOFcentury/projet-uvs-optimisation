import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

 const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
      
    try {
      setError("");
      setSuccess("");
      await sendPasswordResetEmail(auth, email);
      setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
      setEmail("");

      setTimeout(() => {
        navigate("/login")
      }, 5000);

    } catch (err) {
      setError(err);
      setEmail("");
    }
   
  }

  const disabled = email === "";

  return (
    <div className="container d-flex justify-content-center pt-5">
      <form className="border p-3 rounded" onSubmit={handleSubmit}>
          <h2 className="text-center">MOT DE PASSE OUBLIÉ</h2>
          {
            error !== '' &&
            <div className="mb-3 border border-danger p-2 rounded text-center text-danger">
              {error}
              
            </div> 
          }
          {
            success !== '' &&
            <div className="mb-3 border border-success p-2 rounded text-center text-success">
              {success}
            </div> 
          }
          <div className="mb-3">
            <input 
              type="text" 
              className='form-control'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success" disabled={disabled}>Recuperer</button>
          
          <div className="mb-3 d-flex flex-column">
            <Link to="/">Déjà inscrit ? Connectez-vous</Link>
          </div>

      </form>
    </div>
  );
}


export default ForgotPassword;