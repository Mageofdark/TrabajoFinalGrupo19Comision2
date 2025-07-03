import { useProductos } from '../components/contexts/ProductosContext.jsx';
import { Container, Button, Form, Card, Row, Col, } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from './hooks/useAuth.js';

/**
 * Componente para editar un producto existente.
 */
export function EditarProducto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { productos, setProductos } = useProductos();

  const producto = productos.find((producto) => producto.id === parseInt(id));
  if (!producto) return <p>Producto no encontrado</p>;

  const [productoEdit, setProductoEdit] = useState({...producto});
  const [errores, setErrores] = useState({});

  // Efecto para inicializar el estado del producto a editar
  const handleChange = (e) => {
    setProductoEdit({ ...productoEdit, [e.target.name]: e.target.value });
  };

  // Validación de campos del formulario
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

  // Maneja el envío del formulario
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
  // Convierte un archivo a base64 para previsualizar la imagen
  // Utiliza FileReader para leer el archivo y convertirlo a una cadena base64
  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };
  // Estado para la imagen previa del producto
  // Inicializa con la imagen actual del producto
  const [previewImage, setPreviewImage] = useState(producto.image);
  // Maneja el arrastre de imágenes
  // Utiliza el evento onDrop para capturar el archivo arrastrado y convertirlo
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) {
      const base64 = await convertToBase64(file);
      setPreviewImage(base64);
      setProductoEdit({...productoEdit, image: base64});
    }
  };
// Maneja el cambio de archivo al seleccionar una imagen
// Utiliza FileReader para leer el archivo y actualizar el estado de la imagen previa
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPreviewImage(base64);
      setProductoEdit({...productoEdit, image: base64});
    }
  };

  return (
    <>
      <Container className="mt-4 bg-dark p-4 rounded text-light">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-primary shadow bg-secondary text-light">
              <Card.Header as="h3" className="text-center bg-secondary text-white">
                Editar Producto
              </Card.Header>
              <Card.Body className="bg-secondary">
                  <Form onSubmit={handleSubmit} noValidate>

                     <Form.Group className="mb-3">
                      <Form.Label as="h4">Imagen del Producto</Form.Label>
                      <div 
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                      >
                          <img src={previewImage} height={200} alt="Preview" />
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{display: 'none'}}
                          id="image-upload"
                        />
                        
                      </div>
                      <Button 
                          className="mt-2"
                          variant="primary" 
                          onClick={() => document.getElementById('image-upload').click()}
                        >
                          Editar imagen
                      </Button>
                    </Form.Group>
                    <h3>ID: {productoEdit.id}</h3>
                    
                    <Row>
                        {Object.keys(productoEdit)
                        .filter((campo) => campo !== "visible" &&
                        // Excluye campos que no deben ser editables
                        campo !== "id" &&
                        campo !== "favorito" &&
                        campo !== "rating" &&
                        campo !== "imagen" &&
                        !['nombre', 'precio', 'descripcion', 'categoria', 'image'].includes(campo))
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

/**
 * Componente para mostrar la lista de productos.
 * Permite marcar favoritos, editar y eliminar (si es admin).
 */
export function MostrarProductos() {
  const { productos, setProductos } = useProductos();
  const { user, agregarfavorito } = useAuth();

  // Maneja la eliminación de un producto.
  // Muestra una confirmación antes de eliminar.
  const handleEliminar = (id) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if(!confirmation) return;
    console.log(productos)
    const newProductos = productos.map((e) => 
      e.id === id ? {...e, visible: false} : e
    )

    setProductos(newProductos);
    localStorage.setItem("Productos", JSON.stringify(newProductos));
    // console.log(localStorage.getItem("Productos"))
  }

  return (
    <Container className=' p-4 rounded'>
      <h2>Lista de productos</h2>
      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
         {productos.map((producto) => producto.visible && (
        <Col key={producto.id}>
          <Card className='h-100 bg-secondary text-light bordder-primary'>
            <div className='d-flex justify-content-center p-3'>
              <Card.Img 
              variant='top'
              src={producto.image || producto.imagen} 
              alt={producto.title || producto.nombre} 
              height={250}
              width={100}
              />
            </div>
            <Card.Body>
              <Card.Title className='mt-1 mb-2' style={{height: '180px'}}>
                {producto.title || producto.nombre}
              </Card.Title>
              <div className='mt-auto'>
                <h5>${producto.price || producto.precio}</h5>
                <div className='d-flex flex-wrap gap-2'>
                  <Link to={`/Lista-productos/${producto.id}`}>
                    <Button variant='info' size='sm' className='m-2'>
                      Mas Detalles
                    </Button>
                  </Link>
                  {user?.rol === "ADMIN" &&                 // si es ADMIN se mostrara boton de editar y de eliminar
                  <>
                  <Link to={`/Lista-productos/editar/${producto.id}`}>
                    <Button variant='info' size='sm' className='m-2'>
                      Editar
                    </Button>
                  </Link>
                  <Button onClick={() => handleEliminar(producto.id)} variant='danger' size='sm' className='m-2'>
                    Eliminar
                  </Button>
                  </>}
                  <div className='form-check form-switch mt-2'>
                    <input
                      className='form-check-input'
                      id={`favorito-${producto.id}`}
                      role='switch'
                      type="checkbox"
                      checked={user?.listafavoritos?.includes(producto.id) || false}
                      onChange={() => agregarfavorito(producto.id)}
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
