const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const errorHandler = require('./middleware/errorHandler');
const routeHandler = require('./middleware/routeHandler');
const connectToDatabase = require('./utils/connectDb');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',(req,res) => {
    res.status(200).json({msg: "Server is running"})
})
app.use('/users',userRoutes);
app.use('/quizzes',quizRoutes);
app.use(routeHandler);
app.use(errorHandler);

connectToDatabase(app);

