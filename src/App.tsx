import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProtectedRoute from "./security/ProtectedRoute";
import Login from "./security/Login";
import Amplify, { Auth } from "aws-amplify";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from '@mui/material/Card';
import Admin from './components/Admin';
import AWS, { } from 'aws-sdk';

const region = process.env.AWS_REGION;
const userPoolId = process.env.AWS_USER_POOL;
const userPoolWebClientId = process.env.AWS_POOL_WEB_CLIENTID;
const domain = process.env.AWS_COGNITO_DOMAN;
const signInUrl = process.env.AWS_COGNITO_REDIRECTSIGNIN;
const signOutUrl = process.env.AWS_COGNITO_REDIRECTSIGNOUT;

AWS.config.region = region;
Amplify.configure({
  Auth: {
    //identityPoolId: "us-east-xxxxx" // OPTIONAL - Amazon Cognito Identity Pool ID
    region: region, // REQUIRED - Amazon Cognito Region
    userPoolId: userPoolId, // REQUIRED - Amazon Cognito User Pool ID
    userPoolWebClientId: userPoolWebClientId, // OPTIONAL - Amazon Cognito Web Client ID
    oauth: {
      domain: domain,
      scope: [
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin"
      ],
      redirectSignIn: signInUrl,
      redirectSignOut: signOutUrl,
      responseType: "token"
    }
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={Admin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
