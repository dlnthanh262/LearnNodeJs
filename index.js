const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 5000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var users = [
    {
        id: 1,
        name: 'Thanh'
    },
    {
        id: 2,
        name: 'Thao'
    }
];

app.get('/', function(req, res) {
    res.render('index', {
        name: 'AAA'
    });
});
app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    });
});
app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchUsers
    });
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.post('/users/create', function(req, res) {
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('Server listen on port ' + port);
});
