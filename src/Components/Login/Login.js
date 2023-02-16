
import { useState, useEffect } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const Login = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' })
  const [userValidation, setUserValidation] = useState({ email: false, password: false })

  const [error, setError] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000)
  }, [error])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) { navigate('/'); }
    });
    return unsubscribe;
  }, [navigate]);

  //Logic for Submit Form
  const submitHandler = () => {
    signInWithEmailAndPassword(auth, user.email, user.password).then((res) => {
      console.log(res);
      props.fetch(res);
      navigate('/');
    }).catch(err => { setError(err.message); })
  }

  //Logic for Email and Password
  const handleEmail = (e) => {
    setUser({ ...user, email: e.target.value })
    e.target.value.includes('@') ? setUserValidation({ ...userValidation, email: true }) : setUserValidation({ ...userValidation, email: false });
  }
  const handlePassword = (e) => {
    setUser({ ...user, password: e.target.value })
    e.target.value.length >= 8 && e.target.value.match(/[A-Z]/) && e.target.value.match(/[a-z]/) && e.target.value.match(/[0-9]/) && e.target.value.match(/[!@#$%^&*]/) ? setUserValidation({ ...userValidation, password: true }) : setUserValidation({ ...userValidation, password: false });
  }
  //Visibility Handler of Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  return (
    <div className={`${styles.container__wrapper} ${styles.center}`}>
      <div className={`${styles.container} ${styles.center}`}>
        <h1>Login</h1>
        <form action="" type="submit" className={`${styles.form} ${styles.center}`}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput type='email' id="email" label="Email"
              onChange={handleEmail}
              value={user.email}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={handlePassword}
              value={user.password}
            />
          </FormControl>
          <div className="forgot_password">
            <Link to="/login/forgot_password" className={styles.link}>Forgot Password?</Link>
          </div>
          <p className={styles.error_message}>{error}</p>
          <Button variant="contained" onClick={submitHandler}
            disabled={!userValidation.email || !userValidation.password}
          >Login</Button>
        </form>
        <Link to="/signup" className={styles.link}>New User? Signup</Link>
      </div>
    </div>
  )
}

export default Login