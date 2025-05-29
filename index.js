const express = require('express');
const app = express();
const port = 9000;
const booksRoutes = require('./src/route/booksRoute');

app.use(express.json());
app.use('/books', booksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});