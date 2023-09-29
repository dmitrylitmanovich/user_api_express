const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const usersRouter = require('./routes/users');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express User API',
    version: '1.0.0',
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', usersRouter);

module.exports = app;
