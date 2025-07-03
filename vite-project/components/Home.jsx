import { Container, Card, } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useProductos } from "./contexts/ProductosContext";
import PleiadesLogo from "./Pleiadeslogo";

const Home = () => {
  const { productos } = useProductos();

  // Obtener los primeros 4 productos como recomendados
  const productosRecomendados = productos.slice(0, 4);

  return (
    <div className="container py-4 text-center">
      {/* Logo grande centrado */}
      <div className="mx-auto mb-4 text-center" style={{ width: "500px", height: "500px" }}>
        <PleiadesLogo showText={false} size="md" className="w-full h-full" />
      </div>

      {/* Título de productos recomendados */}
      <h2 className="mb-4 text-white">Productos Recomendados</h2>

      {/* Fila de productos recomendados */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {productosRecomendados.map((producto) => (
          <div key={producto._id} className="col">
            <div className="card h-100 bg-dark text-white border-secondary">
              <img
                src={producto.imagen || producto.image}
                className="card-img-top"
                alt={producto.nombre || producto.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre || producto.title}</h5>
                <p className="card-text">${producto.precio || producto.price}</p>
                <Link
                  to={`/Lista-Productos/${producto._id}`}
                  className="btn btn-primary"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para ver todos los productos */}
      <div className="mt-5">
        <Link to="/Lista-Productos" className="btn btn-outline-light btn-lg">
          Ver Todos los Productos
        </Link>
      </div>
    </div>
  );
};

export default Home;