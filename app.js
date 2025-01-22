var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRoute = require('./routes/products,db.js');
var contactRouter = require('./routes/contact');
var searchRouter = require("./routes/search-page");
var adminLogInRouter = require('./routes/admin/log-in');
var adminRouter = require('./routes/admin/admin');
var adminEditRouter = require('./routes/admin/admin-edit');
var adminAddRouter = require('./routes/admin/admin-add');
var teamRoutes = require('./routes/team');
var aboutRouter = require('./routes/about');
var categoryRouter = require('./routes/category'); 


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.db', dir: path.join(__dirname, 'db') }),
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // 1 hour
  })
);

app.use((req, res, next) => {
  res.locals.isLoggedIn = false;
  next();
});

app.use((req, res, next) => {
  res.locals.isLoggedIn = !!req.session.adminId; 
  next();
});

app.use('/admin', (req, res, next) => {
  if (!req.session.adminId && req.method === 'GET') {
    return res.redirect('/');
  }
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(productsRoute);
app.use('/contact', contactRouter);
app.use(searchRouter);
app.use('/admin', adminLogInRouter);
app.use('/admin', adminRouter);
app.use('/admin-edit', adminEditRouter);
app.use('/admin-add', adminAddRouter);
app.use('/team', teamRoutes);
app.use('/about', aboutRouter);
app.use('/kategori', categoryRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
