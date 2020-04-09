require('dotenv/config');
//const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./routes/userRoutes');
const recipeRouter = require('./routes/recipeRoutes');
const viewRouter = require('./routes/viewRoutes');
const cookieParser = require('cookie-parser');

const path = require('path');


const DB = process.env.DATABASE;
//dotenv.config({path: './config.env'});

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con => {
    console.log('DB connection successful');
})

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// tester middleware

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
  //  console.log(req.cookies);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// PUG

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT;

app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipe', recipeRouter);
app.use('/api/v1/view', viewRouter);

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});