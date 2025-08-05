import {useContext, useEffect, useState} from "react";
import {AuthContext} from "react-oauth2-code-pkce";


const SignedIn = ({children}) => {
    const {token,logIn} = useContext(AuthContext);
    const [triggeredLogin, setTriggeredLogin] = useState(false);

    useEffect(() => {
        if (!token && !triggeredLogin) {
            setTriggeredLogin(true);
            logIn(); // This redirects to Keycloak login
        }
    }, [token, triggeredLogin, logIn]);

    if (!token) {
        // Optional: show spinner or "Redirecting..."
        return <p>Redirecting to login...</p>;
    }

    return children;
}
export default SignedIn;