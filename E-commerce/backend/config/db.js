import mongoose from "mongoose";

// Connects to the database using the provided DATABASE_URI.
const connectDB = async () => {
   try {
    
     await mongoose.connect(process.env.DATABASE_URI);

     console.log(`succesfully connected to database ✌`);

   } catch (error) {
       console.error(`ERROR: ${error.message}`);
       process.exit(1);
   }
}

export default connectDB;