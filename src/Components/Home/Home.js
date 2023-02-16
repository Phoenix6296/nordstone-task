import { useEffect } from 'react'
import styles from './Home.module.css'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav'

const Home = (props) => {
    const navigate = useNavigate();
    const onLogoutHandler = () => {
        auth.signOut();
        navigate('/signup');
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) { navigate('/login'); }
        });
        return unsubscribe;
    }, [navigate]);
    return (
        <div className={styles.home}>
            <Nav />
            <p>{`Home ${props.user}`}</p>
            <button onClick={onLogoutHandler}>Logout</button>
        </div>
    )
}

export default Home