
//require express
const express = require('express');
const app = express();
//require data.json
const data = require('./data.json');
const projects = data.projects;
//set up static files
app.use('/static', express.static('public'));
//set up view engine to use pug
app.set('view engine', 'pug');
//set up 'root' route
app.get('/', (req, res) => {
    res.render('index', {
        projects
    });
});
//set up 'about' route
app.get('/about', (req, res) => {
    res.render('about');
});
//set up dynamic 'project' route with error handling 
app.get('/project/:id', (req, res, next) => {
    if (req.params.id.match(/(?<!\w)[0-4](?!\w)/)) {
        res.render('project', {
            project: projects[req.params.id]
        });
    } else {
        console.log('Page not found');
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});
//set up error handling
app.use((req, res, next) => {
    console.log('Page not found');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//set up error handling middleware which renders 'error' route
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});
//listen on port 3000
app.listen(3000, () => {
    console.log('The app is running on localhost:3000')
});