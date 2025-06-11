import { createContext, useContext, useState } from "react";
import { Listado_Productos } from "./Listado_productos"; // este es el archivo con los prodctos iniales huanca

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(Listado_Productos || []);

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