import React from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import styles from './StartPage.module.css';

export const StartPage = () => {

    const navigate = useNavigate();
    const nextPath = (path) => {
        navigate(path);
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>
                    Joiner
                </h1>
            </div>
            <div className={styles.buttonWrapper}>
                <Button variant="outlined"
                        color={'simple'}
                        onClick={() => nextPath("/login")}
                >
                    LOG IN
                </Button>
                <Button variant="contained"
                        color={'simple'}
                        onClick={() => nextPath("/register")}
                >
                    REGISTER
                </Button>
            </div>
        </div>
    );
}