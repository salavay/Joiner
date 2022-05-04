import React, {useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import styles from "./RegisterPage.module.css";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {request} = useHttp();
    const [form, setForm] = useState({username: '', email: '', password: ''});

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async () => {
        try {
            console.log(form);
            const data = await request('/api/auth/register', 'POST', {...form});
            navigate("/login");
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
                Register
            </div>
            <div className={styles.formContainer}>
                <TextField
                    className={styles.formInput}
                    label={"Username"}
                    color={'simple'}
                    name={'username'}
                    value={form.username}
                    onChange={changeHandler}
                    focused
                />
                <TextField
                    className={styles.formInput}
                    label={"Email"}
                    color={'simple'}
                    name={'email'}
                    value={form.email}
                    onChange={changeHandler}
                    type={"email"}
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
                        onClick={registerHandler}
                >
                    Register
                </Button>
            </div>
        </div>
    )
}

