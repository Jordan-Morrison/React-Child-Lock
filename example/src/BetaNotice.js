import React from 'react';
import React_Logo from './React_Logo.png';

export default function BetaNotice() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <p>We're under development!</p>
            <img src={React_Logo} alt="React logo"/>
            <p>Only users with the access code may enter</p>
        </div>
    );    
}
