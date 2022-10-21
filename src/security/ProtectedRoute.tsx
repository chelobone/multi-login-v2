import React from "react";
import { Auth } from "aws-amplify";
import { Route, Navigate, Routes } from "react-router-dom";

interface Props {
    component: React.FC;
}
const ProtectedRoute: React.FC<Props> = ({ component }) => {
    const [isAuthenticated, setLoggedIn] = React.useState(true);
    React.useEffect(() => {
        (async () => {
            let user = null;
           
            try {
                var token = await Auth.currentSession();
                console.log(token);
                user = await Auth.currentAuthenticatedUser();
                
                console.log(user);
                if (user) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (e) {
                setLoggedIn(false);
                console.log(e);
            }
        })();
    });

    return (
        <div>
            {!isAuthenticated ? <Navigate to="/signin" /> : React.createElement(component)}
        </div>
        // <Route
        //   render={(props) =>
        //     isAuthenticated ? (
        //       React.createElement(component)
        //     ) : (
        //       <Navigate to="/signin" />
        //     )
        //   }
        // />
    );
};

export default ProtectedRoute;