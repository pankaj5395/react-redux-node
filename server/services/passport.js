import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../models/user';
import config from '../config';

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email'
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  let user = await database.User.findOne({where:{ email }})

  if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
  let isMatch = await database.User.comparePassword(password, user.password);
  console.log(isMatch);
  if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
  return done(null, user);
  
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret,
};

// Setting up JWT login strategy
const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
  console.log('payload', payload);
  let user = await database.User.findOne({where:{ id: payload.id}})
  if(!user)
    return done(err, false);
  else
    done(null, user);

});


exports.refreshToken = () => {
  console.log('i called', jwtOptions.jwtFromRequest);
   let tt = new Strategy(jwtOptions, async (payload, done) => {
    console.log('payload', payload);
    let user = await database.User.findOne({where:{ id: payload.id}})
    if(!user)
      return done(err, false);
    else
      done(null, user);

  });
   console.log('tt', tt);
}


passport.use(jwtLogin);
passport.use(localLogin);