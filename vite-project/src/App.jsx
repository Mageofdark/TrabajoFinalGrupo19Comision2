import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Nosotros from '../components/nosotros';
import AgregarProducto from '../components/AgregarProducto'
import { ProductosProvider, Detalles } from '../components/ProductosContext';
import { MostrarProductos, EditarProducto } from '../components/Lista_Productos';
import { Favoritos } from '../components/Favoritos';
import PaginaError from '../components/PaginaError';

function App() {
  return (
    <ProductosProvider>
      <div className='bg-dark text-white min-vh-100'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='Lista-Productos' element={<MostrarProductos />} />
            <Route path='Lista-Productos/editar/:id' element={<EditarProducto />} />
            <Route path='Lista-Productos/:id' element={<Detalles />} />
            <Route path='Favoritos' element={<Favoritos />} />
            <Route path='Nuevo-Producto' element={<AgregarProducto />} />
            <Route path='Nosotros' element={<Nosotros />} />
            <Route path='*' element={<PaginaError />} />
          </Route>
        </Routes>
      </div>
    </ProductosProvider>
  );
}

export default App;
