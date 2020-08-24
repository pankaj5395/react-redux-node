import jwt from 'jsonwebtoken';
import crypto from 'crypto';
//import User from '../models/user';
import { setUserInfo, getRole } from '../services/helpers';
import config from '../config';
//var User = require('../models/user');
// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds
  });
}

//= =======================================
// Login Route
//= =======================================
exports.login = function (req, res, next) {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
};


//= =======================================
// Registration Route
//= =======================================
exports.register =  async  (req, res, next) => {

  console.log('hhhhh')
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }
  try {
    let user = await database.User.findOne({ where:{ email }})
    console.log('user', user);
    if(user){
      return res.status(422).send({ error: 'That email address is already in use.' });
    }
    else{
      const userData = {
        email,
        password,
        firstName, 
        lastName 
      };
    
      user = await database.User.create(userData);
      user = JSON.parse(JSON.stringify(user))
      console.log(user);
      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
  
    }
  }
  catch(e){
    console.log(e)
    return res.status(500).send({ error: 'Server Error' });
  }
  /*, (err, existingUser) => {
    console.log(err,  existingUser);
    if (err) { return next(err); }

      // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

      // If email is unique and password was provided, create account
    const user = new User({
      email,
      password,
      firstName, 
      lastName 
    });
    consol.log(user)
    user.create((err, user) => {
      if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });*/
  //};
};

//= =======================================
// Authorization Middleware
//= =======================================

// Role authorization check
exports.roleAuthorization = function (requiredRole) {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (getRole(foundUser.role) >= getRole(requiredRole)) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    });
  };
};
