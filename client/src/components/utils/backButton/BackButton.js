import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function BackButton({needToRefresh = true}) {
    const navigate = useNavigate();

    const goBack = refresh => {
        navigate(-1);
    }

    return (
        <div>
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => goBack(needToRefresh)}/>
        </div>
    );
}

export default BackButton;