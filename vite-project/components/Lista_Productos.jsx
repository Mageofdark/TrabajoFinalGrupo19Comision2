import { useProductos } from './ProductosContext.jsx';
import { Container, ListGroup, Button, Form, Card, ListGroupItem, Row, Col, } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export function Detalles(){
  const { id } = useParams();
  const { productos } = useProductos();
  const producto = productos.find((producto) => producto.id === parseInt(id));
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <Card className='bg-light p-4 mt-4'>
        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-secondary" onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
        <h2>Detalles del Producto</h2>
        <ListGroup>
          <ListGroup.Item>
            <img src={producto.imagen} alt={producto.nombre} width={200} />
          </ListGroup.Item>
          <ListGroup.Item>ID: {producto.id}</ListGroup.Item>
          <ListGroup.Item>Nombre: {producto.nombre}</ListGroup.Item>
          <ListGroup.Item>Precio: {producto.precio}</ListGroup.Item>
          <ListGroup.Item>Descripcion: {producto.descripcion}</ListGroup.Item>
          <ListGroup.Item>Categoria: {producto.categoria}</ListGroup.Item>
          <ListGroup.Item>Stock: {producto.stock}</ListGroup.Item>
        </ListGroup>
    </Card>
  );
};

export function MostrarProductos() {
  const { productos, setProductos } = useProductos();

  const handleEliminar = (id) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if(!confirmation) return;

    const newProductos = productos.map((e) => 
      e.id === id ? {...e, visible: false} : e
    )
    setProductos(newProductos);
  }

  return (
    <Container className='p-4 rounded'>
      <h2>Lista de productos</h2>
      {productos.map((producto) => producto.visible && (
        <ListGroup key={producto.id} horizontal className='m-2 '>
          <ListGroup.Item className='border-1'>
              {producto.categoria}
          </ListGroup.Item>
          <ListGroup.Item>
            <br />
            <img src={producto.imagen} alt={producto.nombre} width={200} />
          </ListGroup.Item>
          <ListGroup.Item className='border-1'>Nombre: {producto.nombre}</ListGroup.Item>
          <ListGroup.Item className='border-1'>Precio: {producto.precio}</ListGroup.Item>
          <ListGroup.Item className='border-1'>
            <Link to={`/Lista-productos/${producto.id}`} >
              <Button variant='info' size='sm' className='m-2'>
                Mas Detalles
              </Button>
            </Link>
            <Button onClick={() => handleEliminar(producto.id)} variant='danger' size='sm' className='m-2'>
              Eliminar
            </Button>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
  );
}
