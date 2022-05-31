const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27016/social-network',{
    useNewUrlParser: true,
    unUnifiedTopology: true,
});

module.exports = mongoose.connection;
