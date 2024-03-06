const express = require('express');
const path = require('path');
const cors = require('cors');
const { router, productsRouter, questionsRouter, answersRouter, relatedRouter, reviewsRouter, cloudinaryRouter } = require('./routes');
const logger = require('./middleware/logger');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '5000mb' }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());
app.use(logger);

app.use('/', router);
app.use('/products', productsRouter);
app.use('/questions', questionsRouter);
app.use('./answers', answersRouter);
app.use('./related', relatedRouter);
app.use('./reviews', reviewsRouter);
app.use('/cloudinary', cloudinaryRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
