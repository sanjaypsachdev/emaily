const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.oldMongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // If Express does not find any route defined then
  // it will look for the specified file path inside client/build.
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it does not recognize the route.
  // Catch all case !
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);