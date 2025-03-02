import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// CSS
import './assets/styles/index.css'; // css
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap css
import "@fortawesome/fontawesome-free/css/all.min.css";

// Redux
import { Provider } from 'react-redux'; // The <Provider> component makes the Redux store available to any nested components that need to access the Redux store.
import store from './store';

// App.js
import App from './App';

// WebVitals
import reportWebVitals from './reportWebVitals';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// Screens when login
import ProfileScreen from './screensAccount/ProfileScreen';
import OnboardingScreen from './screensAccount/OnboardingScreen';
import HomeScreenAccount from './screensAccount/HomeScreenAccount';
import PrivateRoute from './components/PrivateRoute';

// Google login
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "317531692602-ttu1vjb449aliai0a0ifg2bs8ovm9p6i.apps.googleusercontent.com";
console.log("Google Client ID:", GOOGLE_CLIENT_ID); // Kontrollera att det hämtas korrekt



console.log("React frontend har laddats!");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/konto' element={<HomeScreenAccount />} />
        <Route path='/konto/profile' element={<ProfileScreen />} />
        <Route path='/konto/onboarding' element={<OnboardingScreen />} />
      </Route>

    </Route>
  )
);



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <HelmetProvider>

          <Provider store={store}>
              <RouterProvider router={router} />
          </Provider>
          
        </HelmetProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
);

reportWebVitals();