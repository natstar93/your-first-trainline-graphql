GraphQL is a technical specification, which can be found here:

https://facebook.github.io/graphql/

There are numerous implementations of this spec, and the implementation we will be using is called **Apollo Server**:

- GitHub - https://github.com/apollographql/apollo-server
- Documentation - https://www.apollographql.com/docs/apollo-server/#Apollo-Server-amp-tools

It is worth reading the documentation page referenced above at some stage, it provides a good overview of all the Apollo tools. 
We will be using some of them later in the workshop. 
Here is a comparison between Apollo Server and Express-GraphQL - 
https://github.com/apollographql/apollo-server#comparison-with-express-graphql

We need to install the following packages:

```
yarn add graphql apollo-server-express graphql-tools body-parser
```

//NOTE: Body-parser parses incoming request bodies in a middleware before your handlers.


Once those packages are installed, add the following to ./server/index.js:
```
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');

//...//

const graphQLSchema = // todo
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }))

```

The whole file looks like this for now:
```
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');

const PORT = process.env.PORT || 9000;
const app = express();

app.get('/status', (req, res) => res.send('Express status: OK'));

const graphQLSchema = '';// todo
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }));

console.log(`Express running on ${PORT}`);
app.listen(PORT);
```

This sets up Apollo Server as express middle-ware. 
The Apollo Server will handle all POST requests to /graphql. 
We can't use this endpoint yet as we are missing a schema - which is needed by any GraphQL server.

Let's create a minimal simple schema to manually test the GraphQL setup. 
In ./server/index.js let's create the types:
```
const typeDefs = `
  type Query {
    status: String    
  }
`;
```

And the resolvers:
```
const resolvers = {
  Query: {
    status: () => "GraphQL status: OK"
  }
};
```

Finally we put it all together in our Schema:

```
const { makeExecutableSchema } = require('graphql-tools'); //in the requires section
const graphQLSchema =  makeExecutableSchema({
  typeDefs,
  resolvers,
});
```

### Verification

Let's test this to see if it works. 
If you hit `http://localhost:9000/graphql` in your browser you get an error, query missing.

Reason is that all the request to graphQL use POSTs methods under the hood.
You can use Postman or Curl:

1. Configure postman to do a POST to http://localhost:9000/graphql
(GraphQL docs state that it should be able to handle GET operations as well)
(https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http)

2. Under the body tab, choose raw and JSON (application/json)

3. Within the body text box enter the following JSON:

```
{
	"query": "query  { status }"
}
```

4. Click Send, and scroll down to the bottom to see the response, which should look like this:
```
{
    "data": {
        "status": "GraphQL status: OK"
    }
}
```

If you want to use Curl:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"query":"query { status }"}' \
  http://localhost:9000/graphql
```

#### What have I done?

In this section we configured a GraphQL server using Apollo server. 
GraphQL is typed and it uses a schema with types, that is, things you can query.
Every field needs to have a resolver that is just a function that is executed when we query that field. 
Fields and resolvers are combined to create a GraphQL schema.

If you have had any trouble getting this working, feel free to switch to branch: 03-configure-apollo-server-solution:

```
git checkout 03-setting-up-graphql-server-solution
```