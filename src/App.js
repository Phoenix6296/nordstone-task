import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Signup from './Components/Signup/Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { auth } from './firebase';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import SecondPage from './Components/Pages/SecondPage/SecondPage';
import ThirdPage from './Components/Pages/ThirdPage/ThirdPage';
import FourthPage from './Components/Pages/FourthPage/FourthPage';

const App = () => {
  const [userName, setUserName] = useState(null);
  const fetchResponseFromLogin = (response) => {
    console.log(response, 'App.js');
  };
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
        <Route path="/login" element={<Login fetch={fetchResponseFromLogin} />} exact />
        <Route path="/login/forgot_password" element={<ForgotPassword />} exact />
        <Route path="/login/tab2" element={<SecondPage />} exact />
        <Route path="/login/tab3" element={<ThirdPage />} exact />
        <Route path="/login/tab4" element={<FourthPage />} exact />
      </Routes>
    </div>
  );
};

export default App;
