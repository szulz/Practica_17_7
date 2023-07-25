
class AuthService {
    async logOut(session) {
        return session.destroy()
    }

    async saveSession(session, user) {
        return session.user = {
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            cart: user.cart,
            role: user.role
        }
    }
}

module.exports = AuthService