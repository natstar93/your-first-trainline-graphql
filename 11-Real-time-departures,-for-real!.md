This is quite new in the GraphQL world, proper edge-hipster developer.

In GraphQL you have Queries and Mutations. We've being focusing on queries today.
Around the end of 2017 Graphql came with a third type of operation: Subscriptions. I've been exploring that recently and I'd like to show you in this workshop.

> GraphQL subscriptions are a way to push data from the server to the clients that choose to listen to real time messages from the server. Subscriptions are similar to queries in that they specify a set of fields to be delivered to the client, but instead of immediately returning a single answer, a result is sent every time a particular event happens on the server.

We are going to use Subscriptions to implement a real-real live time departures app. Our page is going to be updated from the server with new services and they will be automatically rendered in the page.
This is going to be a tricky part of the journey, but bare with me for a moment, it is going to be worth it.