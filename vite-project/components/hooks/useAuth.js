import { useContext } from "react";
import { AuthContext } from "../contexts/AutorizacionContext";

function useAuth() {
    const context = useContext(AuthContext);

    if( context === null) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }

    return context;
}

export default useAuth;