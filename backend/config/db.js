import mongoose, { createConnection } from 'mongoose';

const connection_link ="mongodb+srv://aroravinayak38:yUg3S94YhDLx1ylL@cluster0.o84bw.mongodb.net/"

const connect_db = async () => {
    try {
        await mongoose.connect(connection_link);
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        console.error('Error while connecting to the database:', err.message);
        process.exit(1); // Exit the app if the database connection fails
    }
};

export default connect_db;
