const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config/env.config.js");


class Auth {
    async connectionCheck(req, res, next) {
        try {
            let email = req.session.user.email;
            if (email == undefined || email == false) {
                console.log('no estás logeado');
                return res.redirect('/auth/register')
            }
            console.log('estas log');
            return next()
        } catch (e) {
            console.log('no hay user en la session');
            return res.redirect('/auth/register')
        }
    }

    async currentSession(req, res, next) {
        if (req.session.user) {
            console.log('ya estas logeado');
            return res.redirect('/products')
        }
        console.log('podes loguearte/registrarte');
        return next()
    }

    async isAdmin(req, res, next) {
        if (ADMIN_EMAIL == false) {
            console.log('no sos admin');
        } else {
            console.log('sos adm')
            return res.redirect('auth/login')
            
        }

        return next()
    }

}


module.exports = Auth;