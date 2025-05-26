import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
      if (connectionInstance) {
      console.log(
        `Mongo Db successfully connected and the instance is ${connectionInstance.connection.host}`
      );
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

export { connectToDb };
