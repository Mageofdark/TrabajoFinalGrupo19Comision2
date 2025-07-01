import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Card, Row, Col } from 'react-bootstrap';
import { useProductos } from "./ProductosContext";

function AgregarProducto() {
  const navigate = useNavigate();
  const { agregarProducto } = useProductos();
  const [errores, setErrores] = useState({});
  
  const [producto, setProducto] = useState({
    id: Date.now(),
    imagen: "",
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    stock: "",
    visible: true,
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const newErrors = {};
    if (!producto.nombre || producto.nombre.trim() === "")
      newErrors.nombre = "El nombre es obligatorio";

    if (!producto.precio)
      newErrors.precio = "El precio es obligatorio";
    else if (parseFloat(producto.precio) <= 0)
      newErrors.precio = "El precio debe ser un valor positivo";

    if (!producto.categoria)
      newErrors.categoria = "La categoría es obligatoria";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresVal = validar();
    setErrores(erroresVal);

    if (Object.keys(erroresVal).length > 0) return;

    agregarProducto(producto);
    alert("Producto agregado exitosamente");
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="border-primary shadow bg-secondary text-light">
            <Card.Header as="h5" className="text-center bg-secondary text-white">
              Agregar Producto
            </Card.Header>
            <Card.Body className="bg-secondary">
              <Form onSubmit={handleSubmit} noValidate>
                <Row>
                  {Object.keys(producto)
                    .filter((campo) => campo !== "visible" && campo !== "id")
                    .map((campo) => (
                      <Col md={6} key={campo}>
                        <Form.Group className="mb-3" controlId={campo}>
                          <Form.Label className="text-light">
                            {campo.charAt(0).toUpperCase() + campo.slice(1)}
                          </Form.Label>
                          <Form.Control
                            type={campo === "precio" || campo === "stock" ? "number" : "text"}
                            name={campo}
                            value={producto[campo]}
                            onChange={handleChange}
                            className="border-primary text-dark"
                            isInvalid={!!errores[campo]}
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
                <Button className="ml-4" variant="primary" type="submit">
                  Agregar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AgregarProducto;
