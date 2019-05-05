const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//init logger middleware
app.use(logger);

//init body parser middleware
app.use(express.json());
//handles form submissions and url encoded data
app.use(express.urlencoded({ extended: false }));

//init handlebars middleware
//set template engine to handlebars and setting default layout to main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//set view engine
app.set('view engine', 'handlebars');

//homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Members App',
    members: members
}));


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//init members api via express router
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}...`));