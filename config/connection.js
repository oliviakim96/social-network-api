const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://oliviakim96:Password0625!@cluster0.3wtol.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    unUnifiedTopology: true,
});

module.exports = mongoose.connection;
