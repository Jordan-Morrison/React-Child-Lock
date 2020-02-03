import React from 'react';
import ChildLock from 'react-child-lock';
import warning from './warning.png';

export default function App() {
    return (
        <div className="app">
            <ChildLock
                password="earlyAccess!"
                localStorage={true}
                customContent={<BetaNotice/>}
                background={{color: "blue"}}
                inputLabelText="Access Code:"
                buttonText="Enter"
                errorText="Incorrect password, please try again."
            />
            <h1>WELCOME TO MY SITE</h1>
        </div>
    )
}

export function BetaNotice() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <p>We're under development!</p>
            <img src={warning} alt="Warning symbol"/>
            <p>Only users with the access code may enter</p>
        </div>
    );    
}
