import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { useParams } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap";
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
    <Card className='bg-light p-4 mt-4'>
        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-secondary" onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
        <h2>Detalles del Producto</h2>
        <ListGroup>
          <ListGroup.Item>
            <img src={producto.image} alt={producto.title} width={200} />
<ListGroup.Item>ID: {producto.id}</ListGroup.Item>
<ListGroup.Item>Nombre: {producto.title}</ListGroup.Item>
<ListGroup.Item>Precio: {producto.price}</ListGroup.Item>
<ListGroup.Item>Descripcion: {producto.description}</ListGroup.Item>
<ListGroup.Item>Categoria: {producto.category}</ListGroup.Item>
</ListGroup.Item>
        </ListGroup>
    </Card>
  );
};


export const useProductos = () => useContext(ProductosContext);