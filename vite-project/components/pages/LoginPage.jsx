import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    //obtiene la funcion de login, estado de auth y user
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    //Redirigir si ya esta autenticado
    useEffect(() => {
        if(isAuthenticated) {
            if(user?.rol === 'ADMIN') {
                navigate('/Nosotros', { replace: true });
            } else if (user?.rol === 'USUARIO'){
                navigate('/Lista-Productos', { replace: true });
            } else {
                navigate('/error', { replace: true });
            }
        }
    }, [isAuthenticated, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); //Limpia los errores anteriores
    
        if ( !username || !password ){
            setLoginError('datos vacios: Por favor, ingrese usuario y contraseña');
            return;
        }

        const result = await login({ username, password });

        if (!result.success) {
            setLoginError(result.message || 'Error de autenticacion desconocido')
            return;
        }
    };

    return (
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>
                        Iniciar Sesion
                    </Card.Title>
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group>
                            <Form.Label> Usuario </Form.Label>
                            <Form.Control
                                type="text" placeholder="nombre de usuario"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                required />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label> Contraseña </Form.Label>
                            <Form.Control 
                                type="password" placeholder="Contraseña"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                required />
                        </Form.Group>
                        
                        {loginError && (
                            <Alert variant="danger" className="mt-3">
                                {loginError}
                            </Alert>
                        )}

                        <Button variant="primary" type="submit" className="w-10 mt-2">
                            Iniciar Sesion
                        </Button>
                    </Form>
                        
                <Card.Text className="pt-2 text-center">
                    ¿No tienes una cuenta? {" "}
                    <Card.Link as={Link} to='/Signup'>Registrate</Card.Link>
                </Card.Text>
                        
                </Card.Body>
            </Card>
        </Container>


    )
}

export default LoginPage