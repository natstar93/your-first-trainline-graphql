Clone the following repo: `https://github.com/javflores/your-trainline-graphql.git`

## Verification

At this point the `your-first-trainline-graphql` folder should contain the following.

```
$ ls -al
./
../
.git/
.gitignore
package.json
public/
src/
stations.json
```

The `src` folder contains the source code of a React application that we'll be using in the Workshop.
It needs the `public` folder as well to render the entry point of the app.

Your `package.json` also contains some command to be able to run the client side. 
Let's check if that is working!

1. In a command line, run `yarn` (`npm install` if you don't have yarn installed), to install the initial dependencies.
2. Run `yarn start` to start the React application.
3. If everything is ok, that should open a tab in your browser in `http://localhost:3000/`. You will be directed to `http://localhost:3000/live/departures` and you should see a page with a couple of departing services. These are mock data. Also you will see an input field that we will use in this workshop.

Let's get together now and I will explain a bit what the React app contains.