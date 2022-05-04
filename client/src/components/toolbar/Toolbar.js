import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHouse, faMagnifyingGlass, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {IconButton} from "@mui/material";
import styles from "./Toolbarr.module.css";
import {useNavigate} from "react-router-dom";

function Toolbar() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <IconButton color={'simple'} onClick={() => navigate('/')}>
                <FontAwesomeIcon icon={faHouse}/>
            </IconButton>
            <IconButton color={'simple'} onClick={() => navigate('/search')}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </IconButton>
            <span className={styles.addMeetButton} >
                <FontAwesomeIcon icon={faPlus} color={'white'}/>
            </span>
            <IconButton color={'simple'} onClick={() => navigate('/chats')}>
                <FontAwesomeIcon icon={faComment}/>
            </IconButton>
            <IconButton color={'simple'} onClick={() => navigate('/profile')}>
                <FontAwesomeIcon icon={faUser}/>
            </IconButton>
        </div>
    );
}

export default Toolbar;