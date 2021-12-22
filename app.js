const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  "mongodb+srv://black055:Thisisapassword@cluster0.amqs4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  function (err) {
    if (err) throw err;
    console.log("Connect to database successful!");
  },
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const app = express();

const whitelist = [
  "https://seminar-web-app.herokuapp.com",
  "http://localhost:3000",
];
app.use(
  cors({
    credentials: true,
    origin: whitelist,
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.start().then(() => server.applyMiddleware({ app, cors: false }));

const PORT = parseInt(process.env.PORT || 4000, 10);
console.log(PORT);
app.get("/", (_, res) => res.send("Cannot GET this API"));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
});
