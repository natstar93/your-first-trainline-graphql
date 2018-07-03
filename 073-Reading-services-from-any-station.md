Great work so far!
You may wonder: 

> What if my closest station is not Waterloo? How can I change the GraphQL api so that I can provide a parameter with the origin station that fits better my commuting?

Let's extend our api so that it takes an input parameter with the desired station.

First we need to modify our resolver departing service resolver definition so it reads the parameter:

```
const resolvers = {
  Query: {
    status: () => "GraphQL status: OK",
    departingServices: : (root, args) => departingServicesResolver(args)
  }
};
```

Any Apollo Graphql resolver is given root and args. Args contains the query parameters.

Then in the resolver function we destruct the origin:
```
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

And finally we need to change the code in the query so that it takes the origin input parameter:
```
const queryDefinitions = `
  type Query {
    departingServices(origin: String): [DepartingService]
    status: String
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

Run the query, what do you get? 😄 

**Exercise 1: The challenge 🥇**

Our api only returns Station codes, can you make it return real station names?

Use the provided file: `stations.json`

#### Struggling?

Don't worry! Here is the solution `073-reading-services-from-anywhere`