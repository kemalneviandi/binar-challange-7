const router= require ('express').Router()
const auth = require ('../controllers/authController')
const {restrict, notrestrict} = require('../middlewares/restrict')

router.get('/', (req,res) => res.redirect ('/login'))
router.get('/home',restrict, (req,res) => {
  res.render ('index')
})
router.get('/register', (req,res) => {res.render('register')})
router.post('/register', auth.register)
router.get('/login', notrestrict, (req, res) => res.render('login'))
router.post('/login', auth.login)  
router.get('/', (req,res) => res.render('index'))
router.post('/api/v1/auth/register', auth.register)
router.post('/api/v1/auth/login', auth.loginJwt)

module.exports = router;