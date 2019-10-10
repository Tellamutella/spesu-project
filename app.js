require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook");
global.access_token = process.env.MAP_BOX_API_KEY


mongoose
  .connect("mongodb://localhost/spesu-project", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.locals.MAP_BOX_API_KEY = process.env.MAP_BOX_API_KEY
// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: "basic-auth-secret",
    resave: true,
    saveUninitialized: true, // option when youre setting up the cookie for the session for the first time, whether it will automatically save or not
    cookie: { maxAge: 24 * 60 * 60 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

// Express View engine setup
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use('/', (req,res,next)=>{
  if(req.session.currentUser){
      res.locals.user = req.session.currentUser;
  }
  next();
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//       enableProof: true
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ facebookId: profile.id }, function(err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// app.get("/auth/facebook", passport.authenticate("facebook"));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log(res)
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
// Express View engine setup

app.use('/', (req, res, next) => {
  console.log(res.MAP_BOX_API_KEY)
  if (req.session.currentUser) {
    res.locals.user = req.session.currentUser;
  }
  next();
})

app.use('/', require('./routes/index'));
app.use('/', require('./routes/spaces'));
app.use('/', require('./routes/users'));
app.use('/',require('./routes/book'));
app.use("/auth", require("./routes/auth"));

app.listen(3000, () => {
  console.log("listening 3000");
});

module.exports = app;
