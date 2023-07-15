import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';




const Hero = () => {
  return (
    <>
      <div
        id='intro-example'
        className='p-5 text-center bg-image'
        style={{ height: '85vh', backgroundImage: "url('https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white col-8'>
              <h1 className='mb-3'>Flytta med ett click</h1>
              <h5 className='mb-4'>flyttaNu samlar alla dina avtal och abonnemang registrerade på din nuvarande adress och flyttar över dessa till den nya adressen. Allt för en smidig och stressfri flytt.</h5>
              <MDBBtn
                className="m-2"
                color='info'
                tag="a"
                outline
                size="lg"
                href='/register'
              >
                Börja flytta
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Hero;