const mongoose = require('mongoose');

const connect = () => {
    console.log(process.env.MONGODB_URL);
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
}

module.exports = connect;