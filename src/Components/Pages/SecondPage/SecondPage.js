import Nav from '../../Nav/Nav';
import { useState, useEffect } from 'react';
import styles from './SecondPage.module.css';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button } from '@mui/material';
import { auth, storage } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import SyncLoader from "react-spinners/SyncLoader";

const SecondPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [state, setState] = useState({
        isAuthenticated: false,
        imageUrls: [],
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('Upload an image');
    const [selectedImage, setSelectedImage] = useState(null);

    const onUploadHandler = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        if (e.target.files[0].name.length > 20)
            setFileName(e.target.files[0].name.substring(0, 30) + '...');
    };

    const uploadFile = () => {
        if (file == null || !auth.currentUser) return;

        const userId = auth.currentUser.uid;
        const imageName = selectedImage
            ? selectedImage.substring(selectedImage.lastIndexOf('/') + 1)
            : file.name + v4();
        const imageRef = ref(storage, `images/${userId}/${imageName}`);
        const uploadTask = uploadBytes(imageRef, file);

        if (selectedImage) {
            const selectedImageRef = ref(storage, selectedImage);
            deleteObject(selectedImageRef);
        }

        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                if (selectedImage) {
                    setState((prevState) => ({
                        ...prevState,
                        imageUrls: prevState.imageUrls.map((imageUrl) =>
                            imageUrl === selectedImage ? url : imageUrl
                        ),
                    }));
                    setSelectedImage(null);
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        imageUrls: [...prevState.imageUrls, url],
                    }));
                }
            });
        });
        setFile(null);
        setFileName('Upload an image');
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            const isAuthenticated = user != null;
            setState((prevState) => ({
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
            setState((prevState) => ({
                ...prevState,
                imageUrls: urls,
            }));
            setIsLoading(false);
        });
    }, [state.isAuthenticated]);

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
        <div className={styles.container}>
            <Nav />
            <div className={styles.upload}>
                <div className={`${styles.upload_icons}`}>
                    <input type="file" id="uploadImage" accept="image/*" onChange={onUploadHandler} />
                    <label htmlFor="uploadImage">
                        <FileUploadOutlinedIcon className={styles.uploadIcon} />
                        {fileName}
                    </label>
                </div>
                <Button variant="contained" color="primary" onClick={uploadFile}>
                    Upload
                </Button>
            </div>
            <div className={styles.content}>
                <div className={`${styles.images} ${styles.center}`}>
                    {state.imageUrls.map((imageUrl, index) => (
                        <div key={index} className={`${styles.image_container} ${styles.center}`}>
                            <img src={imageUrl} alt="gallery" />
                            <div className={`${styles.overlay} ${styles.center}`}>
                                <label htmlFor="replaceImage">Replace</label>
                                <input
                                    type="file"
                                    id="replaceImage"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setSelectedImage(imageUrl);
                                        setFile(e.target.files[0]);
                                        setFileName(e.target.files[0].name);
                                        if (e.target.files[0].name.length > 20)
                                            setFileName(e.target.files[0].name.substring(0, 30) + '...');
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    onClick={() => {
                                        const userId = auth.currentUser.uid;
                                        const imageName = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
                                        const imageRef = ref(storage, `images/${userId}/${imageName}`);
                                        const uploadTask = uploadBytes(imageRef, file);
                                        if (selectedImage) {
                                            const selectedImageRef = ref(storage, selectedImage);
                                            deleteObject(selectedImageRef);
                                        }
                                        uploadTask.then((snapshot) => {
                                            getDownloadURL(snapshot.ref).then((url) => {
                                                setState(prevState => ({
                                                    ...prevState,
                                                    imageUrls: prevState.imageUrls.map((imageUrl) => imageUrl === selectedImage ? url : imageUrl),
                                                }));
                                                setSelectedImage(null);
                                                setFile(null);
                                                setFileName('Upload an image');
                                            });
                                        });
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SecondPage;