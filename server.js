const express =require('express');
const mongoose = require('mongoose');

const app = express();
const PORT=process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://oliviakim96:Mongodb0625!@cluster0.3wtol.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
});

mongoose.set('debug',true);

app.use(require('./routes'));

app.listen(PORT, ()=>console.log(`Connected on localhost:${PORT}`));
