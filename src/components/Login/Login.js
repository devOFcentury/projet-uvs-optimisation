import React, {useState, } from "react";
import{Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase.js";

 const Login = () => {

  const navigate = useNavigate();

  const initialData = {
    email: '',
    password: '',
  }

  const [error, setError] = useState("");
  const [loading, setLoading] = useState( false);

  const [data, setData] = useState(initialData);

  const {email, password} = data

  const handleChange = (e) => {
    setError('');
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if(!navigator.onLine) {
      return setError("Vérifier votre connexion internet");
    }

    if (email === "" || password === "") {
      return setError("Veuillez remplir les champs vides");
    }

    if (password.length < 6) {
      return setError("Mot de passe court (au moins 6 caracteres)");
    }


    try {
      setError('')
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      navigate('/home');
      
    } catch (err) {
      setLoading(false)
      if(err.code === 'auth/invalid-email'){
        return setError(`L'adresse email est invalide !`)
      }
      if(err.code === 'auth/user-not-found'){
        return setError('Utilisateur introuvable !')
      }
      if(err.code === 'auth/wrong-password'){
        return setError('Email ou Mot de passe incorrecte')
      }
    }
    setLoading(false);
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form className="border p-3 rounded" onSubmit={handleSubmit}>
          <h2 className="text-center">Connexion</h2>
          {
            error !== '' &&
            <div className="mb-3 border border-danger p-2 rounded text-center text-danger">
              {error}
            </div> 
          }
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
            <button className="btn btn-success">
              {
                  loading ? 'CONNEXION EN COURS...' : 'SE CONNECTER'
              }
              
              </button>
          </div>

          <div className="mb-3 row">
            <Link className="col" to="/registration">S'INSCRIRE</Link>
            <Link className="col" to="/forgotpassword">Mot de passe oubliée</Link>
          </div>

      </form>
    </div>
  );
}


export default Login