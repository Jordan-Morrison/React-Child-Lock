import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ChildLock(props) {

    const [errorText, setErrorText] = useState(null);

    const loginScreen = useRef(null);
    const passwordInput = useRef(null);

    // Checks if the correct password is entered, if so unlocks the site
    function checkPassword() {
        if (passwordInput.current.value === props.password){
            if (props.localStorage && localStorage){
                localStorage.childLockPass = passwordInput.current.value;
            }
            loginScreen.current.remove();
        }
        else{
            setErrorText(props.errorText);
        }
    }

    // Checks & sets custom backgrounds, if no custom background is set then the default is used
    // Default styling uses a random image from unsplash set to the dimensions of the user's screen
    function setBackground() {
        if (props.background.color){
            return {
                ...styles.loginScreen,
                backgroundColor: props.background.color
            };
        }
        else if (props.background.image){
            return {
                ...styles.loginScreen,
                backgroundImage: `url(${props.background.image})`
            };
        }
        return styles.loginScreen;
    }

    // Checks if the user pressed enter to submit, if so checks the password
    function handleEnterSubmit(ev){
        if (ev.key === "Enter"){
            checkPassword();
        }
    }

    useEffect(() => {
        // If localstorage is enabled and the password is stored then the login screen is automatically bypassed
        if (props.localStorage && localStorage){
            if (localStorage.childLockPass === props.password){
                loginScreen.current.remove();
            }
        }
    },[])

    return (
        <div style={setBackground()} ref={loginScreen}>
            <div style={styles.contentBox}>
                {props.customContent}
                <div style={styles.inputDiv}>
                    <h1 style={styles.text}>{props.inputLabelText}</h1>
                    <input style={{...styles.inputBox, ...styles.text}} ref={passwordInput} onKeyPress={handleEnterSubmit} type="password"></input>
                </div>
                <p style={styles.errorText}>{errorText}</p>
                <button style={styles.button} onClick={checkPassword}>{props.buttonText}</button>
            </div>
        </div>
    );
}

ChildLock.propTypes = {
    password: PropTypes.string,
    localStorage: PropTypes.bool,
    customContent: PropTypes.element,
    background: PropTypes.oneOfType([PropTypes.shape({
        image: PropTypes.string.isRequired
    }), PropTypes.shape({
        color: PropTypes.string.isRequired
    })]),

    inputLabelText: PropTypes.string,
    buttonText: PropTypes.string,
    errorText: PropTypes.string
};

ChildLock.defaultProps = {
    password: "Password",
    inputLabelText: "Password:",
    buttonText: "Enter Site",
    errorText: "Sorry, that password is incorrect",
    background: {
        image: `https://source.unsplash.com/random/${typeof window !== "undefined" ? window.innerWidth : 1000}x${typeof window !== "undefined" ? window.innerHeight : 800}`
    }
};

const styles = {
    loginScreen: {
        color: "black",
        backgroundColor: "aliceblue",
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 999
    },
    contentBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 30,
        marginBottom: 100,
        borderRadius: 6,
        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.3)"
    },
    inputDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    inputBox: {
        marginLeft: 10,
        borderRadius: 3,
        border: "solid #5a5a5a 1px"
    },
    text: {
        fontSize: "1.5em"
    },
    errorText: {
        color: "red",
        margin: 0,
        fontSize: "1em"
    },
    button: {
        marginTop: 10,
        backgroundColor: "#335075",
        borderColor: "#335075",
        color: "white",
        padding: ".5em 1.5em",
        boxShadow: "0 4px #ddd",
        borderStyle: "outset",
        height: "auto",
        minWidth: 120,
        borderRadius: 4,
        fontSize: "1em",
        cursor: "pointer"
    }
}