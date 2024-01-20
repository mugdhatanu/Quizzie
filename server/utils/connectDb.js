const mongoose = require('mongoose')

const runServer = (app) => {
    app.listen(process.env.PORT, () => {
        console.log("Listening to port " + process.env.PORT);
    })
}

const connectToDatabase = async (app) => {
    await mongoose.connect(process.env.MONGO_URI);
    runServer(app);
}

module.exports = connectToDatabase;