Our goal is to retrieve all the services found for [https://realtime.thetrainline.com/departures/wat](https://realtime.thetrainline.com/departures/wat)

Our schema was ready for now:

```js
type DepartingService {
    origin: String
    destination: String
  }
```

Let's replace the harcoded data in the resolver by using the real api.
We need some kind of http request package. I like superagent, but you can use axios or any other that you like:

```
yarn add superagent
```

Write the following code in graphql index file:

```js
const client = require('superagent');

const getDepartingServicesResolver = async () => {
  
  const departuresEndpoint = `https://realtime.thetrainline.com/departures/wat`;
  const response = await client.get(departuresEndpoint);
  
  const firstService = response.body.services[0];
  return [{
    origin: 'WAT',
    destination: readDestination(firstService)
  }];
};

function readDestination(service){
  return service.destinationList[0].crs;
}
```

We call the api and we return the first service for now. Run this in Graphiql, what is the first service departing from Waterloo?

Something interesting is that our resolver is asynchronous, it returns a "promise". But we don't have to deal with it, the GraphQL engine is smart enough to wait for the promise to be resolved.

### Exercise 1:
Rather than returning the first service, can you return all the services from Waterloo.

_Hint: You can map/reduce/foreach/for through all the services and return all origin/destinations through graphQL._

### Exercise 2:
Can you include the operator of each service so that consumers of your api can read that file too?

Use graphiQL to see the result after the exercises.

### Struggling?

To the get the solution:
`git checkout 071-fetching-real-time-services-solution`