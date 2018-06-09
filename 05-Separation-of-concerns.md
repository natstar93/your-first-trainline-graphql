Let's refactor all the GraphQL side of things into Express middleware:

- Create a new folder called Graphql and inside a file called index `.src/graphql/index.js`.
- Move all the graphQL specifics (apart from the Graphical docs) to that file and refactor in the shape of a middleware file:
```
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

- Use that middleware in our server file:
```
const express = require('express');
const { graphiqlExpress } = require('apollo-server-express');

const PORT = 3000;
const app = express();

const graphql = require('./graphql');

app.use('/graphql', graphql);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

console.log(`Express running on ${PORT}`);
app.listen(PORT);
```

#### Struggling?

Checkout to branch `05-separation-of-concerns-solution`