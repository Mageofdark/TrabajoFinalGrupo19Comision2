import { useProductos } from "../components/contexts/ProductosContext.jsx";
import { Container, Button, Card, Row, Col, } from 'react-bootstrap';
import { Link } from "react-router-dom";
export function Favoritos() {
  const { productos, selecionFavorito } = useProductos();
  const favoritos = productos.filter((p) => p.favorito && p.visible);

  return (
    
    <Container className="p-4 rounded">
      <h2 className="mb-5">Favoritos</h2>
      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
        {favoritos.length === 0 && <p>No hay productos favoritos.</p>}
        {favoritos.map((producto) => (
        <Col key={producto.id}className="m-2">
          <Card className='h-100 bg-secondary text-light bordder-primary'>
            <div className='d-flex justify-content-center p-3'>
              <Card.Img variant='top'src={producto.image} alt={producto.title} height={250}
              width={100}/>
            </div>
            <Card.Body>
              <small className='text-muted'> {producto.categoria}</small>
              <Card.Title className='mt-1 mb-2' style={{height: '180px'}}>
                {producto.title}
              </Card.Title>
              <div className='mt-auto'>
                <h5>${producto.price}</h5>
                <div className='d-flex flex-wrap gap-2'>
                  <Link to={`/Lista-productos/${producto.id}`}>
                    <Button variant='info' size='sm' className='m-2'>
                      Mas Detalles
                    </Button>
                  </Link>
                  <div className='form-check form-switch mt-2'>
                    <input
                      className='form-check-input'
                      id={`favorito-${producto.id}`}
                      role='switch'
                      type="checkbox"
                      checked={producto.favorito || false}
                      onChange={() => selecionFavorito(producto.id)}
                    /> Favorito
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
      </Row>
    </Container>
  );
}
