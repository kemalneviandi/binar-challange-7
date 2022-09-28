const { User } = require ('../models')
const passport = require ('../lib/passport')
const user = require('../models/user')

function format (user) {
  const { id, username } = user
  return {
    id,
    username,
    accessToken: user.generateToken()
  }
}

module.exports = {
  register: (req,res,next) => {
    User.register(req.body)
    .then (() => {
      res.redirect('/login')
    })
    .catch(err => next(err))
  },
  login: passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true // Untuk mengaktifkan express flash
    }),
    loginJwt: (req,res) => {
      User.authenticateUser(req.body)
      .then(user =>{
        res.json(
          format(user)
        )
      })
    },
}