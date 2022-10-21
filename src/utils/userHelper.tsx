import { Auth } from "aws-amplify";
import { checkPrime } from "crypto";
import { useState } from "react";

export const userHelper = () => {

}
export const cognitoUserInfo = () => {
    let user: any;
    let userName = "";
    
    return Auth.currentAuthenticatedUser();
}