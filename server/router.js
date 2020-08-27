import express from 'express';
import passport from 'passport';
import { ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN } from './constants';

import AuthenticationController from './controllers/authentication';
import UserController from './controllers/user';
import {passportService, refreshToken} from './services/passport';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

export default function (app) {

  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router();

  // Auth Routes
  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
  //Referesh Token
  authRoutes.post('/refresh-token',  AuthenticationController.refreshToken);

  // User Routes
  apiRoutes.use('/user', userRoutes);
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);


  apiRoutes.get('/user-only', requireAuth, AuthenticationController.roleAuthorization(2), (req, res) => {
    res.send({ content: 'User role is working.' });
  });

  apiRoutes.get('/admin-only', requireAuth, AuthenticationController.roleAuthorization(1), (req, res) => {
    res.send({ content: 'Admin role is working.' });
  });

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
