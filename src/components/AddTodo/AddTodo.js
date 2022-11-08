import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {doc, updateDoc, arrayUnion} from "firebase/firestore";
import {db} from "../../firebase.js";
import {AuthContext} from "../../context/AuthProvider";

const AddTodo = () => {

  const navigate = useNavigate();

  const [todo, setTodo] = useState("");


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const { userData } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();   
   
    try{
      setLoading(true);
  
      await updateDoc(doc(db, "users", `${userData[0]?.id}`), {
        todoslist: arrayUnion(todo)
      });
  
      setTodo("");
      setLoading(false);
      navigate("/home");

    } catch (error) {
      setLoading(false);
      setError(error);
    }
    
  }

  const disabled = todo === "";

  return(
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Ajouter une tâche</h2>
        {
          error !== '' &&
          <div className="mb-3 border border-danger p-2 rounded text-center text-danger">
            {error}
          </div> 
        }
        <div className="mb-3">
          <input 
            type="text" 
            placeholder="votre tâche" 
            className="form-control"
            value={todo}
            onChange={e => {
              setError("");
              setTodo(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 row">
          <button className="btn btn-success col mt-2" disabled={disabled}>
            {loading ? 'Ajout en cours...': 'Ajouter'}
          </button>
          <Link to="/home" className="link btn btn-danger ms-1 offset-2 col mt-2">Annuler</Link>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;