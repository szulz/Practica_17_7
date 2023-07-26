const express = require('express');
const Auth = require('../middlewares/auth.js');
const auth = new Auth;
const authRouter = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/auth.controller.js');
const authController = new AuthController


authRouter.get('/logOut', authController.logOut)

authRouter.get('/login', auth.currentSession, authController.logInGet)

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/fail' }), authController.saveSession)

authRouter.get('/register', auth.currentSession, authController.registerGet)

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/fail' }), authController.saveSession)

authRouter.get('/fail', authController.failure)

module.exports = authRouter;