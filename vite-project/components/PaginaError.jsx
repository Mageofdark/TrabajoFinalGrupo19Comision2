import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

/** * Componente que muestra una página de error 404.
 * Indica que la página solicitada no se pudo encontrar. */
function PaginaError(){
    return(
        <Card className="mt-4 mx-4 shadow bg-secondary text-light border-1">
            <Card.Body className="text-center">
                <Card.Title className="fs-1"> ERROR 404 😔 </Card.Title>
                <Card.Text className="pt-2">
                    No se pudo encontrar la pagina. 
                    <Card.Link as={Link} to='/'> Volver a Inicio</Card.Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PaginaError