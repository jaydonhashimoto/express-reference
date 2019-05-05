const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

//init logger middleware
app.use(logger);
//init body parser middleware
app.use(express.json());
//handles form submissions
//handles url encoded data
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//init members api via express router
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}...`));