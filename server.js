const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h2>Hello World!!</h2>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}...`));