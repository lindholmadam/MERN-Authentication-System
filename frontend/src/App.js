import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';// Renders the child route's element
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';
import { ToastContainer } from 'react-toastify';// Allows to add notifications to the app
import 'react-toastify/dist/ReactToastify.css';


console.log("App.js renderas!");

const App = () => {
  const location = useLocation();
  // Set the condition for when the component should be hidden
  const hidePartials =  location.pathname === '/login' || location.pathname === '/register' || location.pathname.includes('konto');

  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);



  
  return (
    <>
      <ToastContainer />
      <>
        { hidePartials ? null : <Header/> }
      </>
        <main>
            <Outlet />
        </main>
      <>
        {/* { hidePartials ? null : <Footer/> } */}
      </>
    </>
  );
};

export default App;
