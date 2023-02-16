import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Signup from './Components/Signup/Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { auth } from './firebase';

const App = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUserName(user.displayName) : setUserName("No resolved");
    });
    return unsubscribe;
  }, [userName]);

  return (
    <div className={`${styles.app}`}>
      <Routes>
        <Route path="/" element={<Home user={userName} />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/login" element={<Login />} exact />
      </Routes>
    </div>
  );
};

export default App;
