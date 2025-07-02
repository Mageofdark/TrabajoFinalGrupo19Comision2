import { useProductos } from './ProductosContext.jsx';
import { Container, Button, Alert, Card, Row, Col, } from 'react-bootstrap';
import { Link } from "react-router-dom";

function MostrarPapelera(){
    const { productos, setProductos } = useProductos();
    const productosEnPapelera = productos.filter(p => p.visible == false);
    if(productosEnPapelera.length  === 0)
        return (
        <Alert variant="info" className="text-center">
            La papelera esta vacía 🗑️
        </Alert>
        );
    const handleRecuperar = (id) => {
        const newProductos = productos.map((p) => 
            p.id === id ? {...p, visible: true} : p
        )
        setProductos(newProductos);
    }

    return (
        <>
            <Container className=' p-4 rounded' >
                <h2 className="mb-5">Papelera</h2>
                <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
                    {productosEnPapelera.map(producto => (
                    <Col key={producto.id}>
                        <Card className='h-100 bg-secondary text-light bordder-primary'>
                            <div className='d-flex justify-content-center p-3'>
                                <Card.Img variant='top'src={producto.image} alt={producto.title} height={250} width={100}/>
                            </div>
                            <Card.Body>
                                <small className='text-muted'> {producto.categoria}</small>
                                <Card.Title className='mt-1 mb-2' style={{height: '180px'}}>
                                    {producto.title}
                                </Card.Title>
                                <div className='mt-auto'>
                                    <h5>${producto.price}</h5>
                                </div>
                            </Card.Body>
                            <div className="d-flex justify-content-center">
                                <Link to={`/Lista-productos/${producto.id}`}>
                                    <Button variant='info' size='sm' className='m-2'>
                                        Mas Detalles
                                    </Button>
                                </Link>
                                <Button onClick={() => handleRecuperar(producto.id)} variant='success' size='sm' className='m-2'>
                                    Recuperar
                                </Button>
                            </div>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default MostrarPapelera;