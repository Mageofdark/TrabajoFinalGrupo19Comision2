import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Card, Row, Col, } from 'react-bootstrap';
import useAuth from "../hooks/useAuth";

function SignUp() {
  const navigate = useNavigate();
  const { registrarUsuario, listaUsuarios } = useAuth();
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    password: '',
    confirmarpassword: '',
    email: '',
    edad: 0,
    imagen: '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

    const validar = () => {
    const newErrors = {};
    const nombreRepetido = listaUsuarios.find(
          u => u.username === nuevoUsuario.username)

    if(!nuevoUsuario.username || nuevoUsuario.username.trim() === ""){             //verificacion de nombre
      newErrors.username = "El nombre es obligatorio";
    } else if (nombreRepetido){
      newErrors.username = "El nombre ya esta siendo usado. Intente con otro"
    }

    if(!nuevoUsuario.email || nuevoUsuario.email.trim() === "")                   //verificacion de email
      newErrors.email = "El email es obligatorio";

    if(!nuevoUsuario.password || nuevoUsuario.password.trim() === ""){            //verificacion de contraseña
      newErrors.password = "La contraseña es obligatorio";
    } else if(nuevoUsuario.password !== nuevoUsuario.confirmarpassword){
      newErrors.password = "Las contraseñas no coinciden";
      newErrors.confirmarpassword = " ";
    }else if(nuevoUsuario.password.length < 6)
      newErrors.password = "La contraseña debe tener minimo 6 caracteres";

    if(nuevoUsuario.edad < 13)                                                    //verificacion de edad
        newErrors.edad = "La edad debe ser mayor o igual a trece años";

    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresVal = validar();

    setErrores(erroresVal);
    if (Object.keys(erroresVal).length > 0) return;
    
    registrarUsuario(nuevoUsuario);
    alert("Usuario agregado exitosamente");
    navigate("/Login");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-primary shadow bg-secondary text-light">
              <Card.Header as="h5" className="text-center bg-secondary text-white">
                Registrarse
              </Card.Header>
              <Card.Body className="bg-secondary">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                        {Object.keys(nuevoUsuario)
                        .map((campo) => (
                          <Col md={6} key={campo}>
                            <Form.Group className="mb-3" controlId={campo}>
                              <Form.Label className="text-light">
                                {campo === "confirmarpassword" 
                                ? "Confirmar contraseña" : campo === "password" 
                                ? "Contraseña" : campo.charAt(0).toUpperCase() + campo.slice(1)}
                              </Form.Label>
                              <Form.Control
                                type={
                                  campo === "edad"
                                  ? "number" : "text"
                                }
                                name={campo}
                                value={nuevoUsuario[campo]}
                                onChange={handleChange}
                                isInvalid={!!errores[campo]}
                                className="border-primary text-dark"
                                />
                              <Form.Control.Feedback type="invalid">
                                {errores[campo]}
                              </Form.Control.Feedback>
                              </Form.Group>
                          </Col>
                    ))}
                    </Row>
                  <Button className='ml-4' variant="primary" type="submit">
                    Registrarse
                  </Button>   
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
  );
}

export default SignUp;
