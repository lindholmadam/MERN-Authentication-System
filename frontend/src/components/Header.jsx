import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

import logo from '../assets/images/crown-seeklogo.svg';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Kolla om vi är på startsidan
  const isRegisterPage = location.pathname === "/register"; // Kolla om vi är på register-sidan

  const hideLoginBtn = isRegisterPage;
  const hideRegisterBtn = isRegisterPage; 

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

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
      <header style={{ zIndex: 1005 }}>
        <Navbar expand="lg" className="w-100 z-1 bg-body-tertiary position-fixed">
          <Container>

            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={logo} alt="Logo" width="60" height="auto" />
              </Navbar.Brand>
            </LinkContainer>

            {/* Visa endast meny om vi är på startsidan eller register-sidan */}
            {(isHomePage) && (
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ms-auto align-items-center">
                    {userInfo ? (
                      <>
                        {/* Visa "Mitt konto" och "Logga ut" i navbaren på stora skärmar */}
                        <div className="d-none d-lg-flex gap-2">
                          <LinkContainer to="/konto">
                            <Nav.Link>Mitt konto</Nav.Link>
                          </LinkContainer>
                          <Nav.Link onClick={logoutHandler}>Logga ut</Nav.Link>
                        </div>

                        {/* Visa "Mitt konto" och "Logga ut" i hamburgermenyn */}
                        <div className="d-lg-none w-100 text-center">
                          <LinkContainer to="/konto">
                            <Nav.Link>Mitt konto</Nav.Link>
                          </LinkContainer>
                          <Nav.Link onClick={logoutHandler}>Logga ut</Nav.Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-none d-lg-flex gap-2">
                          {!hideLoginBtn && (
                            <LinkContainer to="/login">
                              <Nav.Link>Logga in</Nav.Link>
                            </LinkContainer>
                          )}
                          
                          {!hideRegisterBtn && (
                            <LinkContainer to="/register">
                              <Nav.Link>Skapa konto</Nav.Link>
                            </LinkContainer>
                          )}
                        </div>

                        {/* Visa länkar i hamburgermenyn */}
                        <div className="d-lg-none w-100 text-center">
                          {!hideLoginBtn && (
                            <LinkContainer to="/login">
                              <Nav.Link>Logga in</Nav.Link>
                            </LinkContainer>
                          )}

                          {!hideRegisterBtn && (
                            <LinkContainer to="/register">
                              <Nav.Link>Skapa konto</Nav.Link>
                            </LinkContainer>
                          )}
                        </div>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </>
            )}

          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;