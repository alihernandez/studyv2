const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
// const colors = require('colors');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const logger = require('morgan');
const routes = require('./routes');
const path = require("path");


//method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));

//method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

//The logger middleware will generate a detailed log using what is called the default format. The logger actually supports four predefined log formats: default, short ,tiny, and dev. Each of these predefined formats show various amounts of detail
app.use(logger('dev'));

//The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.
app.use(flash());

//Serves static files in Express.
// app.use(express.static('public'));

//Keeps trrack of user session.
app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
  }),
);

//Tells app to initialize and use Passport
app.use(passport.initialize());
app.use(passport.session());


//Sets routes in Express.
app.use(routes);


// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/studybuddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


mongoose.set('useFindAndModify', false);


// Start the API server
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`🌎  connected on port ${PORT} 🌍`);
});
