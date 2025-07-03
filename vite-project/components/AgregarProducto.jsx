import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Card, Row, Col, } from 'react-bootstrap';
import { useProductos } from "../components/contexts/ProductosContext";

/**
 * Componente para agregar un nuevo producto a la lista.
 */
function AgregarProducto() {
  const navigate = useNavigate();
  // Obtiene la función para agregar productos desde el contexto
  const { agregarProducto } = useProductos();
  const [errores, setErrores] = useState({});
  
    // Estado local para los datos del nuevo producto
  const [producto, setProducto] = useState({
    id: Date.now(),
    imagen: null,
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    stock: "",
    visible: true,
  });
  /**
   * Maneja los cambios en los campos del formulario.
   * Actualiza el estado local del producto con el nuevo valor.
   */
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  // Valida los campos del formulario antes de enviar.
  // Verifica que los campos requeridos estén completos y que no haya errores.
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

  // Maneja el envío del formulario.
  // Valida los campos y, si no hay errores, agrega el producto y redirige al usuario a la lista de productos.
  // Muestra un mensaje de éxito al agregar el producto.
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresVal = validar();
    setErrores(erroresVal);

    if (Object.keys(erroresVal).length > 0) return;

    agregarProducto(producto);
    alert("Producto agregado exitosamente");
    navigate("/");
  };
 
const [previewImage, setPreviewImage] = useState(producto?.imagen || '');

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const handleDrop = async (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file?.type.startsWith('image/')) {
    try {
      const base64 = await convertToBase64(file);
      setPreviewImage(base64);
      setProducto(prev => ({ 
        ...prev, 
        imagen: base64
      }));
    } catch (error) {
      console.error("Error al procesar imagen:", error);
    }
  }
};

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const base64 = await convertToBase64(file);
      setPreviewImage(base64);
      setProducto(prev => ({ 
        ...prev, 
        imagen: base64 
      }));
    } catch (error) {
      console.error("Error al procesar imagen:", error);
    }
  }
};

   // Renderiza el formulario para agregar un producto
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
                <div 
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border border-primary p-3 mb-3 text-center bg-light"
                >
                    <img src={previewImage} thumbnail height={250} />
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="d-none"
                    id="file-upload"
                  />
                  
                </div>
                <Button 
                    variant="primary" 
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    Seleccionar Imagen
                  </Button>
                <Row>
                  {Object.keys(producto)
                    .filter((campo) => campo !== "visible" && campo !== "id" && campo !== "imagen")
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
