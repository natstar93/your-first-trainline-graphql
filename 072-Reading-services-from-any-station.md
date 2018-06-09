Great work so far!
You may wonder: 

> What if my closest station is not Waterloo? How can I change the GraphQL api so that I can provide a parameter with the origin station that fits better my commuting?

That was my thought when I was doing the Trainline tech test, I needed to now about Euston station.
Let's improve our api so that it takes an input parameter with the desired station.

First we need to modify our resolver definition so it reads the parameter:

```
const resolvers = {
  Query: {
    status: () => "GraphQL status: OK",
    departingServices: : (root, args) => departingServicesResolver(root, args)
  }
};
```

Any Apollo Graphql resolver is given root and args. Args contains the query parameters.

Then in the resolver function:
```
const client = require('superagent');

const getDepartingServicesResolver = async (root, {origin = "WAT"}) => {
  const departuresEndpoint = `https://realtime.thetrainline.com/departures/${origin}`;
  const response = await client.get(departuresEndpoint);
  
  return response.body.services.map((service) => {
    return {
      origin: 'WAT',
      destination: readDestination(service),
      operator: service.serviceOperator
    };
  });
};

function readDestination(service){
  return service.destinationList[0].crs;
}

module.exports = getDepartingServicesResolver;
```

And finally we need to change the code in the query:
```
const typeDefs = `
  type DepartingService {
    origin: String
    destination: String
    operator: String
  }
  
  type Query {
    status: String
    departingServices(origin: String): [DepartingService]
  }
`;
```
If you run this code in GraphiQL you should still get services from Waterloo as that's the default parameter.

How can you provide the parameter from GraphiQL?
- Click in the bottom of GraphiQL in the section called: Query Variables.
- We can add a JSON including the origin parameter:
```
{
 "origin": "EUS"
}
```
- The query in Graphiql needs to be changed to send the parameter:
```
query ($origin: String){
  departingServices(origin: $origin){
    origin
    destination
    operator
  }
}
```

Run the query, what do you get?

Exercise 1: Can you fix the issue where all the departing services appear to come from Waterloo? 💯 

**Exercise 2: The final challenge 🥇**

Our api only returns Station codes, can you make it return real station names?

Use the provided file: `stations.json`

#### Struggling?

No problem! Here is the final solution `072-fetching-any-service`