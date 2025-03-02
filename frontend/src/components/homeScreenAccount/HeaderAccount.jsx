import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 992); 


  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 992); 
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />

      {window.innerWidth < 992 && (
        <button 
          onClick={toggleSidebar} 
          style={{
            position: 'fixed',
            top: '5rem',
            left: '1rem',
            zIndex: 1000,
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <div
        style={{
          position: window.innerWidth >= 992 ? 'relative' : 'fixed', 
          top: '4rem',
          left: isOpen ? '0' : '-18rem',
          height: 'calc(100vh - 4rem)',
          width: '18rem',
          background: 'white',
          borderRight: '1px solid #DDE6ED',
          transition: 'left 0.3s ease-in-out',
          padding: '1.5rem',
          zIndex: 999
        }}
      >
        <Navbar expand="sm" className='flex-column h-100 w-100'>
          <Nav className="flex-column w-100 mt-4 text-center">
            <LinkContainer to="/konto">
              <Nav.Link className="border-top border-bottom pt-2">Start</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/konto/profile">
              <Nav.Link className="border-bottom pt-2"> Profil </Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className='flex-column mt-auto w-100 text-center'>
            <Nav.Link onClick={logoutHandler} className="border-top border-bottom pt-2"> Logga ut </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default HeaderAccount;