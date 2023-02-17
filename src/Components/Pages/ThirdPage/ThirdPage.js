import Nav from '../../Nav/Nav'
import { useState, useEffect } from 'react'
import styles from './ThirdPage.module.css'
import { auth } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../../firebase'
import { v4 } from 'uuid'
import SyncLoader from "react-spinners/SyncLoader";

const ThirdPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const userId = auth.currentUser.uid;
        await addDoc(collection(db, 'texts'), {
            text,
            userId,
            createdAt: new Date()
        });
        setText('');
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsAuthenticated(true);
                // Get the current user's ID
                const userId = user.uid;
                // Set up a Firestore listener for texts created by the current user
                const q = query(collection(db, 'texts'), where('userId', '==', userId));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const texts = [];
                    snapshot.forEach((doc) => {
                        texts.push({ id: doc.id, ...doc.data() });
                    });
                    setData(texts);
                });
                return unsubscribe;
            } else {
                navigate('/login');
            }
        });
        setIsLoading(false);
        return unsubscribe;
    }, [navigate]);

    if (isLoading)
        return (
            <div className={styles.loader}>
                <SyncLoader
                    loading={isLoading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    return (
        <>
            {isAuthenticated && <Nav />}
            <div className={styles.thirdpg}>
                <div className={`${styles.input} ${styles.center}`}>
                    <TextField id="outlined-basic" label="Enter the text" size="small" value={text} variant="outlined" fullWidth onChange={(e) => setText(e.target.value)} />
                    <Button variant="outlined" onClick={submitHandler} disabled={!text}>Submit</Button>
                </div>
                <div className={styles.data}>
                    {data.map((item) => (
                        <p key={v4()} className={styles.text_data}>{item.text}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ThirdPage
