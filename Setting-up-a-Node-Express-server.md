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

You should see:

Express status: OK
To stop the server use

crtl + c
Making life easier

Change the scripts section in package.json

From

...
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
...
To

...
  "scripts": {
    "server": "node ./src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
'''
Now we can start the server by running:

npm run server
It is also helpful to use nodemon so that the server will restart every time a file changes. Install it with

npm install --save-dev nodemon
Once again change the scripts section in package.json

From

...
 "scripts": {
    "server": "node ./src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
...
To

...
  "scripts": {
    "dev": "nodemon ./src/server.js",
    "server": "node ./src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
'''
Now start the server with

npm run dev
It should restart when ever you change a file.

If you want the latest version of this, please commit and checkout 02-configure-express-solution

git commit -a -m 'package config'
git checkout 02-configure-express-solution