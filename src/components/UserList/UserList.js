import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {doc,updateDoc, arrayRemove, collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase.js";
import {AuthContext} from "../../context/AuthProvider";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const UserList = () => {

  const {userSession, userData} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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

  }, [userSession, isClicked]);

  const removeTodo = async (actualTodo) => {
    setIsClicked(true);
    await updateDoc(doc(db, "users", `${userData[0]?.id}`), {
      todoslist: arrayRemove(actualTodo)
    });
    console.log(userData[0]?.id);

    setIsClicked(false);
  }
  


  
  

  return(
    <>
      <nav className="navbar  navbar-dark bg-dark rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Ma liste de tâches</a>
          <Link to="addtodo" className="btn btn-outline-light">Ajouter</Link>
        </div>
      </nav>
      
      {
        data[0]?.todoslist.length != 0 ? (
          <ul className="list-group mt-5">
              { 
                  data[0]?.todoslist.slice(0).reverse().map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                      {todo}
                      <span>
                        <AiFillDelete onClick={() =>  removeTodo(todo)}  role="button" className="text-danger pointer" size="20"/>
                        <Link to={`edittodo/${todo}`}><FiEdit  role="button" className="mx-4 text-warning" size="20"></FiEdit></Link>

                      </span>
                    </li>
                 ))
              }
          </ul>
        ):(
          <p className="text-center mt-5 h3">Votre liste de tâche est vide</p>
        )
      }
     
    </>
  );
}

export default UserList;