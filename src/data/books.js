const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'books.json');

function loadBooks() {
  try {
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading books data:', err);
    return [];
  }
}

function saveBooks(books) {
  fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
}

module.exports = {
  loadBooks,
  saveBooks,
};