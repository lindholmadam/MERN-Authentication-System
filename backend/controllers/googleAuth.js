import { OAuth2Client } from 'google-auth-library';
import asyncHandler from '../middleware/asyncHandler.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = asyncHandler(async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload;
});

export default verifyGoogleToken;