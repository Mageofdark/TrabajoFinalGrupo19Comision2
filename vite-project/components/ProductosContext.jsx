import { createContext, useContext, useState } from "react";
import { Listado_productos } from "./Listado_Productos";

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(Listado_productos || []);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, { ...nuevoProducto, id: Date.now() }]);
  };

  return (
    <ProductosContext.Provider value={{ productos, setProductos, agregarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);