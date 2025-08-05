import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {AppContextProvider} from "./context/AppContext.jsx";
import {AuthProvider} from "react-oauth2-code-pkce";
import {authConfig} from "./authConfig.js";

createRoot(document.getElementById('root')).render(
    <AuthProvider authConfig={authConfig} autoLogin={false}>
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    </AuthProvider>
)
