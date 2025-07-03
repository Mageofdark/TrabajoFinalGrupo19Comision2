import {Navbar, Container, Nav,NavDropdown, Button, Image} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'
import useAuth from './hooks/useAuth'
import  PleiadesLogo  from './Pleiadeslogo'

/** * Componente de diseño principal que incluye la barra de navegación y el contenido.
 * Muestra enlaces de navegación y el contenido de las páginas hijas. */
function Layout(){

    // Obtiene el estado de autenticación y el usuario actual desde el contexto de autenticación
    // También proporciona una función para cerrar sesión
    const { isAuthenticated, user, logout} = useAuth();
    
    return (
        <>
        <div className="bg-dark min-vh-100 text-white">
            <Navbar expand="lg" bg='primary' variant='dark'>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold me-6 d-flex align-items-center"  style={{ minWidth: "160px" }}>
                        <PleiadesLogo size="sm" className="d-inline-block" />
                    </Navbar.Brand>
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
                            <NavDropdown.Item as={Link} to="/Nuevo-Producto">
                                Agregar Producto
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Papelera">
                                Papelera
                            </NavDropdown.Item>
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
                                <NavDropdown title={<>
                                    <span>Perfil {""}</span>
                                    <Image
                                    alt=""
                                    src={`${user.imagen}`}
                                    width="30"
                                    height="30"
                                    className='d-inline-block mx-1'
                                    roundedCircle
                                    />
                                </>
                                } id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/Profile">Ajustes</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <Button className="w-100" onClick={logout}> Cerrar Sesion </Button>
                                </NavDropdown>
                            </>
                        ) }
                    </Nav>
                  </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet />
            </section>
            <Footer/>
        </div>
        </>
    )
}

export default Layout