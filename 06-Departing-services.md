First step to creating the real Trainline GraphQL api: in this section we are going to extend the schema to include a new custom type - *DepartingService*. It will have an origin and destination. To achieve this modify the typeDefs value (`./graphql/index.js`):

```js
const typeDefs = `
  type DepartingService {
    origin: String
    destination: String
  }
  
  type Query {
    status: String
    departingServices: [DepartingService]
  }
`;
```

We have created our custom type which is composed of two Strings. We need to include this in the GraphQL query type, when queried we can get a list of departing services.
In GraphQL String is a scalar type. 

A scalar type is a primitive value, they represent the leaves of the query. The default scalar types are:

- Int: A signed 32‐bit integer.
- Float: A signed double-precision floating-point value.
- String: A UTF‐8 character sequence.
- ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.
Reference: [http://graphql.org/learn/schema/#scalar-types](http://graphql.org/learn/schema/#scalar-types)

These are the default scalar types, however it is also possible to define custom scalar types.

The DepartingService type is a non-scalar type. This means we need to provide a way for GraphQL to construct a DepartingService object. This is done through the use of one or more resolvers.

Run the query in GraphiQL:

```js
{
  status
  departingServices{
    origin
    destination
  }
}
```

It is returning `null` for departing service. We need to resolve this... with a resolver... 😃 

### Exercise 6.1.

Can you create the resolver for the departingServices? For now return two harcoded departing services, one from Euston to Birmingham and another from Euston to Manchester.
Remember, a resolver is just a function that returns the given objects.

_Hint: look at the status resolver._

### Checkpoint

If you want to grab the solution for this section change to branch: 
`git checkout 06-departing-services-type-solution`