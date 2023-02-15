import React, { useState, useEffect } from 'react';
import styles from './SplashScreen.module.css';
import Logo from '../../Assets/Images/logo.png';

const SplashScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            document.querySelector(`.${styles.ss}`).remove();
        }, 2000);
    }, []);

    const handleAnimationEnd = () => { setIsLoading(false); };

    return (
        <div className={`${styles.ss} ${isLoading ? styles.show : styles.hide}`}>
            <img src={Logo} alt="Logo" className={`${styles.ss_img} ${isLoading ? styles.show : styles.hide}`} onTransitionEnd={handleAnimationEnd} />
        </div >
    );
};

export default SplashScreen;
