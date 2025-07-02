import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 text-center">
      <Container>
        <Row>
          <Col>
            <p className="mb-1">© 2025 - Grupo 19</p>
            <p className="mb-1">Todos los derechos reservados.</p>
            <p className="mb-0">
            {/* mailto abre el cliente de email para enviar un mensaje a esa dirección. */}
              <a href="mailto:contactoGrupo19@email.com" className="text-white text-decoration-none me-3">
                Contacto
              </a>
              <a
                href="https://github.com/Mageofdark/TrabajoFinalGrupo19Comision2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                GitHub
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
