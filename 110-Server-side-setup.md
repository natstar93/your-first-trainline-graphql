First of we need to configure our server to be able to send subscriptions.

1. We need to install a couple of dependencies:
`yarn add subscriptions-transport-ws graphql-subscriptions`

2. We'll keep our http endpoint for queries but we need to wrap the server with an extra transport layer with Websocket. In `server/index.js` add the following:

```
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const {graphql, graphQLSchema} = require('./graphql');

//.....//
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

const webSocket = createServer(app);
 
webSocket.listen(PORT, () => {
  console.log(`Apollo Server is now running on http://localhost:${PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
   execute,
   subscribe,
   schema: graphQLSchema
 }, {
   server: webSocket,
   path: '/subscriptions',
 });
}); 
```

3. We will use graphql-subscriptions to pass around a pubsub that we can use to trigger retrieval of new data.
Add a new file `graphql/pub-sub.js`:
```
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
 
module.exports = pubsub;
```

4. In `graphql/index.js` we need to define the subscription type and add the subscription resolver:
```
const subscriptionDefinitions = `
  type Subscription {
    servicesChanged(origin: String): [DepartingService]
  }
`;
```
We add that definition to the schema:
```
const graphQLSchema =  makeExecutableSchema({
  typeDefs: [
    queryDefinitions,
    subscriptionDefinitions,
    departingServicesTypes
  ],
  resolvers
});
```

As you saw in the previous step we are exposing the schema and we have renamed route to graphql. Let's do that now:

```
const graphql = express.Router();
//...//
graphql.post('/', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }));

module.exports = {
  graphql,
  graphQLSchema
};
```

5. `./graphql/departing-services/index.js` we have to define the resolver por our subscription.
First we import the pubsub client:
```
const pubsub = require('../../graphql/pub-sub');

```

Then we implement the resolver:
```
const departingServicesResolvers = {
  Query: {
    departingServices: (root, args) => {
      return getDepartingServicesResolver(args);
    }
  },
  Subscription: {
    servicesChanged: {
      subscribe: () => pubsub.asyncIterator('servicesChanged')
    }
  }
};
```
A Subscription resolver is very similar to a query resolver except that it doesn't return the result straight away but an iterator that will get the value back eventually.
In this case we have define a subscription to notify clients that services have changed so that they can query more data if needed.

To simplify, in this scenario we are going a simulate in the server side with a data change.
In `/graphql/departing-services/index.js` let write for now the following code at the end of the file:
```
setInterval(async function(){
  const payload = {
    servicesChanged: await getDepartingServicesResolver("WAT")
  };
  pubsub.publish('servicesChanged', payload);
}, 10000);
```

Every 10 seconds we are simulating a data change, we query the api with services from Waterloo and we notify subscriber with that change.

### Struggling

First of, don't worry, this is quite new and the api is not 100% polish in my opinion.
You can run the following to get unstacked.

`git checkout 110-server-side-setup`