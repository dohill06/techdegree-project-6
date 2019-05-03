const express = require('express');
const app = express();

const data = require('./data.json');
const projects = data.projects;

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {
    if (req.params.id.match(/(?<!\d)[0-4](?!\d)/)) {
        res.render('project', {project: projects[req.params.id]});
    } else {
        console.log('Page not found');
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

app.use((req, res, next) => {
    console.log('Page not found');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);   
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');    
});

app.listen(3000, () => {
    console.log('The app is running on localhost:3000')
});