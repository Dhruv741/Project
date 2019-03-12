const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
//YEH BHI ADDD KRO

const app = express();

// Passport Config
require('./config/passport')(passport);

// put the HTML file containing your form in a directory named "public"
// (relative to where this script is located) 

app.get("/", express.static(path.join(__dirname, "./public/upload")));

app.set('views', path.join(__dirname, '/views/'));

app.engine('hbs', exphbs({ extname: 'hbs', layoutsDir: __dirname + '/views' }));
app.set('view engine', 'hbs');

app.use( express.static( "public/upload" ) );

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
// mongoose.connect(db,{ useNewUrlParser: true })
mongoose.connect('mongodb://localhost/sample',{ useNewUrlParser: true })

  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get("/", express.static(path.join(__dirname, "./public/upload")));

