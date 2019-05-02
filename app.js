const express = require('express');
const app = express();

const data = require('./data.json');
const projects = data.projects;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('The app is running on localhost:3000')
});