import mongoose from 'mongoose';
const ConnectToDb =  async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL);
      console.log('✅ MongoDB connected successfull..');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }

}


export default ConnectToDb;