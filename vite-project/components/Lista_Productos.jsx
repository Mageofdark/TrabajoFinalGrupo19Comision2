import { useProductos } from './ProductosContext.jsx';
import { Container, Button, Form, Card, Row, Col, } from 'react-bootstrap';
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
      <Container className="mt-4 bg-dark p-4 rounded text-light">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-primary shadow bg-secondary text-light">
              <Card.Header as="h5" className="text-center bg-secondary text-white">
                Editar Producto
              </Card.Header>
              <Card.Body className="bg-secondary">
                  <Form onSubmit={handleSubmit} noValidate>
                    <h3>ID: {productoEdit.id}</h3>
                    
                    <Row>
                        {Object.keys(productoEdit)
                        .filter((campo) => campo !== "visible" && campo !== "id" && campo !== "favorito" && campo !== "rating")
                        .map((campo) => (
                          <Col md={6} key={campo}>
                            <Form.Group className="mb-3" controlId={campo}>
                              <Form.Label className="text-light">
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
                                className="border-primary text-dark"
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
                  <Button className='ml-4' variant="primary" type="submit">
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
    <Container className=' p-4 rounded'>
      <h2>Lista de productos</h2>
      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
         {productos.map((producto) => producto.visible && (
        <Col key={producto.id}>
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
                  <Link to={`/Lista-productos/editar/${producto.id}`}>
                    <Button variant='info' size='sm' className='m-2'>
                      Editar
                    </Button>
                  </Link>
                  <Button onClick={() => handleEliminar(producto.id)} variant='danger' size='sm' className='m-2'>
                    Eliminar
                  </Button>
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
