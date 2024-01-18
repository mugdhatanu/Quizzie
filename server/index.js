const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user',userRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(
    () => {
        app.listen(process.env.PORT, () => {
            console.log("Listening to port " + process.env.PORT);
        })
    }
)
