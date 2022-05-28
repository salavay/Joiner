import React from 'react';
import {CircularProgress} from "@mui/material";

function Loader(props) {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <CircularProgress/>
        </div>
    );
}

export default Loader;