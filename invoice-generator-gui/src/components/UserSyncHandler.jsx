import {useContext, useEffect, useState} from "react";
import {AuthContext} from "react-oauth2-code-pkce";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
    const [synced, setSynced] = useState(false);
    const {token, tokenData} = useContext(AuthContext)
    const {baseUrl} = useContext(AppContext);
    useEffect(() => {
        const saveUser = async () => {
            console.log("token : ", token);
            if (!token) return;
            try {
                const user = tokenData ? {
                    username: tokenData.preferred_username,
                    email: tokenData.email,
                    firstName: tokenData.given_name,
                    lastName: tokenData.family_name,
                } : null;

                if (user) {
                    await axios.post(`${baseUrl}/users`, user, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    setSynced(true);
                }
            }catch (error) {
                console.error("Error extracting user data from token:", error);
                toast.error("Error extracting user data from token.", error.message)
            }
        }
        saveUser().then(r => console.log(r));
    })
    return null;
}

export default UserSyncHandler;