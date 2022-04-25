import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://akzhol:carambatv01@cluster0.osdlq.mongodb.net/js-notes?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Ersssddddddddddssssror: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
// mongodb+srv://akzhol:carambatv01@cluster0.osdlq.mongodb.net/js-notes
