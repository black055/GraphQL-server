const databaseAccess = require("../data/db.js");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolver = {
  Book: {
    author: ({ authorId }) => databaseAccess.getAuthorById(authorId),
  },

  Author: {
    books: ({ id }) => databaseAccess.getBookByAuthorId(id),
  },

  Query: {
    books: () => databaseAccess.getAllBooks(),
    authors: () => databaseAccess.getAllAuthors(),
    book: (parent, { id }) => databaseAccess.getBookById(id),
    author: (parent, { id }) => databaseAccess.getAuthorById(id),
  },

  Mutation: {
    createAuthor: (parent, params) => databaseAccess.addAuthor(params),
    createBook: async (parent, params) => {
      const data = await databaseAccess.addBook(params);
      pubsub.publish("NEW_BOOK", { newBook: data });
      return data;
    }
  },

  Subscription: {
    newBook: {
      subscribe: () => pubsub.asyncIterator(["NEW_BOOK"]),
    },
  },
};

module.exports = resolver;
