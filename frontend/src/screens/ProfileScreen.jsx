import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
// import Message from '../components/Message';




const ProfileScreen = () => {
  const [firstName, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setName(userInfo.firstName);
    setSurname(userInfo.surname);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.firstName, userInfo.surname]);

  const dispatch = useDispatch();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, firstName, surname, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    
  };

  return (
    <FormContainer>
          <h2>Hej {firstName}</h2>

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

          <Form.Group className='my-3' controlId='city'>
            <FloatingLabel controlId="floatingSelect" label="Stad">
              <Form.Select aria-label="Floating label select example">
                <option></option>
                <option value="1">Stockholm</option>
                <option value="2">Göteborg</option>
                <option value="3">Malmö</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

            <Button type='submit' variant='primary'>
              Uppdatera
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
    </FormContainer>
  );
};

export default ProfileScreen;