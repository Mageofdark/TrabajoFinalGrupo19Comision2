import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Nosotros from './Nosotros';
import AgregarProducto from '../components/AgregarProducto'
import { ProductosProvider, Detalles } from '../components/ProductosContext';
import { MostrarProductos, EditarProducto } from '../components/Lista_Productos';
import { Favoritos } from '../components/Favoritos';

function App() {
  return (
    <ProductosProvider>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='Lista-Productos' element={<MostrarProductos />} />
            <Route path='Lista-Productos/editar/:id' element={<EditarProducto />} />
            <Route path='Lista-Productos/:id' element={<Detalles />} />
            <Route path='Favoritos' element={<Favoritos />} />
            <Route path='Lista-Productos/:id/editar' element={<h1>Editar</h1>} />
            <Route path='Nuevo-Producto' element={<AgregarProducto />} />
            <Route path='Nosotros' element={<Nosotros />} />
            <Route path='*' element={<h1>PaginaError</h1>} />
          </Route>
        </Routes>
      </div>
    </ProductosProvider>
  );
}

export default App;
