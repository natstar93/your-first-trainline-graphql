This is looking good.
Our main index file is growing a bit. Before continue let's refactor a bit so that we can grow the app.

Let's move all the GraphQL side of things into Express middleware:

1. Create a new folder called Graphql and inside a file called index `server/graphql/index.js`.
2. Move all the graphQL specifics (apart from the Graphical docs) to that file and refactor in the shape of a middleware file:
```js
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const router = express.Router();

const typeDefs = `
  type Query {
    status: String
  }
`;

const resolvers = {
  Query: {
    status: () => "GraphQL status: OK"
  }
};

const graphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

router.post('/', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }));


module.exports = router;
```

3. Use that middleware in our server file:
```js
const express = require('express');
const { graphiqlExpress } = require('apollo-server-express');
const graphql = require('./graphql');

const PORT = process.env.PORT || 9000;
const app = express();

app.use('/graphql', graphql);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

console.log(`Express running on ${PORT}`);
app.listen(PORT);
```

### Struggling?

Checkout to branch `05-separation-of-concerns-solution`