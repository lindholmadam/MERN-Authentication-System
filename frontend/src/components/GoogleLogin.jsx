import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const GoogleLoginPage = () => {
    const dispatch = useDispatch();

    const handleSuccess = async (response) => {
        try {
            const { data } = await axios.post('/api/users/google-auth', {
                token: response.credential,
            });

            dispatch(setCredentials(data));
        } catch (error) {
            toast.error('Google login failed');
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
                toast.error('Google login failed');
            }}
        />
    );
};

export default GoogleLoginPage;

















// import React from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import { useGoogleLoginMutation } from '../slices/usersApiSlice.js';
// import { GoogleLogin } from '@react-oauth/google';

// const GoogleLoginPage = () => {
//   const [googleLogin, { isLoading }] = useGoogleLoginMutation();

//   const responseGoogle = async (response) => {
//     try {
//       const { tokenId } = response;
//       const googleToken = tokenId;

//       const { data } = await googleLogin(); // Call the mutation

//       console.log(data); // Handle the successful login response
//     } catch (error) {
//       console.error(error);
//       // Handle the login error
//     }
//   };

//   return (
//     <GoogleLogin
//       render={(renderProps) => (
//         <button
//           type="button"
//           className=""
//           onClick={renderProps.onClick}
//           disabled={renderProps.disabled || isLoading} // Disable the button during mutation loading
//         >
//           <FcGoogle className="" /> Logga in med Google
//         </button>
//       )}
//       onSuccess={responseGoogle}
//       onFailure={responseGoogle}
//       cookiePolicy="single_host_origin"
//     />
//   );
// };

// export default GoogleLoginPage;