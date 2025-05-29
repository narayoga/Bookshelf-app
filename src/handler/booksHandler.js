const { loadBooks, saveBooks } = require('../data/books');
const Book = require('../model/book');

// Get all book 
const getAllBooksHandler = (req, res) => {
    const { name, reading, finished } = req.query;

    let booksData = loadBooks();

    if (name) {
        booksData = booksData.filter((book) => book.title.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading) {
        booksData = booksData.filter((book) => book.reading === (reading === '1'));
    }

    if (finished) {
        booksData = booksData.filter((book) => book.finished === (finished === '1'));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            books: booksData.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
};

// Get book by ID
const getBookByIdHandler = (req, res) => {
    const { bookId } = req.params;

    const books = loadBooks();
    const book = books.find((b) => b.id === bookId);

    if (book) {
        return res.status(200).json({
            status: 'success',
            data: {
                book,
            },
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
};

// Post book
const postBookHandler = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    // validation
    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const newBook = new Book({
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    });

    const books = loadBooks();
    books.push(newBook);

    try {
        saveBooks(books);

        return res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: newBook.getIdNameAndPublisher(),
        });
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        });
    }
};

// Edit Book
const editBookByIdHandler = (req, res) => {
    const { bookId } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    let books = loadBooks(); // ambil data terbaru
    const index = books.findIndex((book) => book.id === bookId);

    //validation if bookId not found
    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
    }

    //validation if name not provided
    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
    }

    //validation if readPage more than pageCount
    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    // Update data buku
    const updatedBook = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: pageCount === readPage,
        updatedAt: new Date().toISOString(),
    };

    books[index] = updatedBook;
    saveBooks(books);

    return res.status(200).json({
        status: 'success',
        message: 'Buku berhasil diperbarui',
        data: {
            book: updatedBook,
        },
    });

    // if (index !== -1) {
    //     books[index].updateBook({
    //         name,
    //         year,
    //         author,
    //         summary,
    //         publisher,
    //         pageCount,
    //         readPage,
    //         reading,
    //         finished: pageCount === readPage,
    //         updatedAt: new Date().toISOString(),
    //     });

    //     return res.status(200).json({
    //         status: 'success',
    //         message: 'Buku berhasil diperbarui',
    //         data: {
    //             book: books[index], // kirim data buku yang sudah diupdate
    //         },
    //     });
    // }

};



// Delete book handler in express
const deleteBookByIdHandler = (req, res) => {
    const { bookId } = req.params;

    let books = loadBooks();
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        saveBooks(books);

        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Id tidak ditemukan',
    });

};

module.exports = {
    getAllBooksHandler,
    getBookByIdHandler,
    postBookHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};