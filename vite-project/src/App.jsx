import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'

function App() {

  return (
    <div className='conteiner'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='Favoritos' element={<h1>Favoritos </h1>} />
          <Route path='Lista-Alumnos/:id' element={<h1>Detalles </h1>} />
          <Route path='Lista-Alumnos/:id/editar' element={<h1>Editar </h1>} />
          <Route path='Nuevo-Producto' element={<h1> AgregarProducto </h1>} />
          <Route path='Nosotros' element={<h1>Nosotros</h1>} />
          <Route path='*' element={<h1>PaginaError</h1>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
