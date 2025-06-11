import { Card, Col, Container, Row } from "react-bootstrap"
import { Devs } from "./devs.js"
function Nosotros(){
    return (
        <Container>
            <h1 className="text-center mb-4">Nosotros:</h1>
            <Row className="justify-content-center">
                {Devs.map((dev) => (
                    <Col md={4} key={dev.id} className="mb-4">
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>{dev.nombre} {dev.apellido}</Card.Title>
                                <Card.Text>
                                    <strong>Institución:</strong> {dev.Institucion}<br />
                                    <a href={dev.github} target="_blank" rel="noopener noreferrer">Github</a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Nosotros