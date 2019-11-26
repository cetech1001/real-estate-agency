import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user';
import { UserInterface } from '../interfaces/user';

passport.use(new Strategy({ usernameField: 'email' }, (async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return done(null, false, { message: 'Invalid Login Details' });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const passwordOK = await user.comparePassword(password);
    if (!passwordOK) {
      return done(null, false, { message: 'Invalid Login Details' });
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
})));

// eslint-disable-next-line no-underscore-dangle
passport.serializeUser((user: UserInterface, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

export default {
  initialize: passport.initialize(),
  session: passport.session(),
};
