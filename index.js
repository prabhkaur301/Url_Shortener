const express = require('express');
const connectDB = require('./config/db')
const app= express();

//connect to database
connectDB();

app.use(express.json({extended: false}));

//Routes
app.use(express.static('./public'));
app.use('/', require('./Routes/index'));
app.use('/api/url', require('./Routes/url'));

app.listen(process.config.env||5000 , ()=>console.log("server running successfully ..."));