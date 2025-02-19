import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';





const FormContainer = ({ children }) => {
  const location = useLocation();
  const loginPage = location.pathname === '/login';

  return (
    <Container className="align-items-center justify-content-center">
      <Row className='justify-content-md-center'>
        { loginPage ? (
          <>
          {/* This means that - on xs screens the column will fill all 12 units. On medium screens only 8 units */}
            <Col xs={12} md={8}> 
              {children}
            </Col>
          </>
        ) : (
          <Row className='justify-content-md-center'>
            <Col xs={12} md={7}>
              {children}
            </Col>
          </Row>
        ) 
        }
      </Row>
    </Container>
  );
};

export default FormContainer;