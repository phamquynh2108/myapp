var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auths');
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users')
var uploadRouter = require('./routes/upload')
const cors = require('cors');
var app = express();
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true,useUnifiedTopology: true});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true,
}))

app.use('/', indexRouter);
app.use('/auths', authRouter);
app.use('/users',usersRouter);
app.use('/posts', postsRouter);
app.use('/uploads', uploadRouter);

module.exports = app;
