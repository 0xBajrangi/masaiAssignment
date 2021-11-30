const mongoose = require('mongoose');

// connnect
module.exports = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/mvc");
};
