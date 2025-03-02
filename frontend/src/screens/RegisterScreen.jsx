// modules
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Row, Col, FloatingLabel, Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'; // For setting the login credentials. From backen JWT





const RegisterScreen = () => {
  const [step, setStep] = useState(1);

  const [firstName, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation(); // Initializing the register mutation from userApiSlice.js
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => { // Heare we check for user info, and then navigate to redirect if they manage to login
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);




  const handleBackStep = (e) => {
    e.preventDefault();
    setStep(step - 1); // Move back one step
  };


  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    setStep(2); // Move to Step 2
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    setStep(3); // Move to Step 3
  };

  const handleSubmitStep3 = async (e) => {
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
          currentAddress,
          newAddress,
          zipCode,
          city,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };



  return (
    <>
    <Header />
    <FormContainer>
      <h1 style={{ paddingTop: '90px' }}>Skapa konto</h1>
        <Form>
          {step === 1 && ( // if step is 1.. do this:
              <Row>
              <h3 className='my-4'>Personuppgifter</h3>
                <Row>
                  <Col>
                    <Form.Group className='my-2' controlId='firstName'>
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
                    <Form.Group className='my-2' controlId='surname'>
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
                <Form.Group className='my-2' controlId='email'>
                  <FloatingLabel controlId="floatingInput" label="namn@exempel.com" className="mb-3">
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                  <FloatingLabel controlId="floatingInput" label="Lösenord" className="mb-3">
                    <Form.Control
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                  <FloatingLabel controlId="floatingInput" label="Bekräfta lösenord" className="mb-3">
                    <Form.Control
                      type='password'
                      placeholder='Confirm password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>

                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button 
                      className='m-2' 
                      disabled={isLoading} 
                      type='submit' 
                      variant='primary' 
                      onClick={handleSubmitStep1} 
                      aria-controls="example-collapse-text"

                      >
                      Nästa steg
                    </Button>
                  </Col>
                </Row>
              </Row>
          )}


          {step === 2 && (
              <Row>
              <h3 className='my-4'>Adress 1</h3>
                <Form.Group className='my-2' controlId='zipCode'>
                    <FloatingLabel controlId="floatingInput" label="Postnummer" className="mb-3">
                    <Form.Control
                        type='zipCode'
                        placeholder='Enter zipCode'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    ></Form.Control>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className='my-2' controlId='city'>
                    <FloatingLabel controlId="floatingInput" label="Stad" className="mb-3">
                    <Form.Control
                        type='city'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                    </FloatingLabel>
                </Form.Group>

                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button className='m-2' color='secondary' type='submit' variant='primary' onClick={handleBackStep}>
                      Tillbaka
                    </Button>
                    {' '}
                    <Button className='m-2' disabled={isLoading} type='submit' variant='primary' onClick={handleSubmitStep2}>
                      Nästa steg
                    </Button>
                  </Col>
                </Row>

              </Row>
          )}
          


          
          {step === 3 && (
              <Row>
              <h3 className='my-4'>Adress 2</h3>
                <Form.Group className='my-2' controlId='currentAddress'>
                    <FloatingLabel controlId="floatingInput" label="Gata" className="mb-3">
                    <Form.Control
                        type='currentAddress'
                        placeholder='Enter current address'
                        value={currentAddress}
                        onChange={(e) => setCurrentAddress(e.target.value)}
                    ></Form.Control>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className='my-2' controlId='newAddress'>
                    <FloatingLabel controlId="floatingInput" label="Lägenhetsnummer" className="mb-3">
                    <Form.Control
                        type='newAddress'
                        placeholder='Enter new address'
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    ></Form.Control>
                    </FloatingLabel>
                </Form.Group>

                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button className='m-2' color='secondary' type='submit' onClick={handleBackStep}>
                      Tillbaka
                    </Button>
                    {' '}
                    <Button className='m-2' disabled={isLoading} type='submit' color='success' onClick={handleSubmitStep3}>
                      Skapa konto
                    </Button>
                  </Col>
                </Row>

              </Row>
          )}


                <Row className='py-2'>
                  <Col>
                    Har du redan ett konto?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                      Logga in
                    </Link>
                  </Col>
                </Row>


          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </>

  );
};




export default RegisterScreen;