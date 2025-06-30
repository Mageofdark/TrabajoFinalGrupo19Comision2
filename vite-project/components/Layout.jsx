import {Navbar, Container, Nav,NavDropdown, Button, Image} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import useAuth from './hooks/useAuth'

function Layout(){
    const { isAuthenticated, user, logout} = useAuth();
    return (
        <>
        <div className="bg-dark min-vh-100 text-white">
            <Navbar expand="lg" bg='primary' variant='dark'>
                <Container>
                    <Navbar.Brand as={Link} to="/" className='fw-bold'>Pagina de Productos</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='me-auto'>              
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Lista-Productos">Lista de Productos</Nav.Link>
                        <Nav.Link as={Link} to="/Favoritos">Lista de favoritos</Nav.Link>
                        <Nav.Link as={Link} to="/Nosotros">Nosotros</Nav.Link>

                        {user?.rol === "ADMIN" &&                     //Muestra Herramientas de administracion si es ADMIN 
                        (
                        <NavDropdown title="Administrador" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/Nuevo-Producto">Agregar Producto</NavDropdown.Item>
                        </NavDropdown>
                        )}
                    </Nav>

                    <Nav>
                        { !isAuthenticated                              //si no esta registrado muestra el link para registrarse
                        ? (
                            <>
                            <Nav.Link as={Link} to="/Signup">Registrarse</Nav.Link> 
                            <Nav.Link as={Link} to="/Login">Iniciar Sesion</Nav.Link> 
                            </>) 
                        : (                                             // si esta registrado muestra el link del perfil y el btn de cerrar session
                            <>
                                <NavDropdown title="Perfil" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/Profile">Ajustes</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <Button className="w-100" onClick={logout}> Cerrar Sesion </Button>
                                </NavDropdown>
                                <Image
                                alt=""
                                src={`${user.imagen}`}
                                width="30"
                                height="30"
                                className='d-inline-block mt-1'
                                roundedCircle
                                />
                            </>
                        ) }
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