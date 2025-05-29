const express = require('express');
const router = express.Router();

const{
    getAllBooksHandler,
    getBookByIdHandler,
    postBookHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
} = require('../handler/booksHandler');

router.get('/', getAllBooksHandler);
router.get('/:bookId', getBookByIdHandler);
router.post('/', postBookHandler);
router.put('/:bookId', editBookByIdHandler);
router.delete('/:bookId', deleteBookByIdHandler);


module.exports = router;