import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLoginMutation } from '../slices/usersApiSlice.js';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginPage = () => {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();

  const responseGoogle = async (response) => {
    try {
      const { tokenId } = response;
      const googleToken = tokenId;

      const { data } = await googleLogin(); // Call the mutation

      console.log(data); // Handle the successful login response
    } catch (error) {
      console.error(error);
      // Handle the login error
    }
  };

  return (
    <GoogleLogin
      render={(renderProps) => (
        <button
          type="button"
          className=""
          onClick={renderProps.onClick}
          disabled={renderProps.disabled || isLoading} // Disable the button during mutation loading
        >
          <FcGoogle className="" /> Logga in med Google
        </button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginPage;