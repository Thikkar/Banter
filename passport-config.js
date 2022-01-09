const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const User = require('./models/users');

function initialize(passport, getUserById) {
  console.log('A');
  const authenticateUser = async (username, password, done) => {
    const user = await User.find({
      username: username
    });
    if (user.length == 0) {
      return done(null, false, { message: 'No user with that username' })
    }

    try {
      if (await bcrypt.compare(password, user[0].password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }
  
  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user[0].id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize