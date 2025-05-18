import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser'; // Add this import
// import dotenv from 'dotenv'; // ask sir what is the purpse
import connect_db from './config/db.js';

// importing Routes
import usersSignUpRouter from './routes/users-signup-routes.js'
import usersLoginRouter from './routes/users-login-routes.js'
import profileRouter from './routes/profile-routes.js';
import challengesRouter from './routes/challenges-routes.js';
import messagesRouter from './routes/messages-routes.js';
import authRoutes from './routes/authRoute.js'; 



import cors from "cors";
// dotenv.config(); // ask sir
import { fileURLToPath } from "url";
import path from 'path';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// sir's code
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: false}))
// Connect to database
connect_db();



const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Add any custom headers your client may send

  // don't know about this - will ask sir
  credentials: true, // Allow cookies or other credentials
};
app.use(cors(corsOptions));

// alternative of cors lib below:
// app.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE,OPTIONS')
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization") // contenet-type will be the key where the dtype will be mentioned. e.g content-type: String/FormData
//     next();
// })


// Sample route
app.get('/', (req, res) => {
    res.send('API is running...');
});



app.use('/users-signup-api', usersSignUpRouter)
app.use('/users-login-api', usersLoginRouter)
app.use('/profile-api', profileRouter)
app.use('/challenges-api', challengesRouter)
app.use('/messages-api', messagesRouter);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on port: ${PORT}`);
});
