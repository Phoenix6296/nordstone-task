import styles from './App.module.css'
import SplashScreen from './Components/SplashScreen/SplashScreen'
const App = () => {
  return (
    <div className={`${styles.app}`}>
      <SplashScreen />
      <h1>App</h1>
    </div>
  )
}

export default App