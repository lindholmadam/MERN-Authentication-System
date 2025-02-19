import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col, FloatingLabel, Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// components
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import GoogleLoginPage from '../components/GoogleLogin';
// slices
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

import logo from '../assets/images/crown-seeklogo.svg';



const LoginScreen = () => {

  const [email, setEmail] = useState(''); // Default will be an empty string
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/konto';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };





  return (
    <>

    <Navbar className='shadow-0' fixed='top' >
      <Container className='center-on-mobile'>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="Logo" width="60" height="auto" />
          </Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>

    <Container fluid style={{height: "100vh", maxHeight:"100vh"}} className="overflow-hidden">
      <Row style={{height: "100%", maxHeight: "100%"}} className='d-flex align-items-center justify-content-center'>
        <Col>
          <FormContainer>
            <h2 className='my-4'>Logga in</h2>

            <Form onSubmit={submitHandler}>
              <Form.Group className='my-3' controlId='email'>
                <FloatingLabel controlId="floatingInput" label="namn@exempel.com" className="mb-3">
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className='my-3 md-5' controlId='password'>
                <FloatingLabel controlId="floatingInput" label="Lösenord" className="mb-3">
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>

              <Button className='my-3' disabled={isLoading} type='submit' variant='primary'>
                Logga in
              </Button>

              {isLoading && <Loader />}
            </Form>

            <GoogleLoginPage/>

            <Row className='py-3'>
              <Col>
                Har du inget konto? {' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                  Skapa konto
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Col>

        <Col className='bg-login-custom d-none d-lg-block'></Col>

      </Row>
    </Container>

    </>
  );
}

export default LoginScreen;