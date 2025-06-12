import { useProductos } from "./ProductosContext.jsx";
import { Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export function Favoritos() {
  const { productos } = useProductos();
  const favoritos = productos.filter((p) => p.favorito && p.visible);

  return (
    <Container className="p-4 rounded">
      <h2>Favoritos</h2>
      {favoritos.length === 0 && <p>No hay productos favoritos.</p>}
      {favoritos.map((producto) => (
        <ListGroup key={producto.id} horizontal className="m-2">
          <ListGroup.Item>
            <img src={producto.image} alt={producto.title} width={100} />
          </ListGroup.Item>
          <ListGroup.Item>{producto.title}</ListGroup.Item>
          <ListGroup.Item>{producto.price}</ListGroup.Item>
          <ListGroup.Item>
            <Link to={`/Lista-Productos/${producto.id}`}>
              <Button variant="info" size="sm" className="m-2">
                Ver Detalles
              </Button>
            </Link>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
  );
}
