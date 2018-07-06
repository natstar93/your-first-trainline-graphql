This is going great!
Now we have an api that can deliver our graphql data. We became Graphql backend engineers.

Are you ready to wear your frontend hat and consume this data in a live departures app?
Let’s do this!

We are going to use the `src` folder in the project, it contains a React app.
At the moment it is rendering dummy data. Let’s plug our new api in. We will be using [react-apollo](https://www.apollographql.com/docs/react/), one of the most popular clients for Graphql.

### Plumbing

In the src folder we’ve already the following:

1. In `src/index.js` we have our main app decorated with `ApolloProvider`. It is given an initialized Apollo client:

```js
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
    <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/live/departures"/>
    )}/>
    <Route exact path="/live/departures" component={DepartingServices}/>
  </Switch >
  </Router>
  </ApolloProvider>,
document.getElementById('root'));
```

2. If we look at the file `apollo-client.js`, it is just creating an instance of `ApolloClient` with some configuration, for example, we tell it where the graphql endpoint is. We also tell it to use _in-memory_ cache. This is where you would also define security tokens.

```js
const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:9000/graphql' }),
  cache: new InMemoryCache(),
});

export default apolloClient;
```

### Replacing dummy data

If we take a look at the `DepartingServicesContainer`, at the moment it is getting some dummy data and passing it to the `DepartingServices` component. This latter one is then responsible for rendering the page.
The container is the natural place to plug in our query (for people that now redux, this is the same concept of the redux containers).

Let’s add the following to the container:

```js
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import DepartingServices from './departing-services';

const DepartingServicesContainer = ({data}) => {
  if(!data || !data.departingServices) return null;
  return <DepartingServices data={data} originChanged={() => {}}/>
};

const getDepartingServicesFrom = gql`
  query ($origin: String){
    departingServices(origin: $origin) {
      origin
      destination
      operator
    }
  }
`;

export default graphql(getDepartingServicesFrom, {
  options: () => ({
    variables: {
      origin: "WAT"
    }
  })
})(DepartingServicesContainer);

```

It may seem like a lot but it is not much, let me explain:
- First off we have replaced our `getData` dummy function with `getDepartingServicesFrom`. It is using `gql` to define the query. If you take a closer look, it is exactly the same query that we were running in graphiql.
- We decorate our container component with the graphql function, provided the query and a parameter, `origin`. This is what we export now.

### Of course, CORS

If we go to the UI we'll see that the page is not yet rendering properly. We get an error in the console:
```
Failed to load http://localhost:9000/graphql: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

We don't have CORS enabled in the graphql server so that we cannot query from the client side.

Let's fix this.
1. Install CORS in the express app: `yarn add cors`
2. Use the cors package in the server/index.js:
```js
const cors = require('cors');

app.use(cors());
```

Great! We should see our app rendering with some services! Hurray!

### Exercise 8.1

If you see the page we have some missing data and some undefined values. This is because we are not providing the client app with all the values that it needs.

Can you fix this? I'm sure you can!

This will involve: 
- Modifying the query in the departing services container.
- Update the DepartingService type in the server to hold the fields that we need.
- Read the values from the real time api and return then to the consumer.

_Tip: Look at how origin or destination are provided. Follow the whole journey from the client to the server_.

### Struggling?
Don't worry! Here is the solution `git checkout 081-rendering-real-time-data`