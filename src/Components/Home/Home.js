import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav'

const Home = (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            user ? setIsAuthenticated(true) : navigate('/login');
        });
        return unsubscribe;
    }, [navigate]);

    return (
        <div className={styles.home}>
            {isAuthenticated && <Nav />}
        </div>
    )
}

export default Home
