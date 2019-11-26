import mongoose from 'mongoose';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect: async (uri: string): Promise<any> => mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }),
};
