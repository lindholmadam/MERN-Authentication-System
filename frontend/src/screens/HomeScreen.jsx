import { Row, Container, Image, Col} from 'react-bootstrap';
import Meta from '../components/Meta';
// import { Stack} from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Loader from '../components/Loader';
// import logo from '../assets/logo.png';





const HomeScreen = () => {
  return (
    <>
      <Meta />
      <Container style={{height: 100}} className="h-100 d-inline-block">
        {/* <Row className="text-center"> */}
        <Row>
          <Col><h1>Med flyttaNu kan du flytta eller säga upp samtliga avtal kopplat till din flytt</h1></Col>
          <Col className="text-center">Bild</Col>
        </Row>
        {/* <Col className="text-center">
          <Image src={logo} />
        </Col> */}
      </Container>
    </>
  );
};

export default HomeScreen;