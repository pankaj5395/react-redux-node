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
    expiresIn: 60810 // in seconds
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
    //console.log('user', user);
    if(user){
      return res.status(422).send({ error: 'That email address is already in use.' });
    }
    else{
      const userData = {
        email,
        password,
        firstName, 
        lastName,
        role
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
};

exports.refreshToken = (req, res, next) => {

  const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }
    console.log(token);
    jwt.verify(token, config.secret, (err, user) => {
      console.log(err)
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = `JWT ${generateToken(user)}`;

        res.json({
            accessToken
        });
    });

}

//= =======================================
// Authorization Middleware
//= =======================================

// Role authorization check
exports.roleAuthorization = function (requiredRole) {
  return async function (req, res, next) {
    const user = req.user;
    console.log('i  callled')
    const foundUser = await database.User.findOne({where:{id:user.id}}) //, (err, foundUser) => {
      if (!foundUser) {
        return res.status(422).json({ error: 'No user was found.' });
        //return next();
      }
      // If user is found, check role.
      console.log(foundUser.role, await getRole(foundUser.role))
      console.log(requiredRole, await getRole(requiredRole))
      if (await getRole(foundUser.role) == await getRole(requiredRole)) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    //});
  };
};
