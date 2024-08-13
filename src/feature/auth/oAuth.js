/*const passport = require('passport');
const Auth = require('../../utils/index');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

class AuthController {
    constructor() {
        this.initializePassport();
    }

    initializePassport() {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8000/api/auth/google/callback'
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const existingUser = await Auth.findOne({ where: { userId: profile.id } });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = await Auth.create({
                    userId: profile.id,
                    secretKey: profile._json.email,
                    accountStatus: true
                });

                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }));

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) => {
            const user = await Auth.findByPk(id);
            done(null, user);
        });
    }

    authenticateGoogle(req, res, next) {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }

    googleCallback(req, res) {
        res.redirect('/dashboard');
    }

    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = new AuthController();*/