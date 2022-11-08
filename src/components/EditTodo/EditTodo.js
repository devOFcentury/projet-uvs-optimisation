import React, {useState, useContext, useEffect} from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import {doc, query, collection, getDocs, where, updateDoc} from "firebase/firestore";
import {db} from "../../firebase.js";
import {AuthContext} from "../../context/AuthProvider";


const EditTodo = () => {


  const {userSession, userData} = useContext(AuthContext);
  const navigate = useNavigate();


  const {todoparam} = useParams();
  const [todo, setTodo] = useState(todoparam);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getUserInfo = async () => {
      const q = query(collection(db, "users"), where("email", "==", `${userSession.email}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setData(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      });
    }
      getUserInfo();
    
  }, [userSession]);


  const handleSubmit = async e => {
    e.preventDefault();
    if(todo === "") {
        return setError("Champ vide !!!!");
    }

    

    try{
      setLoading(true);

      const newTodoslist = data[0]?.todoslist.map(el => {
        if(el === todoparam) {
          return todo;
        }
        return el;
      });

      await updateDoc(doc(db, "users", userData[0]?.id), {
        todoslist: newTodoslist
      });


      setTodo("");
      setLoading(false);
      navigate("/home");

    } catch (error) {
      setLoading(false);
      setError(error);
    }
    
  }

  return(
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Modifier une tâche</h2>
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
            onChange={e => setTodo(e.target.value)}
          />
        </div>
        <div className="mb-3 row">
          <button className="btn btn-success col mt-2" onClick={handleSubmit}>
            {loading ? 'Modification en cours...': 'Modifier'}
          </button>
          <Link to="/home" className="btn btn-danger ms-1 offset-2 col mt-2">Annuler</Link>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;