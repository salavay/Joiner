import React, {useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import styles from "../register/RegisterPage.module.css";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

export const LoginPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const {loading, request} = useHttp();
    const [form, setForm] = useState({userNameOrEmail: '', password: ''});

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            navigate("/");
        } catch (e) {
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <FontAwesomeIcon icon={faAngleLeft} onClick={() => {
                    navigate("/");
                }}/>
            </div>
            <div className={styles.registerTitle}>
                Log in
            </div>
            <div className={styles.formContainer}>
                <TextField
                    className={styles.formInput}
                    label={"Username or email"}
                    color={'simple'}
                    name={'userNameOrEmail'}
                    value={form.userNameOrEmail}
                    onChange={changeHandler}
                    focused
                />
                <TextField
                    className={styles.formInput}
                    label={"Password"}
                    color={'simple'}
                    name={'password'}
                    value={form.password}
                    onChange={changeHandler}
                    type={"password"}
                    focused
                />
                <Button variant="contained"
                        color={'simple'}
                        onClick={loginHandler}
                >
                    LOG IN
                </Button>
            </div>
        </div>
    )
}

