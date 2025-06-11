import {Navbar, Container, Nav} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

function Layout(){
    return (
        <>
        <div className="bg-light min-vh-100">
            <Navbar expand="lg" bg="secondary" variant='dark'>
                <Container>
                    <Navbar.Brand as={Link} to="/" className='fw-bold'>Pagina de Productos</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Lista-Productos">Lista de Productos</Nav.Link>
                        <Nav.Link as={Link} to="/Favoritos">Lista de favoritos</Nav.Link>
                        <Nav.Link as={Link} to="/Nuevo-Producto">Agregar Producto</Nav.Link>
                        <Nav.Link as={Link} to="/Nosotros">Nosotros</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet />
            </section>
        </div>
        </>
    )
}

export default Layout