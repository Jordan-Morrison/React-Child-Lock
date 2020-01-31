import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SiteLock(props) {

    const [errorText, setErrorText] = useState(null);

    const loginScreen = useRef(null);
    const passwordInput = useRef(null);

    function checkPassword() {
        if (passwordInput.current.value === props.password){
            if (props.localStorage && localStorage){
                localStorage.siteLockPass = passwordInput.current.value;
            }
            loginScreen.current.remove();
        }
        else{
            setErrorText(props.errorText);
        }
    }

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

    useEffect(() => {
        if (props.localStorage && localStorage){
            if (localStorage.siteLockPass === props.password){
                loginScreen.current.remove();
            }
        }
    },[])

    return (
        <div style={setBackground()} ref={loginScreen}>
            <div style={styles.contentBox}>
                {props.customContent}
                <div style={styles.inputDiv}>
                    <h1>{props.inputLabelText}</h1>
                    <input style={styles.inputBox} ref={passwordInput} type="password"></input>
                </div>
                <p style={styles.errorText}>{errorText}</p>
                <button style={styles.button} onClick={checkPassword}>{props.buttonText}</button>
            </div>
        </div>
    );
}

SiteLock.propTypes = {
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

SiteLock.defaultProps = {
    password: "Password",
    inputLabelText: "Password:",
    buttonText: "Enter Site",
    errorText: "Sorry, that password is incorrect",
    background: {
        image: `https://source.unsplash.com/random/${window ? window.innerWidth : 1000}x${window ? window.innerHeight : 800}`
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
        fontSize: "2em",
        marginLeft: 10
    },
    errorText: {
        color: "red",
        margin: 0,
        fontSize: "1em"
    },
    button: {
        fontSize: "1.5em",
        padding: "10px 30px",
        marginTop: 20
    }
}