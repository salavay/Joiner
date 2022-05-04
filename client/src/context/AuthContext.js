import {createContext} from "react";
import {noop} from "bootstrap/js/src/util";


export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})