const AuthService = require("../services/auth.service.js")
const authService = new AuthService


class AuthController {
    async logOut(req, res) {
        authService.logOut(req.session)
        return res.redirect('/auth/login')
    }

    async logInGet(req, res) {
        return res.render('login', {})
    }

    async saveSession(req, res) {
        authService.saveSession(req.session, req.user)
        return res.redirect('/products')
    }

    async registerGet(req, res) {
        return res.render('register', {})
    }

    async failure(req, res) {
        return res.send(JSON.stringify('something went wrong'))
    }

}


module.exports = AuthController