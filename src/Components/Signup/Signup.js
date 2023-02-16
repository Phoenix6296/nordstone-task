import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import styles from './Signup.module.css'
import { Link } from 'react-router-dom'
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);

    //Visibility Handler of Password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //Logic for Email, Password and Confirm Password
    const handleEmail = (e) => {
        setEmail(e.target.value);
        e.target.value.includes('@') ? setCheckEmail(true) : setCheckEmail(false);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        e.target.value.length >= 8 && e.target.value.match(/[A-Z]/) && e.target.value.match(/[a-z]/) && e.target.value.match(/[0-9]/) && e.target.value.match(/[!@#$%^&*]/) ? setCheckPassword(true) : setCheckPassword(false);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        e.target.value === password ? setCheckConfirmPassword(true) : setCheckConfirmPassword(false);
    }

    //Logic for Submit Form
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Submitted');
    }
    return (
        <div className={`${styles.container__wrapper} ${styles.center}`}>
            <div className={`${styles.container} ${styles.center}`}>
                <h1>Signup</h1>
                <form action="" type="submit" className={`${styles.form} ${styles.center}`}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput type='email' id="email" label="Email"
                            onChange={handleEmail}
                            value={email}
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
                                    <IconButton edge="end">
                                        <Tooltip title="At least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character">
                                            <InfoIcon sx={{ mb: 1 }} />
                                        </Tooltip>
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={handlePassword}
                            value={password}
                            required
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput type='password' id="confirm-password" label="Confirm Password"
                            onChange={handleConfirmPassword}
                            value={confirmPassword}
                            required />
                    </FormControl>
                    <Button variant="contained" onClick={submitHandler}
                        disabled={!checkEmail || !checkPassword || !checkConfirmPassword}
                    >Signup</Button>
                </form>
                <Link to="/login" className={styles.link}>Already have an account? Login</Link>
            </div>
        </div>
    )
}

export default Signup