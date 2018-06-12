Our goal is to retrieve all the services found within - `https://realtime.thetrainline.com/departures/wat`

Our schema was ready for now:

```
type DepartingService {
    origin: String
    destination: String
  }
```

Let's replace the barcoded data in the resolver by using the real api.
We need some kind of http request package. I like superagent, but you can use axios or any other that you like.

Write the following code in your resolver, it returns the first service (this is assuming that you have refactored your resolver into a separate module, if you haven't you can use the same function in your main GraphQL file)

```
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

module.exports = getDepartingServicesResolver;
```

Run this in Graphql, what is the first service departing from Waterloo?

Something interesting is that our resolver is asynchronous, it returns a "promise". The GraphQL engine is smart enough to wait for the promise to be resolved, it well then take the resolved data and continue down the usual GraphQL execution path.

#### Exercise 1:
Can you map through all the services and return all origin/destinations through graphQL?

#### Exercise 2:
Can you include the operator of each service?

Use graphiQL to see the result after the exercises.

#### Struggling?

To the get the solution checkout 071-fetching-real-time-services-solution