import { useProductos } from './ProductosContext.jsx';
import { Container, ListGroup, Button, Form, Card, ListGroupItem, Row, Col, } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function EditarProducto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { productos, setProductos } = useProductos();

  const producto = productos.find((producto) => producto.id === parseInt(id));
  if (!producto) return <p>Producto no encontrado</p>;

  const [productoEdit, setProductoEdit] = useState({...producto});
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setProductoEdit({ ...productoEdit, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const newErrors = {};
    if(!productoEdit.title || productoEdit.title.trim() === "")
      newErrors.title = "El titulo es obligatorio";

    if(!productoEdit.price)
      newErrors.price = "El precio es obligatorio";
    if(productoEdit.price <= 0)
        newErrors.price = "El precio debe ser un valor positivo";

    if (!productoEdit.category)
      newErrors.category = "La categoria es obligatoria";

    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresVal = validar();

    setErrores(erroresVal);
    if (Object.keys(erroresVal).length > 0) return;

    const newProductos = productos.map((p) =>
      p.id === productoEdit.id ? productoEdit : p
    );

    setProductos(newProductos);

    alert('Los cambios se guardaron correctamente');
    navigate("/Lista-Productos");
  };

  return (
    <>
      <Container className="mt-4 bg-light p-4 rounded">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-white shadow">
              <Card.Header as="h5" className="text-center bg-secondary text-white">
                Editar Producto
              </Card.Header>
              <Card.Body className="bg-white">
                  <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className='mb-3'>
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        type='text'
                        readOnly
                        value={productoEdit.id}
                        className='bg-light border-dark'
                      />
                    </Form.Group>
                    <Row>
                        {Object.keys(productoEdit)
                        .filter((campo) => campo !== "visible" && campo !== "id" && campo !== "favorito" && campo !== "rating")
                        .map((campo) => (
                          <Col md={6} key={campo}>
                            <Form.Group className="mb-3" controlId={campo}>
                              <Form.Label className="text-dark">
                                {campo.charAt(0).toUpperCase() + campo.slice(1)}
                              </Form.Label>
                              <Form.Control
                                type={
                                  campo === "price"
                                  ? "number" : "text"
                                }
                                name={campo}
                                value={productoEdit[campo]}
                                onChange={handleChange}
                                isInvalid={!!errores[campo]}
                                className="border-dark"
                                required
                                />
                              <Form.Control.Feedback type="invalid">
                                {errores[campo]}
                              </Form.Control.Feedback>
                              </Form.Group>
                          </Col>
                    ))}
                    </Row>
                  <Button variant="danger" onClick={() => navigate("/Lista-Productos")}>
                    Cancelar
                  </Button>
                  <Button variant="secondary" type="submit">
                    Guardar Cambios
                  </Button>   
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export function MostrarProductos() {
  const { productos, setProductos, selecionFavorito } = useProductos();
  const handleEliminar = (id) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if(!confirmation) return;
    console.log(productos)
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
            <Link to={`/Lista-productos/editar/${producto.id}`}>
              <Button variant='info' size='sm' className='m-2'>
                  Editar
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
