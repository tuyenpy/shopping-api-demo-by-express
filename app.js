require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;
const uri = require('./config/key').mongoURI;

//Body-parser
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.send("Welcome to Page");
});

// API routes
app.use('/api/products', require('./api/routes/product.route'));
app.use('/api/users', require('./api/routes/user.route'));


//Connect Database and start Server
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Database connected!");
    app.listen(PORT, ()=> console.log(`Server started on Port ${PORT}`));
})
.catch(err => console.log(`Invaild connect to database: `,err));