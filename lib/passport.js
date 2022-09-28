const passport = require ('passport')
const { serialize } = require('pg-protocol')
const LocalStrategy = require('passport-local').Strategy
    const { Strategy: JwtStrategy, ExtractJwt }  = require('passport-jwt' )
const { User } = require('../models')

async function authenticate(username,password,done) {
  try {
    const user = await User.authenticateUser({ username,password})
    return done(null, user)
  }
  catch(err) {
    return done(null, false, {message:err.message})
  }}
  const option = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'ini rahasia',
  }
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password'},authenticate)
  );
  passport.serializeUser(
    (user,done) => done(null, user.id)
  );
  passport.deserializeUser(
    async (id, done) => done(null, await User.findByPk(id))
    );
    
    passport.use(new JwtStrategy(option ,async(payload,done) => {
      User.findByPk(payload.id)
      .then(user => done(null,user))
      .then(err => done(err,false))
    }))
   
  module.exports = passport
  