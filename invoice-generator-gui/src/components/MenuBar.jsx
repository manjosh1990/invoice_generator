import {Link} from "react-router-dom";
import Logo from "./Logo.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "react-oauth2-code-pkce";

const MenuBar = () => {
    const {token, logIn, logOut, tokenData} = useContext(AuthContext)

    const [username, setUsername] = useState('');
    useEffect(() => {
        if (tokenData) {
            setUsername(tokenData.preferred_username || tokenData.email || '');
        }
    }, [tokenData, token]);

    const handleLogout = () => {
        logOut();
        localStorage.clear();
        sessionStorage.clear();
        /*const keycloakLogoutURL = `http://localhost:8443/realms/oauth2-demo/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent('http://localhost:5173')}`;
        logOut();
        localStorage.clear();
        sessionStorage.clear();

        // This will log out the session in Keycloak and then redirect to your app
        window.location.href = keycloakLogoutURL*/
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container py2">
                <Link className="navbar-brand d-flex align-items-center " to="/">
                    <Logo/>
                    <span className="fw-bolder fs-4 mx-3 "
                          style={{letterSpacing: '-0.5px', color: '#800080'}}>EasyInvoice {token?`Hello, ${username} !`:''}</span>
                </Link>
                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            {/*<button className="nav-link fw-medium">*/}
                            {/*    Generate*/}
                            {/*</button>*/}
                            <Link className="nav-link fw-medium" to="/generate">Generate</Link>
                        </li>
                        <li className="nav-item">
                            {token ? <>
                                <button className="btn btn-primary rounded-pill px-4"
                                        style={{backgroundColor: '#2c0b63', borderColor: '#8555d4'}}
                                        onClick={() => handleLogout()}
                                >
                                    Logout
                                </button>
                            </> : <>
                                <button className="btn btn-primary rounded-pill px-4"
                                        style={{backgroundColor: '#2c0b63', borderColor: '#8555d4'}}
                                        onClick={() => logIn()}
                                >
                                    Login/Signup
                                </button>
                            </>}

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default MenuBar;