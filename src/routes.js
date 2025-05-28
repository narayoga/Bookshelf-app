const { addBookHandler, getBookHandler, putBookHandler, deleteBookByIdHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookIdParam?}',
        handler: getBookHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookIdParam}',
        handler: putBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookIdParam}',
        handler: deleteBookByIdHandler,
    },
  ];
   
  module.exports = routes;