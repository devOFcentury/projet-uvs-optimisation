import React, {useEffect, useContext} from "react";
import {onAuthStateChanged,signOut} from 'firebase/auth';
import { useNavigate, Routes, Route } from "react-router-dom";
import {getDocs, collection, query, where} from "firebase/firestore";
import {AuthContext} from "../../context/AuthProvider";
import {db, auth} from "../../firebase.js";
import UserList from "../UserList/UserList.js";
import AddTodo from "../AddTodo/AddTodo.js";
import EditTodo from "../EditTodo/EditTodo.js";
import "./Home.css";

 const Home = () => {

  const navigate = useNavigate();

  const {
      userSession,
     setUserSession,
     userData,
     setUserData
  } = useContext(AuthContext);
  

  const logout = async () => {
    signOut(auth)
    .then(() => navigate("/"))
    .catch((err) => console.log('OOOPS une erreur: ' + err));
  }

  useEffect(() => {
    let listener = onAuthStateChanged(auth,user => {
      user ? setUserSession(user) : navigate("/");
    });

    const getUserInfo = async () => {
      const q = query(collection(db, "users"), where("email", "==", `${userSession.email}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      });
    }

    if(!!userSession) {
      getUserInfo();
    }

    return () => {
      listener();
    }
  }, [userSession]);




  return userSession === null ? (
    <div className="loading-auth"></div>
  ):
  (
    <div>
     <header className="mt-4 mb-5 me-5 d-flex justify-content-end">
        <div className="dropdown">
          <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           {userData.length !== 0 ? `${userData[0]?.firstName} ${userData[0]?.lastName}`: 'Loading...'}
          </a>

          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={logout}>Déconnexion</a></li>
          </ul>
        </div>
     </header>
     
     <Routes>
        <Route path="/" element={<UserList />} />
        <Route path='addtodo' element={<AddTodo />} />
        <Route path='edittodo/:todoparam' element={<EditTodo />} />
     </Routes>
    
    </div>
  );
}


export default Home