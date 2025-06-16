import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { useParams } from "react-router-dom";
import { Container, Button, Form, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const {
    data: productosData,
    loading,
    error,
  } = useFetch("https://fakestoreapi.com/products");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (productosData) {
      const productosConExtra = productosData.map((p) => ({
        ...p,
        visible: true,
        favorito: false,
      }));
      setProductos(productosConExtra);
    }
  }, [productosData]);

  // Estas funciones deben estar dentro del componente
  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, { ...nuevoProducto, id: Date.now(), visible: true,
      favorito: false,
      // Conversión de nombres de campos
      image: nuevoProducto.imagen || "https://placehold.co/150x150",
      title: nuevoProducto.nombre || "Sin título",
      price: nuevoProducto.precio || 0,
      description: nuevoProducto.descripcion || "",
      category: nuevoProducto.categoria || "",
      stock: nuevoProducto.stock || 0,  }]);
  };

  const selecionFavorito = (id) => {
    setProductos(productos =>
      productos.map(p =>
        p.id === id ? { ...p, favorito: !p.favorito } : p
      )
    );
  };

  return (
    <ProductosContext.Provider
      value={{ productos, setProductos, agregarProducto, selecionFavorito }}
    >
      {loading && <h1>Cargando...</h1>}
      {error && <h1>Error: {error.message}</h1>}
      {!loading && !error && children}
    </ProductosContext.Provider>
  );
}

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


export const useProductos = () => useContext(ProductosContext);