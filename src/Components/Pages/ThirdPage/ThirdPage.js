import Nav from '../../Nav/Nav'
import { useState, useEffect } from 'react'
import styles from './ThirdPage.module.css'
import { auth } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
const ThirdPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            user ? setIsAuthenticated(true) : navigate('/login');
        });
        return unsubscribe;
    }, [navigate]);
    return (
        <div className={styles.text}>
            {isAuthenticated && <Nav />}
            <h1>Third Page</h1>
            <h1>Third Page</h1>
            <h1>Third Page</h1>
            <h1>Third Page</h1>
            <h1>Third Page</h1>
            <h1>Third Page</h1>
            <h1>Third Page</h1>
            <h1>Third Page</h1>
            <h1>Third Page</h1>
        </div>
    )
}

export default ThirdPage