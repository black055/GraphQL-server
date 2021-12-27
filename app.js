const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const dotenv = require("dotenv");
dotenv.config();

/* Kết nối Database */
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
const httpServer = createServer(app);
const whitelist = [
  "http://seminar-web-app.herokuapp.com",
  "http://localhost:3000",
  "https://studio.apollographql.com"
];
app.use(
  cors({
    credentials: true,
    origin: whitelist,
  })
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});
server.start().then(() => server.applyMiddleware({ app, cors: false }));

SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: server.graphqlPath }
);

const PORT = parseInt(process.env.PORT || 4000, 10);

app.get("/", (_, res) => res.send("Cannot GET this API"));

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
  );
});