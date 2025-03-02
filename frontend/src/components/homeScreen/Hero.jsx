import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div
        className='text-center bg-image position-relative'
        style={{
          height: '100vh',
          backgroundImage: "url('https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlZlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom'
        }}
      >
        <div className='mask position-absolute w-100 h-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white col-11 d-flex flex-column align-items-center'>
              
              <h1 className='mb-5' style={{ transform: 'translateY(-33%)' }}>
              JWT-baserad autentisering med MERN
              </h1>

              {!userInfo && (
                <div className="w-100 d-flex flex-column align-items-center">
                  <Button href='/register' size='lg' className='mb-4 w-50 text-dark' variant='light'>
                    Skapa konto
                  </Button>
                  <Button href='/login' size='lg' className='w-50 text-light' variant='dark'>
                    Logga in
                  </Button>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;