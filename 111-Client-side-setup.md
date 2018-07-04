We need to do a couple of things in our client side to be able to work with subscriptions.
Let's do it.

The major change is our `src/apollo-client.js`. It was using Http links to talk to the graphql endpoint.
But our subscription runs under a different protocol, WebSockets. So we need to configure  that link as well.
First we need a package for that:
```
yarn add apollo-link-ws apollo-utilities
```

Next we define the two links:
```
import { WebSocketLink } from 'apollo-link-ws';

const httpLink = new HttpLink({ uri: 'http://localhost:9000/graphql' });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:9000/subscriptions`,
  options: {
    reconnect: true
  }
});
```

Our ApolloClient needs to use one or another based on the type of operation. We use `split` for that:
```
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

```

That's it, everything ready to plug in some data from the mutation.

`git checkout 111-client-side-setup`