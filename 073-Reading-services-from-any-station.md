Great work so far!
You may wonder: 

> What if my closest station is not Waterloo? How can I change the GraphQL api so that I can provide a parameter with the origin station that fits better my commuting?

Let's extend our api so that it takes an input parameter with your desired station.

First we need to modify our resolver departing service resolver definition so it reads the parameter:

```js
const resolvers = {
  Query: {
    status: () => "GraphQL status: OK",
    departingServices: : (root, args) => departingServicesResolver(args) //we pass around the args from the query
  }
};
```

Any Apollo Graphql resolver is given root and args. Args contains the query parameters.

Then in the resolver function we destruct the origin and use that to call the real time api (if you don't know what destruct is look at this link [Object restructuring in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment))

```js
const getDepartingServicesResolver = async ({origin = "WAT"}) => {
  const departuresEndpoint = `https://realtime.thetrainline.com/departures/${origin}`;
  const response = await client.get(departuresEndpoint);
  
  return response.body.services.map((service) => {
    return {
      origin,
      destination: readDestination(service),
      operator: service.serviceOperator
    };
  });
};

```

Finally we need to change the code in the query so that it takes the origin input parameter:
```js
const queryDefinitions = `
  type Query {
    departingServices(origin: String): [DepartingService]
    status: String
  }
`;
```
If you run this code in GraphiQL you should still get services from Waterloo as that's the default parameter.

How can you provide the parameter in GraphiQL?
- Click in the bottom of GraphiQL in the section called _Query Variables_.
- We can add a JSON including the origin parameter:
```json
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

Run the query now, you should get your desired destination! 😄 

### Exercise 1: The challenge 🥇

Our api only returns Station codes, can you make it return real station names?

Use the provided file: `stations.json`

### Struggling?

Don't worry! Here is the solution `073-reading-services-from-anywhere`