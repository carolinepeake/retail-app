require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const logger = require('./middleware/logger');

const {
  productsRouter,
  qasRouter,
  reviewsRouter,
  cloudinaryRouter,
} = require('./routes');

const app = express();
app.use(express.json({ limit: '5000mb' }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());
// app.use(logger);

app.use('/', logger);
app.use('/products', productsRouter);
app.use('/qa', qasRouter);
app.use('/reviews', reviewsRouter);
app.use('/cloudinary', cloudinaryRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
