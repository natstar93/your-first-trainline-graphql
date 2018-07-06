_(This is going to be a bit more React focused part, but don't worry, if you need something ask me or some of our colleagues with React experience)_


We've been rendering services from a harcoded location. 
But we have a lovely API that can take search parameters. Also we have a nicely designed input field that allows the user to enter a location.
Let's use it to get live departures from a desired location.

### Read the input field

In the DepartingServices component we need to read the input value:

```js
<input onChange={(e) => originChanged(e.target.value)}
       value={origin}/>
```

We call the callback function passing the value from the input field.

### Keeping track of the input field value

There are different ways to solve this problem but I like a package called `recompose`. It makes my components much more expressive and a more functional code.
Run the following in your command line: `yarn add recompose`.

Recompose provides a way to update the state of a React component, let's use to keep track of the origin:

```js
import {compose, withStateHandlers} from "recompose";


const DepartingServicesContainer = ({data, origin, originChanged}) => {
  const {loading, departingServices} = data;
  if(loading) return <Spinner />;
  
  return <DepartingServices origin={origin}
                            departingServices={departingServices}
                            originChanged={originChanged}/>
};

const enhance = compose(
  withStateHandlers({
    origin: "WAT"
  }, {
    originChanged: () => (origin) => ({origin})
  })
);

export default enhance(DepartingServicesContainer);
```

The function `withStateHandlers` takes two parameters:
- First parameter is the initial state, in this case `{origin: "WAT"}`
- Second parameter is an object with functions to update the state. In this case we have defined a function called `originChanged`. It gets the value of the input field and returns an updated version of the state.
- Our DepartingServicesContainer now gets passed both the origin variable from the state and also the former function.

The function `compose` allows us to put a bunch of other functions together and decorate (enhance) our main component.

Finally we can pass the origin variable from the state to our graphql function so that the query is run every time we type in the input field:

```js
graphql(getDepartingServicesFrom, {
    options: ({origin}) => ({
      variables: {
        origin
      }
    })
  }),
```

The whole file now looks like this:

```js
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, withStateHandlers} from "recompose";

import DepartingServices from './departing-services';
import Spinner from '../loading';

const INITIAL_ORIGIN = "WAT";

const DepartingServicesContainer = ({data, origin, originChanged}) => {
  const {loading, departingServices} = data;
  if(loading) return <Spinner />;
  
  return <DepartingServices origin={origin}
                            departingServices={departingServices}
                            originChanged={originChanged}/>
};

const getDepartingServicesFrom = gql`
  query ($origin: String){
    departingServices(origin: $origin) {
      origin
      destination
      operator
      scheduledTime
      platform
      realTimeUpdate
    }
  }
`;

const enhance = compose(
  withStateHandlers({
    origin: INITIAL_ORIGIN
  }, {
    originChanged: () => (origin) => ({origin})
  }),
  graphql(getDepartingServicesFrom, {
    options: ({origin}) => ({
      variables: {
        origin
      }
    })
  }),
);

export default enhance(DepartingServicesContainer);
```

### Are you having some issues and want to move forward?

`git checkout 10-changing-your-origin`