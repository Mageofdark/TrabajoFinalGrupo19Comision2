import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Card, Row, Col, } from 'react-bootstrap';
import useAuth from "../hooks/useAuth";

/** * Componente de registro de usuario.
 * Permite a los nuevos usuarios crear una cuenta. */
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

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  // Validación de los campos del formulario
  // Verifica que los campos requeridos estén completos y que no haya errores
    const validar = () => {
    const newErrors = {};
    const nombreRepetido = listaUsuarios.find(
          u => u.username === nuevoUsuario.username)

    if(!nuevoUsuario.username || nuevoUsuario.username.trim() === ""){             //verificacion de nombre
      newErrors.username = "El nombre es obligatorio";
    } else if (nombreRepetido){
      newErrors.username = "El nombre ya esta siendo usado. Intente con otro"
    }

    if(!nuevoUsuario.email || nuevoUsuario.email.trim() === ""){                   //verificacion de email
      newErrors.email = "El email es obligatorio";
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoUsuario.email)) {
      newErrors.email = "Debe ingresar un email válido";
    }

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

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresVal = validar();

    setErrores(erroresVal);
    if (Object.keys(erroresVal).length > 0) return;

    const { confirmarpassword, ...userWithoutConfirmarPassword } = nuevoUsuario;
    registrarUsuario(userWithoutConfirmarPassword);

    alert("Usuario agregado exitosamente");
    navigate("/Login");
  };

  const [previewImage, setPreviewImage] = useState('');

  // Convertir imagen a Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Manejar arrastre y soltado de imagen
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) {
      try {
        const base64 = await convertToBase64(file);
        setPreviewImage(base64);
        setNuevoUsuario(prev => ({ 
          ...prev, 
          imagen: base64
        }));
      } catch (error) {
        console.error("Error al procesar imagen:", error);
        setErrores(prev => ({ ...prev, imagen: "Error al cargar la imagen" }));
      }
    }
  };

  // Manejar selección de archivo
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setPreviewImage(base64);
        setNuevoUsuario(prev => ({ 
          ...prev, 
          imagen: base64 
        }));
      } catch (error) {
        console.error("Error al procesar imagen:", error);
        setErrores(prev => ({ ...prev, imagen: "Error al cargar la imagen" }));
      }
    }
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
                    <div 
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="border border-primary p-3 mb-2 text-center bg-light"
                      
                    >
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          style={{ maxHeight: '250px', maxWidth: '100%' }}
                        />
                      ) : (
                        <p className="text-muted mb-0">Arrastra tu imagen aca</p>
                      )}
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="d-none"
                        id="file-upload"
                      />
                    </div>
                    <Button 
                      variant="primary" 
                      onClick={() => document.getElementById('file-upload').click()}
                      
                    >
                      Seleccionar Imagen
                    </Button>
                    <Row>
                        {Object.keys(nuevoUsuario)
                        .filter((campo) => campo !== "visible" && campo !== "id" && campo !== "imagen")
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
                                  ? "number" :"text"
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
