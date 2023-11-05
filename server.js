const express = require('express');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const sessionSecret = process.env.SESSION_SECRET;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
    })
);

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  });
