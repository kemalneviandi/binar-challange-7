module.exports = {
  restrict: (req,res,next) => {
    if (req.isAuthenticated()) return next ()
  res.redirect ('/login')
  },
  notrestrict: (req,res,next) => {
    if (req.isAuthenticated()) return res.redirect('/home')
  next ()
  }
}