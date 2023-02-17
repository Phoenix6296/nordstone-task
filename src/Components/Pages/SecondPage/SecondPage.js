import Nav from '../../Nav/Nav'
import { useState, useEffect } from 'react'
import styles from './SecondPage.module.css'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button } from '@mui/material';
import { auth, storage } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";

const SecondPage = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        isAuthenticated: false,
        imageUrls: [],
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('Upload an image');
    const onUploadHandler = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        if (e.target.files[0].name.length > 20)
            setFileName(e.target.files[0].name.substring(0, 30) + '...');
    }
    const uploadFile = () => {
        if (file == null || !auth.currentUser) return;
        const userId = auth.currentUser.uid;
        const imageRef = ref(storage, `images/${userId}/${file.name + v4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setState(prevState => ({
                    ...prevState,
                    imageUrls: [...prevState.imageUrls, url],
                }));
            });
        });
        setFile(null);
        setFileName('Upload an image');
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            const isAuthenticated = user != null;
            setState(prevState => ({
                ...prevState,
                isAuthenticated,
            }));
            if (!isAuthenticated) {
                navigate('/login');
            }
        });
        return unsubscribe;
    }, [navigate]);
    useEffect(() => {
        if (!state.isAuthenticated) return;
        const userId = auth.currentUser.uid;
        const imagesListRef = ref(storage, `images/${userId}/`);
        listAll(imagesListRef).then((response) => {
            const urls = [];
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    urls.push(url);
                });
            });
            setState(prevState => ({
                ...prevState,
                imageUrls: urls,
            }));
        });
    }, [state.isAuthenticated]);

    return (
        <div className={styles.secondpg}>
            {state.isAuthenticated && <Nav />}
            <div className={`${styles.container} ${styles.center}`}>
                <div className={`${styles.upload}`}>
                    <div className={`${styles.button} ${styles.center}`}>
                        <FileUploadOutlinedIcon />
                        <label htmlFor="upload">Upload File</label>
                    </div>
                    <input id="upload" type="file" onChange={onUploadHandler} style={{ display: 'none' }} />
                    <div className={`${styles.filename} ${styles.center}`}>
                        {fileName}
                    </div>
                    <Button
                        className={styles.uploadButton}
                        onClick={uploadFile}
                        variant="contained"
                        size="medium"
                        disabled={file == null}
                    >
                        Upload
                    </Button>
                </div>
                <div className={`${styles.center}`}>
                    {state.imageUrls.length > 0 &&
                        <div className={`${styles.gallery}`}>
                            {state.imageUrls.map(url =>
                                <img key={url} src={url} alt="certificate" />
                            )}
                        </div>
                    }
                </div>
            </div >
        </div >
    );
}

export default SecondPage;