First of we need to configure our server to be able to send subscriptions.

1. We need to install a couple of dependencies:
`yarn add subscriptions-transport-ws graphql-subscriptions`

2. We'll keep our http endpoint for queries but we need to wrap the server with an extra transport layer with Websocket. In `server/index.js` add the following:

```js
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

3. We will use `graphql-subscriptions` to pass around a pubsub that we can use to trigger retrieval of new data.
Add a new file `graphql/pub-sub.js`:
```js
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
 
module.exports = pubsub;
```

4. In `graphql/index.js` we need to define the subscription type and add the subscription resolver:
```js
const subscriptionDefinitions = `
  type Subscription {
    servicesChanged(origin: String): [DepartingService]
  }
`;
```

We add that definition to the schema:
```js
const graphQLSchema =  makeExecutableSchema({
  typeDefs: [
    queryDefinitions,
    subscriptionDefinitions,
    departingServicesTypes
  ],
  resolvers
});
```

As you saw in the previous step we are exposing the schema and we have also renamed `route` to `graphql`. Let's do that now:

```js
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

```js
const pubsub = require('../../graphql/pub-sub');

```

Then we implement the resolver:
```js
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

A Subscription resolver is very similar to the query resolvers that we've been using before. The difference is that it doesn't return the result straight away but an iterator that will get the value back eventually.
In this case we have defined a subscription to notify clients that services have changed so that they can query more data if needed.

To simplify, in this scenario we are going to simulate data changes in the server side.
In `/graphql/departing-services/index.js` let's write for now the following code at the end of the file:
```js
setInterval(async function(){
  const payload = {
    servicesChanged: await getDepartingServicesResolver("WAT")
  };
  pubsub.publish('servicesChanged', payload);
}, 10000);
```

Every 10 seconds we are simulating a data change, we query the api with services from Waterloo and we notify subscriber with that change.

### Struggling

First of, don't worry, this is quite new and the interface within Apollo to use these things is not 100% polish in my opinion.
You can run the following to get unstacked.

`git checkout 110-server-side-setup`