import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useState, useEffect } from "react";
  
export function MostrarDatosProfile(){
  const { user, eliminarUsuario } = useAuth();
  const navigate = useNavigate();
  
  return (
    <Card className='bg-dark text-light p-4 mt-4'>
        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-primary" onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
        <h2 className="mt-4 mb-4">Detalles de la cuenta</h2>
        <Card.Body className="bg-secondary p-0">
          <Row className="g-0">
            <Col md={4} className="p-3 d-flex justify-content-center align-items-center">
            <Card.Img variant='top'src={user.imagen} alt={user.username} height={250}
              width={250}/>
            </Col>
            <Col md={8} className="p-4">
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent text-light">
                  <strong>ID:</strong> {user?.id}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-light ">
                  <strong>Nombre:</strong> {user?.username}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-light">
                  <strong>Email:</strong> {user?.email}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-light">
                  <strong>Edad:</strong> {user?.edad}
                </ListGroup.Item>
              </ListGroup>
              <div className="mt-4 d-flex">
                <Button onClick={() => navigate("/edit-Profile")}> Editar Datos</Button>
                <Button onClick={() => eliminarUsuario(user.id)} className="ms-auto" variant="danger"> Borrar Cuenta</Button>                
              </div>
            </Col>
          </Row>
        </Card.Body>
    </Card>
  );
}

export function EditarProfile(){
  const { user, setUser,listaUsuarios, setListaUsuarios} = useAuth();
  const [editProfile,setEditProfile] = useState(user);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const newErrors = {};

    if(editProfile.id === 1){
      alert("La cuenta de administrador no puede ser modificada")
      newErrors.username = "La cuenta de administrador no puede ser modificada";
      }

    if(!editProfile.username || editProfile.username.trim() === "")
      newErrors.username = "El nombre es obligatorio";

    if(!editProfile.email)
      newErrors.email = "El email es obligatorio";
    if(editProfile.edad < 13)
        newErrors.edad = "La edad debe ser mayor a trece años";

    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresVal = validar();

    setErrores(erroresVal);
    if (Object.keys(erroresVal).length > 0) return;

    setUser(editProfile); 

    const newListaUsuarios = listaUsuarios.map((e) => 
    e.id === editProfile.id ? editProfile : e
    )
    setListaUsuarios(newListaUsuarios);
    localStorage.setItem("Usuarios", JSON.stringify(newListaUsuarios)); 

    alert('Los cambios se guardaron correctamente');
    navigate("/Profile");
  };

  return (
    <>
      <Container className="mt-4 bg-dark p-4 rounded text-light">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-primary shadow bg-secondary text-light">
              <Card.Header as="h5" className="text-center bg-secondary text-white">
                Editar Cuenta
              </Card.Header>
              <Card.Body className="bg-secondary">
                  <Form onSubmit={handleSubmit} noValidate>
                    <h3>ID: {editProfile.id}</h3>
                    
                    <Row>
                        {Object.keys(editProfile)
                        .filter((campo) => campo !== "visible" && campo !== "id" && campo !== "rol" && campo !== "listafavoritos")
                        .map((campo) => (
                          <Col md={6} key={campo}>
                            <Form.Group className="mb-3" controlId={campo}>
                              <Form.Label className="text-light">
                                {campo.charAt(0).toUpperCase() + campo.slice(1)}
                              </Form.Label>
                              <Form.Control
                                type={
                                  campo === "edad"
                                  ? "number" : "text"
                                }
                                name={campo}
                                value={editProfile[campo]}
                                onChange={handleChange}
                                isInvalid={!!errores[campo]}
                                className="border-primary text-dark"
                                required
                                />
                              <Form.Control.Feedback type="invalid">
                                {errores[campo]}
                              </Form.Control.Feedback>
                              </Form.Group>
                          </Col>
                    ))}
                    </Row>
                  <Button variant="danger" onClick={() => navigate("/Profile")}>
                    Cancelar
                  </Button>
                  <Button className='ml-4' variant="primary" type="submit">
                    Guardar Cambios
                  </Button>   
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}