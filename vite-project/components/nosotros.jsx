import { Card, Col, Container, Row, Image } from "react-bootstrap"
import { Devs } from "./devs.js"

/** * Componente que muestra información sobre el equipo de desarrollo.
 * Muestra una lista de desarrolladores con sus detalles. */
function Nosotros(){
    return (
        <Container>
            <h1 className="text-center mb-4 text-light">Nosotros:</h1>
            <Row className="justify-content-center">
                {Devs.map((dev) => (
                    <Col md={4} key={dev.id} className="mb-4">
                        <Card className="shadow bg-secondary text-light border-1">
                            <Card.Body>
                                <Image
                                src={dev.img}
                                alt={`${dev.nombre} ${dev.apellido}`}
                                className="mb-3 border border-primary"
                                width={120}
                                height={120}
                                roundedCircle
                                />
                                <Card.Title>{dev.nombre} {dev.apellido}</Card.Title>
                                <Card.Text>
                                    <strong>Institución:</strong> {dev.Institucion}<br />
                                    <a href={`mailto:${dev.correo}`} className="text-info">{dev.correo}</a>
                                </Card.Text>
                                <a href={dev.github} className="mt-auto" rel="noopener noreferrer" target="_blank">Perfil de Github</a>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Nosotros