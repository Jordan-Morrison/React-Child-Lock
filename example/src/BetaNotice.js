import React from 'react';
import warning from './warning.png';

export default function BetaNotice() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <p>We're under development!</p>
            <img src={warning} alt="Warning symbol"/>
            <p>Only users with the access code may enter</p>
        </div>
    );    
}
