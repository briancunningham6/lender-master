var express = require('express'),
    path = require('path'),
    http = require('http'),
    conf = require('./conf'),
    wine = require('./routes/wines');
    spirit = require('./routes/spirits'),
    passport = require('passport')

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.post('/login', passport.authenticate('local', { successRedirect: '/wines',
    failureRedirect: '/login' }));

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

app.get('/spirits', spirit.findAll);
app.get('/spirits/:id', spirit.findById);
app.post('/spirits', spirit.addSpirit);
app.put('/spirits/:id', spirit.updateSpirit);
app.delete('/spirits/:id', spirit.deleteSpirit);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
