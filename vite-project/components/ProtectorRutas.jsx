import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { Container, Spinner } from "react-bootstrap";

const ProtectorRutas = ({ rolesPermitidos, children }) => {
    const { isAuthenticated, user, isLoading } = useAuth();
        console.log(user)

    //muestra un spinner mientras carga
    if (isLoading) {
        return(
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando pagina...</span>
                </Spinner>
            </Container>
        );
    }

    //Redirige a login si no esta autenticado
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    
    // Verifica el rol (solo si se especifica el rol)
    if (rolesPermitidos && !rolesPermitidos.includes(user?.rol)) {
        return <Navigate to="/unauthorized" replace />;
    }

    //si esta autenticado y autorizado por rol, renderiza el componente hijo
    return children;
}

export default ProtectorRutas;