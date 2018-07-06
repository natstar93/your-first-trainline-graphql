Based on the internet connection and different factors, the API may take longer to respond.
In real life scenarios we show a _loading_ screen while the data is being obtained.

Depending on the framework sometimes this is not trivial at all. Apollo makes this extremely easy, let's see how.

### _Loading_ React component

Go to your `src` folder and create a new folder `loading` and inside a new file: `src/loading/index.js`.
Copy and paste the following code:

```js
import React from 'react';

import './index.css';

const Spinner = () => (
  <div className="loading-wrapper">
    <div className="loader"/>
  </div>
);

export default Spinner;
```

Also let's create an `index.css` in the same folder with the following:

```js
.loading-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

This is a very basic implementation of a spinner, but it does the job.

### Rendering the loading state

Let's change our container like this:

```js
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import DepartingServices from './departing-services';
import Spinner from '../loading';

const ORIGIN = "WAT";

const DepartingServicesContainer = ({data}) => {
  const {loading, departingServices} = data;
  if(loading) return <Spinner />;
  
  return <DepartingServices origin={ORIGIN}
                            departingServices={departingServices}
                            originChanged={() => {}}/>
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

export default graphql(getDepartingServicesFrom, {
  options: () => ({
    variables: {
      origin: ORIGIN
    }
  })
})(DepartingServicesContainer);
```

When reading the data that comes from the server, Apollo give us the result (behind the name of the query) and a loading value. It will be true whilst the server hasn't the data yet.
If the data is still loading, we render the Spinner. As soon as loading is false, we pass the query result to DepartingServices.

I have defined a constant for now with the origin.

### Struggling

No worries! Checkout to the following branch and we'll get you sorted:
`git checkout 09-loading-state`