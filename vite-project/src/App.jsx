import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Nosotros from '../components/Nosotros';
import AgregarProducto from '../components/AgregarProducto'
import { ProductosProvider, Detalles } from '../components/ProductosContext';
import { MostrarProductos, EditarProducto } from '../components/Lista_Productos';
import { Favoritos } from '../components/Favoritos';
import PaginaError from '../components/PaginaError';
import LoginPage from '../components/pages/LoginPage';
import { EditarProfile, MostrarDatosProfile } from '../components/pages/Profile';
import ProtectorRutas from '../components/ProtectorRutas';
import SignUp from '../components/pages/SignUp';

function App() {
  return (
    <ProductosProvider>
      <div className='bg-dark text-white min-vh-100'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='Lista-Productos' element={<MostrarProductos />} />
              <Route path='Lista-Productos/editar/:id' element={
                <ProtectorRutas rolesPermitidos={["ADMIN"]}>
                  <EditarProducto />
                </ProtectorRutas>
                } />
            <Route path='Lista-Productos/:id' element={<Detalles />} />
            <Route path='Favoritos' element={
              <ProtectorRutas>
                <Favoritos />
              </ProtectorRutas>
              } />
            <Route path='Nuevo-Producto' element={
              <ProtectorRutas rolesPermitidos={["ADMIN"]}>
                <AgregarProducto />
              </ProtectorRutas>
              } />
            <Route path='Nosotros' element={<Nosotros />} />
            <Route path='*' element={<PaginaError />} />
            <Route path='Login' element={<LoginPage />} />
            <Route path='Signup' element={<SignUp />} />
            <Route path='Profile' element={
              <ProtectorRutas>
                <MostrarDatosProfile />
              </ProtectorRutas>
              } />
            <Route path='edit-Profile' element={
              <ProtectorRutas>
                <EditarProfile />
              </ProtectorRutas>
              } />
          </Route>
        </Routes>
      </div>
    </ProductosProvider>
  );
}

export default App;
