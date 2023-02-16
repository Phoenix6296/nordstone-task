import styles from './App.module.css'
import Signup from './Components/Signup/Signup'
// import SplashScreen from './Components/SplashScreen/SplashScreen'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'

const App = () => {
  return (
    <div className={`${styles.app}`}>
      {/* <SplashScreen /> */}
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/login" element={<Login />} exact />
      </Routes>
    </div>
  )
}

export default App