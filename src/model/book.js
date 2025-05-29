const { v4: uuidv4 } = require('uuid');

class Book {
    constructor(entry) {
        const now = new Date().toISOString();

        this.id = uuidv4();

        this.name = entry.name;
        this.author = entry.author;
        this.year = entry.year;
        this.summary = entry.summary;  
        this.publisher = entry.publisher;
        this.pageCount = entry.pageCount;
        this.readPage = entry.readPage;
        this.reading = entry.reading;
        this.finished = entry.pageCount === entry.readPage;
        this.insertedAt = now;
        this.updatedAt = now;
    }

    updateBook(entry) {
        const now = new Date().toISOString();

        this.name = entry.name;
        this.author = entry.author;
        this.year = entry.year;
        this.summary = entry.summary;  
        this.publisher = entry.publisher;
        this.pageCount = entry.pageCount;
        this.readPage = entry.readPage;
        this.reading = entry.reading;
        this.finished = entry.pageCount === entry.readPage;
        this.updatedAt = now;
    }

    getIdNameAndPublisher() {
        return {
            id: this.id,
            name: this.name,
            publisher: this.publisher,
        };
    }
}

module.exports = Book;