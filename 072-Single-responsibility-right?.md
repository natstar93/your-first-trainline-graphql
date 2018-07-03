This is looking awesome!

I know what you are thinking... that `graphql/index.js` file is getting really messy.
At the moment is doing many responsibilities:
- Entry point to our graphql endpoint.
- Building the schema and putting together the resolvers.
- Getting data from the realtime api.

Time to follow our solid principles, let's move different responsibilities to different places.
In the Graphql community the best approach to refactoring is not yet decided, this is a new field so best practices are still being established. But in this workshop we are going to follow one of the common ones.

1. Let's create a new folder and file `graphql/departing-services/index.js`.
2. In that, let's move the specifics of our graphql about departing services, including type definition and resolvers:
```
const client = require('superagent');

const departingServicesTypes = `
  type DepartingService {
    origin: String
    destination: String
    operator: String
  }
`;

const getDepartingServicesResolver = async () => {
  const departuresEndpoint = `https://realtime.thetrainline.com/departures/wat`;
  const response = await client.get(departuresEndpoint);
  
  return response.body.services.map((service) => {
    return {
      origin: 'WAT',
      destination: readDestination(service),
      operator: service.serviceOperator
    };
  });
};

const readDestination = (service) => {
  return service.destinationList[0].crs;
};

const departingServicesResolvers = {
  Query: {
    departingServices: () => getDepartingServicesResolver()
  }
};

module.exports = {
  departingServicesTypes,
  departingServicesResolvers
};
```
3. In the main index file we put it all together, ie merge resolvers and schemas:
```
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const { departingServicesTypes, departingServicesResolvers } = require('./departing-services');

const router = express.Router();

const queryDefinitions = `
  type Query {
    departingServices: [DepartingService]
    status: String
  }
`;

const statusResolver = {
  Query: {
    status: () => "GraphQL status: OK",
  }
};
const resolvers = merge(statusResolver, departingServicesResolvers);

const graphQLSchema =  makeExecutableSchema({
  typeDefs: [
      queryDefinitions,
      departingServicesTypes
  ],
  resolvers
});

router.post('/', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }));

module.exports = router;
```

Yes... we use lodash so we can combine both resolvers into one object key called Query...
#### Struggling?

No problem! Here is the final solution `072-refactor-type`