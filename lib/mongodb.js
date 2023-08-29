import mongoose from 'mongoose';

const connect = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`);
    }
  } catch (e) {
    console.log(e);
  }
};

export default connect;
