import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext(null)

const AuthContextProvider = (props) =>{
const [token,setToken] = useState("")
const url = "http://localhost:4000"

const contextValue = {
    token,
    setToken,
    url
}
return (
    <AuthContext.Provider value={contextValue}>
        {props.children}

    </AuthContext.Provider>
)
}

export default AuthContextProvider