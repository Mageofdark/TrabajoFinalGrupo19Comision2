import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useProductos } from "./ProductosContext";

function AgregarProducto() {
  const navigate = useNavigate();
  const { agregarProducto } = useProductos();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarProducto(producto);
    alert("Producto agregado exitosamente");
    navigate("/");
  };

  return (
    <Container>
      <h2>Agregar Producto</h2>
      <Form onSubmit={handleSubmit}>
        {Object.keys(producto)
        .filter((campo) => campo !== 'visible' && campo !== 'id')
        .map((campo) => (
          <Form.Group className="mb-3" controlId={campo} key={campo}>
            <Form.Label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</Form.Label>
            <Form.Control
              type="text"
              name={campo}
              value={producto[campo]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </Container>
  );
}

export default AgregarProducto;
