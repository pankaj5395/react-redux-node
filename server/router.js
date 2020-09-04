import express from 'express';
import passport from 'passport';
import { ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN } from './constants';

import AuthenticationController from './controllers/authentication';
import UserController from './controllers/user';

import QueueController from './controllers/queue';
import RpcController from './controllers/rpc';

import {passportService, refreshToken} from './services/passport';

import fs from 'fs';
// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

export default function (app) {

  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router();


    fs
  .readdirSync(`${__dirname}/modules/user/routes`)
  .filter(file => (file.slice(-3) === '.js'))
  .forEach((file) => {
    let className = require(`./modules/user/routes/${file}`);
    let obj = new className.default();
    getRoutes(obj); 
    console.log(obj);
  });


  function getRoutes(obj){
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => methods.add(k));
    }
    console.log(methods)
    return methods;
  }

  // Auth Routes
  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
  //Referesh Token
  authRoutes.post('/refresh-token',  AuthenticationController.refreshToken);

  // User Routes
  apiRoutes.use('/user', userRoutes);
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);


  apiRoutes.get('/set-queue', QueueController.setQueue);
  apiRoutes.get('/get-queue', QueueController.getQueue);

  apiRoutes.get('/get-rpc', RpcController.testRpc);


  apiRoutes.get('/user-only', requireAuth, AuthenticationController.roleAuthorization(2), (req, res) => {
    res.send({ content: 'User role is working.' });
  })
;
  apiRoutes.get('/admin-only', requireAuth, AuthenticationController.roleAuthorization(1), (req, res) => {
    res.send({ content: 'Admin role is working.' });
  });

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
