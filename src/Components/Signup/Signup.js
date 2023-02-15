import React, { useState } from 'react';
import styles from './Signup.module.css';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);
        let value = e.target.value;
        if (value.length === 0) {
            setPasswordStrength('');
        } else if (/(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)) {
            setPasswordStrength('strong');
        } else {
            setPasswordStrength('weak');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordStrength !== 'strong') {
            setPassword('');
            return;
        }
        console.log({ email, password });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Signup</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.password}>
                        <label htmlFor="password">Password</label>
                        <Tooltip title="At least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character">
                            <InfoIcon sx={{ mb: 1 }} />
                        </Tooltip>
                        <div className={`${styles.pass_strength} ${styles[passwordStrength]}`}></div>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
