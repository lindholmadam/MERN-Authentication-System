import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {

  // const address = {
  //   street: String,
  //   zipCode: Number,
  //   city: String
  // }

  const [firstName, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [address, setAddress] = useState('');
  // const [street, setStreet] = useState('');
  // const [zipCode, setZipCode] = useState('');
  // const [city, setCity] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ 
          firstName, 
          surname, 
          email, 
          password, 
          address,
          street,
          zipCode,
          city 
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className='my-4'>Skapa konto</h1>
      <Form onSubmit={submitHandler}>



        <Row>
          <Col>
            <Form.Group className='my-3' controlId='firstName'>
              {/* <Form.Label>Name</Form.Label> */}
              <FloatingLabel controlId="floatingInput" label="Förnamn" className="mb-3">
                <Form.Control
                  type='firstName'
                  placeholder='Enter name'
                  value={firstName}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='my-3' controlId='surname'>
                {/* <Form.Label>Name</Form.Label> */}
                <FloatingLabel controlId="floatingInput" label="Efternamn" className="mb-3">
                  <Form.Control
                    type='surname'
                    placeholder='Enter surname'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
            </Col>
        </Row>



        <Form.Group className='my-3' controlId='email'>
          {/* <Form.Label>Email Address</Form.Label> */}
          <FloatingLabel controlId="floatingInput" label="namn@exempel.com" className="mb-3">
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>



        <Form.Group className='my-3' controlId='password'>
          {/* <Form.Label>Password</Form.Label> */}
          <FloatingLabel controlId="floatingInput" label="Lösenord" className="mb-3">
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-3' controlId='confirmPassword'>
          {/* <Form.Label>Confirm Password</Form.Label> */}
          <FloatingLabel controlId="floatingInput" label="Bekräfta lösenord" className="mb-3">
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>



        <Form.Group className='my-3' controlId='street'>
          {/* <Form.Label>Email Address</Form.Label> */}
          <FloatingLabel controlId="floatingInput" label="Street" className="mb-3">
            <Form.Control
              type='street'
              placeholder='Enter street'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-3' controlId='zipCode'>
          {/* <Form.Label>Email Address</Form.Label> */}
          <FloatingLabel controlId="floatingInput" label="zipCode" className="mb-3">
            <Form.Control
              type={Number}
              placeholder='Enter address'
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-3' controlId='city'>
          {/* <Form.Label>Email Address</Form.Label> */}
          <FloatingLabel controlId="floatingInput" label="City" className="mb-3">
            <Form.Control
              type='city'
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>



        <Button className='my-3' disabled={isLoading} type='submit' variant='primary'>
          Skapa konto
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Har du redan ett konto?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Logga in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};


export default RegisterScreen;