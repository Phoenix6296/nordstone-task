import styles from './ForgotPassword.module.css'
import { useState, useEffect } from 'react'
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('')
    const [emailValidation, setEmailValidation] = useState(false)
    //If user is logged in, redirect to home page
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) { navigate('/'); }
        });
        return unsubscribe;
    }, [navigate]);

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 3000)
    }, [error])

    const handleEmail = (e) => {
        setEmail(e.target.value);
        e.target.value.includes('@') ? setEmailValidation(true) : setEmailValidation(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email).then(() => {
            setError('Password reset email sent successfully');
            setTimeout(() => {
                navigate('/login');
            }, 3000)
        }).catch(err => {
            setError(err.message);
        })
    }
    return (
        <div className={`${styles.container__wrapper} ${styles.center}`}>
            <div className={`${styles.container} ${styles.center}`}>
                <h1>Reset Password</h1>
                <form action="" type="submit" className={`${styles.form} ${styles.center}`}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput type='email' id="email" label="Email" onChange={handleEmail} value={email} />
                    </FormControl>
                    <p className={styles.error_message}>{error}</p>
                    <Button variant="contained" onClick={submitHandler} disabled={!emailValidation}>Send</Button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword