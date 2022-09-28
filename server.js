const express = require ('express')
const app = express ()
const session =require ('express-session')
const flash = require ('express-flash')
const PORT = 3000 
const db = require('./models')
app.use(express.urlencoded({ extended: false}))

app.use (session({
  secret: 'buat ini jadi rahasia',
  resave: false,
  saveUninitialized: false
}))
//passport settings
 const passport = require ('passport')
 app.use(passport.initialize())
 app.use(passport.session())
 //flash settings
 app.use(flash())
 //view engine settings
 app.set('view engine', 'ejs')
 
 
 const router = require('./routers/Router.js')
 app.use(router)
 db.sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log("Server connected at http://localhost:3000");
    console.log("database connected")
  });
})