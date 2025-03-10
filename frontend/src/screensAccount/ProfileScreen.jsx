import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// slices
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

// components
import Loader from '../components/Loader';
import ContentContainer from '../components/homeScreenAccount/ContentContainer';


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
    <>
      <ContentContainer>
            <h1 className='my-4 pt-5'>Profil </h1>
            <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <Form.Group className='my-3' controlId='firstName'>
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
              <FloatingLabel controlId="floatingInput" label="Bekräfta lösenord" className="mb-3">
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>


              <Button type='submit' variant='primary'>
                Uppdatera
              </Button>
              {loadingUpdateProfile && <Loader />}
            </Form>
      </ContentContainer>
    </>
  );
};

export default ProfileScreen;