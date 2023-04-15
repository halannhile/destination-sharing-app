import { createContext } from "react";

createContext({
    isLoggedIn: false, 
    login: () => {}, 
    logout: () => {}});
