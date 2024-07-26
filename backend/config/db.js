import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
      useUnifiedTopology: true,
        })
        console.log('Db connection established')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}