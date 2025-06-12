import { useProductos } from './ProductosContext.jsx';
import { Container, ListGroup, Button, Form, Card, ListGroupItem, Row, Col, } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';



export function MostrarProductos() {
  const { productos, setProductos, selecionFavorito } = useProductos();
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
  <img src={producto.image} alt={producto.title} width={200} />
</ListGroup.Item>
<ListGroup.Item className='border-1'>Nombre: {producto.title}</ListGroup.Item>
<ListGroup.Item className='border-1'>Precio: {producto.price}</ListGroup.Item>
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
          <ListGroup.Item>
            <input
              type="checkbox"
              checked={producto.favorito || false}
              onChange={() => selecionFavorito(producto.id)}/> Favorito
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
  );
}
