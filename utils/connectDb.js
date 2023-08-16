import mongoose from 'mongoose';

const connectDB = async () => {
    const URIwithPwd = process.env.DB_CONNECTION_STRNG.replace('<password>', encodeURIComponent(process.env.DB_PASSWORD));
    const completeUri = URIwithPwd + process.env.DB_NAME;
    try {
        await mongoose.connect(completeUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected sucessfully`.brightMagenta);
    } catch (error) {
        console.error(`Error: ${error.message}`.red);
        process.exit(1);
    }
};

export default connectDB;