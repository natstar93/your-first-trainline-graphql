We are going to build our GraphQL server on top of Express.js, therefore we will start by getting a basic Express server up and running.

Let's create a new folder called `server` and add an empty file within it called `index.js`.

We need to install express:

```
yarn add express
```

Add the following to `/server/index.js` to configure an express app.

```
const express = require('express');
const PORT = process.env.PORT || 9000;
const app = express();

app.get('/status', (req, res) => res.send('Express status: OK'));

console.log(`Express running on ${PORT}`);
app.listen(PORT);
```

## Verification

To test this run:

```
node ./server/index.js
```

Open a browser and go to: 
```
http://localhost:3000/status
```

You should see:
```
Express status: OK
```

## Making life easier

Add the following to the scripts section in package.json:

```
  "scripts": {
    "start:server": "node ./server/index.js"
  }
```

Now we can start the server by running:

```
yarn start:server
```

It is also helpful to use nodemon so that the server will restart every time a file changes. 
Install it with:

```
yarn add --dev nodemon
```

Add we can add a command to the scripts section in package.json:

```
 "scripts": {
    "start:server": "node ./server/index.js",
    "watch:server": "nodemon ./server/index.js"
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