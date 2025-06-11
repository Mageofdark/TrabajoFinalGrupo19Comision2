import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Nosotros from './nosotros';
import AgregarProducto from './components/AgregarProducto';
import { ProductosProvider } from './components/ProductosContext';

function App() {
  return (
    <ProductosProvider>
      <div className='conteiner'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='Favoritos' element={<h1>Favoritos</h1>} />
            <Route path='Lista-Productos/:id' element={<h1>Detalles</h1>} />
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
