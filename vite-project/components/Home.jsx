import { Container, Card, } from "react-bootstrap";
function Home(){
    
    return(
        <Container className="mt-5 p-5 rounded" bg="secondary" >
            <Card className="border-dark shadow">
                <Card.Body className="text-center py-5 bg-secondary text-white">
                    <h1>Hola, Bienvenido</h1>
                    <h3>En esta pagina podras crear tu propia lista de Productos.</h3>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Home;