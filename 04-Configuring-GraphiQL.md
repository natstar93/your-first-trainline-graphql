One of the key benefits of GraphQL is the tooling. 
One of the best ones is GraphiQL.
In Rest apis there are tools like Swagger or RAML to document APIs but it is something that you have to add.
In Graphql we have the schema that documents the api, so GraphiQL uses the schema to create a graphical interactive IDE where not only you can learn the API but also you can test the retrieval of the data before consuming it.
This is the GraphiQL documentation for the Github graphic api: https://developer.github.com/v4/explorer/


In this section we are going to add Graphiql to our tramline api.
To use GraphiQL within Apollo Server we need use `graphiqlExpress` from `apollo-server-express` and configure it as middleware.

Add the following to your `server.js`:

```
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
```

### Verification:

To test this, open your browser and go to: `http://localhost:3000/graphiql`


In the left column we write our query:
```
{
  status
}
```

You might notice the type assistance when you hit Ctrl+Space.

Run the query by pressing the play button and the result will appear on the right.
Also you can visit the entire API documentation if you expand the Docs button on the right.

#### Struggling?

No problems! We've you covered, change to branch: 
```
git checkout 04-configuring-graphiql-solution
```