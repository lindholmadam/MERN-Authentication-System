import { Row, Container, Image, Col} from 'react-bootstrap';
import Meta from '../components/Meta';
import CardComponent from '../components/dibzCompinent';
// import { Stack} from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Loader from '../components/Loader';
// import logo from '../assets/logo.png';



const HomeScreen = () => {
  return (
    <>
      <Meta />
      <Container>
        <Row className="text-center">
          <h1>Startsida</h1>
        </Row>
        <Row className="text-center">
        <CardComponent></CardComponent>
        </Row>
        {/* <Col className="text-center">
          <Image src={logo} />
        </Col> */}
      </Container>
    </>
  );
};

export default HomeScreen;