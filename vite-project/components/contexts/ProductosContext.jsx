// Contexto y proveedor para la gestión de productos en la aplicación
import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap';

// Crea el contexto de productos
const ProductosContext = createContext();

/**
 * Proveedor de productos: maneja el estado global de productos y sus acciones.
 */
export function ProductosProvider({ children }) {
  // Obtiene productos desde la API
  const {
    data: productosData,
    loading,
    error,
  } = useFetch("https://fakestoreapi.com/products");
  const [productos, setProductos] = useState([]);

  // Efecto para inicializar productos con propiedades extra
  useEffect(() => {
    if (productosData) {
      const productosConExtra = productosData.map((p) => ({
        ...p,
        visible: true,
      }));
      setProductos(productosConExtra);
    }
  }, [productosData]);

  // Estas funciones deben estar dentro del componente

  /**
   * Agrega un nuevo producto a la lista, adaptando los campos del formulario.
   */
  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, { ...nuevoProducto, id: Date.now(), visible: true,
      // Conversión de nombres de campos
      image: nuevoProducto.imagen || "https://placehold.co/150x150",
      title: nuevoProducto.nombre || "Sin título",
      price: nuevoProducto.precio || 0,
      description: nuevoProducto.descripcion || "",
      category: nuevoProducto.categoria || "",
      stock: nuevoProducto.stock || 0,  }]);
  };

   // Provee el contexto a los hijos
  return (
    <ProductosContext.Provider
      value={{ productos, setProductos, agregarProducto }}
    >
      {loading && <h1>Cargando...</h1>}
      {error && <h1>Error: {error.message}</h1>}
      {!loading && !error && children}
    </ProductosContext.Provider>
  );
}

/**
 * Componente para mostrar los detalles de un producto.
 */
export function Detalles(){
  const { id } = useParams();
  const { productos } = useProductos();
  const producto = productos.find((producto) => producto.id === parseInt(id));
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <Card className='bg-dark text-light p-4 mt-4'>
        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-primary" onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
        <h2 className="mt-4 mb-4">Detalles del Producto</h2>
        <Card.Body className="bg-secondary p-0">
          <Row className="g-0">
            <Col md={4} className="p-3 d-flex justify-content-center align-items-center">
              <img
              src={producto.image}
              alt={producto.title}
              className="img-fluid rounded"
              style={{maxHeight: '300px', objectFit: 'contain'}}
              />
            </Col>
            <Col md={8} className="p-4">
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent text-light">
                  <strong>ID:</strong> {producto.id}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-light ">
                  <strong>Nombre:</strong> {producto.title}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-light">
                  <strong>Precio:</strong> ${producto.price}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-light ">
                  <strong>Descripción:</strong> {producto.description}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-light ">
                  <strong>Categoría:</strong> {producto.category}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
    </Card>
  );
};

// Hook para consumir el contexto de productos
export const useProductos = () => useContext(ProductosContext);