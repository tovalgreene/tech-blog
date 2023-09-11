const express = require('express');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const homeRoutes = require('./controllers/homeController');
const postRoutes = require('./controllers/postController');
const userRoutes = require('./controllers/userController');

app.use('/', homeRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  });
