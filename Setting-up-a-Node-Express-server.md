We are going to build our GraphQL server on top of Express.js, therefore we will start by getting a basic Express server up and running.

We first need to initialise a node project:

```
$ npm init -y
```

This will create the `./package.json` file.

Next create a new folder called `src` and add an empty file within it called `server.js`.

We need to install express:

```
yarn add express
```

Add the following to `/src/sever.js` to configure an express app.

```
const express = require('express');
const PORT = 3000;
const app = express();
app.get('/status', (req, res) => res.send('Express status: OK'));
console.log(`Express running on ${PORT}`);
app.listen(PORT);
```

## Verification

To test this run:

```
node ./src/server.js
```

Open a browser and go to: 
```
http://localhost:3000/status
```

You should see:
```
Express status: OK
```

## Making life easier

Add the following to the scripts section in package.json:

```
  "scripts": {
    "start:server": "node ./src/server.js"
  }
```

Now we can start the server by running:

```
yarn start:server
```

It is also helpful to use nodemon so that the server will restart every time a file changes. 
Install it with:

```
yarn add -dev nodemon
```

Add we can add a command to the scripts section in package.json

From

```
 "scripts": {
    "start:server": "node ./src/server.js"
    "server": "node ./src/server.js"
  }
```

Now start watching the server:

```
yarn watch:server
```

It should restart whenever you change a file.


### Struggling? No probs! Do this:
```
git checkout 02-setting-up-node-server
```