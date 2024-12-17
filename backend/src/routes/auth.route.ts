import { Router } from 'express';
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verifyToken';


const authRoute = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/logout', logout);

authRoute.post('/verify-email', verifyEmail);
authRoute.post('/forgot-password', forgotPassword);
authRoute.post('/reset-password', resetPassword);

authRoute.post('/checkAuth',verifyToken, checkAuth);



export default authRoute;