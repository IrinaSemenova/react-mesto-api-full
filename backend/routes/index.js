const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signupValidate, signinValidate } = require('../middlewares/validator');

router.post('/signup', signupValidate, createUser);

router.post('/signin', signinValidate, login);

router.get('/signout', (req, res) => {
  res.clearCookie('authorization').send({ message: 'Выход' });
});

router.use(auth);
router.use(routerUsers);
router.use(routerCards);

module.exports = router;
