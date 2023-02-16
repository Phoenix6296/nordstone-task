
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  //Visibility Handler of Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Logic for Email and Password
  const handleEmail = (e) => {
    setEmail(e.target.value);
    e.target.value.includes('@') ? setCheckEmail(true) : setCheckEmail(false);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    e.target.value.length >= 8 && e.target.value.match(/[A-Z]/) && e.target.value.match(/[a-z]/) && e.target.value.match(/[0-9]/) && e.target.value.match(/[!@#$%^&*]/) ? setCheckPassword(true) : setCheckPassword(false);
  }
  //Logic for Submit Form
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Submitted');
  }


  return (
    <div className={`${styles.container__wrapper} ${styles.center}`}>
      <div className={`${styles.container} ${styles.center}`}>
        <h1>Login</h1>
        <form action="" type="submit" className={`${styles.form} ${styles.center}`}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput type='email' id="email" label="Email"
              onChange={handleEmail}
              value={email} />
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
              value={password}
            />
          </FormControl>
          <div className="forgot_password">
            <Link to="/forgot_password" className={styles.link}>Forgot Password?</Link>
          </div>
          <Button variant="contained" onClick={submitHandler} disabled={!(checkEmail && checkPassword)}>Login</Button>
        </form>
        <Link to="/signup" className={styles.link}>New User? Signup</Link>
      </div>
    </div>
  )
}

export default Login