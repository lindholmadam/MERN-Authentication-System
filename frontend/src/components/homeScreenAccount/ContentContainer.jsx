import { Container, Col } from 'react-bootstrap';
import HeaderAccount from './HeaderAccount';


const ContentContainer = ({ children }) => {

  return (
    <>
        <div className='d-flex' style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <HeaderAccount/>
            <Container className="d-flex justify-content-center" style={{ minHeight: 'calc(100vh - 50px)', overflow: 'hidden', paddingTop: '4.5rem' }}>
              <Col xs={12} md={10}> 
                <div className="pe-2">
                  {children}
                </div>
              </Col>
            </Container>
        </div> 
    </>
  );
};

export default ContentContainer;