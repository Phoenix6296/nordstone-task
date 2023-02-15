import styles from './App.module.css'
import Signup from './Components/Signup/Signup'
import SplashScreen from './Components/SplashScreen/SplashScreen'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className={`${styles.app}`}>
      <SplashScreen />
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App