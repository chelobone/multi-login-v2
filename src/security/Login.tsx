import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import 'crypto-js/lib-typedarrays';
import React from "react";
import { cognitoUserInfo } from '../utils/userHelper';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const userInfo = cognitoUserInfo();

    React.useEffect(() => {
        (async () => {
            userInfo.then(user=>{
                setEmail(user.attributes.email);
            });
        })();
    });

    const logIn = async (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(email, password);
            await Auth.signIn(email, password);
            console.log("Login Correcto");
            setLoading(false);
            //navigate('/');
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const userLogin = () => {
        //if (window.location.hostname === window_name) {
        console.log("Starting Login");
        
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Cognito }).then(cred => {
            // If success, you will get the AWS credentials
            console.log("Cred: " + cred);
        }).then(user => {
            // If success, the user object you passed in Auth.federatedSignIn
            console.log("User: " + user);
        }).catch(e => {
            console.log("ERROR: " + e)
        })
        // } else {
        //     console.log("Skipping login because window.location.hostname doesn't match")
        // }
    }

    const userSignOut = () => {
        Auth.signOut().then(res => {
            console.log(res);
        });
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                onClick={userLogin}
                hidden={email === "" ? false : true}
            //disabled={loading}
            >
                {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                Login to Your AzureAD
            </Button>

            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                onClick={userSignOut}
            //disabled={loading}
            >
                {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                Log Out
            </Button>
        </div>
    );
}

export default Login;