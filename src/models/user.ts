import { model, Schema } from 'mongoose';
import emailValidator from 'email-validator';
import bcrypt from 'bcryptjs';

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: emailValidator.validate,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['agent', 'admin'],
  },
  phoneNumber: {
    type: String,
    maxlength: 15,
  },
  facebook: String,
  twitter: String,
  instagram: String,
  skype: String,
  youtube: String,
});

schema.pre('save', async function hashPassword(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return bcrypt.hash(user.password, 12, (err, hash) => {
    if (err) {
      return next(err);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    user.password = hash;
    return next();
  });
});

// eslint-disable-next-line max-len
schema.methods.comparePassword = async function comparePassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default model('User', schema, 'users');