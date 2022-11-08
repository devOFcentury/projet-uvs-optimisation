import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../firebase.js";

 const Registration = () => {

  const navigate = useNavigate();

  const initialData = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialData);

  const {lastName, firstName, email, password, confirmPassword} = data;

  const handleChange = (e) => {
    setError("");
    setData({...data, [e.target.name]: e.target.value});
  }

  const handeSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return setError("Veuillez remplir les champs vides");
    }

    if (password.length < 6) {
      return setError("Mot de passe court (au moins 6 caracteres)");
    }
    if (password !== confirmPassword) {
      return setError("Les mots de passe doivent correspondre !");
    }

    try {

      setLoading(true);
      setError("");

      await createUserWithEmailAndPassword(auth, email, password);
      
      await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        email,
        password,
        todoslist: []
      });

      setSuccess("Inscription reussie !");
      setData(initialData);

      setTimeout(() => {
        navigate("/");
      }, 1500);

      
      
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        return setError(
          `L'adresse e-mail fournie est déjà utilisée par un utilisateur existant !`
        );
      }
      if (err.code === "auth/invalid-email") {
        return setError(
          `La valeur fournie pour la propriété d'utilisateur de email n'est pas valide !`
        );
      }
    }
    
    setLoading(false);
  }




  return (
    <div className="container d-flex justify-content-center pt-5">
      <form className="border p-3 rounded" onSubmit={handeSubmit}>
        <h2 className="text-center">Inscription</h2>
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
            className="form-control" 
            placeholder="Nom"
            name='lastName'
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input 
              type="text" 
              className="form-control" 
              placeholder="Prénom"
              name='firstName'
              value={firstName}
              onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input 
              type="email" 
              className="form-control" 
              placeholder="Email"
              name='email'
              value={email}
              onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input 
                type="password" 
                className="form-control" 
                placeholder="Mot de passe"
                name='password'
                value={password}
                onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input 
                type="password" 
                className="form-control" 
                placeholder="Confirmer mot de passe"
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success">
            {
              loading ? 'INSCRIPTION EN COURS...': " S'INSCRIRE"
            }
          </button>
        </div>

        <div className="mb-3 d-flex flex-column">
            <Link to="/">Déjà inscrit ? Connectez-vous</Link>
          </div>

    </form>
  </div>
  );
}


export default Registration