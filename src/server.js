const express = require('express');
const routes = require('./routes');
const PORT = process.env.PORT || 3333;
const path = require('path');
const moment = require('moment');

require('./database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.locals.moment = moment;

app.use(express.urlencoded({ extended: true })); // Used to parse JSON bodies
app.use(express.json()); //Parse URL-encoded bodies for form data
app.use(routes);

app.listen(PORT, function (err) {
  if (err) console.log('Server configuration error:' + err);
  console.log(
    `Server connected successfully, click on the link holding the CTRL key to access: \n 🚀 http://localhost:${PORT}/ \n`
  );
});
