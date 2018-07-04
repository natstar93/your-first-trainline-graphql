Last one step and this is going to be... Awesome.

We need to have our container component in the client side subscribed to changes from the server.

Let's do the following changes in `src/components/departing-services/departing-services-container.js`:

1. We define the subscription in the client side:
```
const departingServicesSubscription = gql`
  subscription onServicesChanged($origin: String) {
    servicesChanged(origin: $origin) {
      origin
      destination
      operator
      scheduledTime
      platform
      realTimeUpdate
    }
  }
`;
```

2. We define a function that will be responsible for initiating the subscription:
```
const subscribeToNewServices = ({data}) => {
  data.subscribeToMore({
    document: departingServicesSubscription,
    variables: { origin: data.variables.origin },
    updateQuery: (previous, { subscriptionData }) => {
      return {
        departingServices: subscriptionData.data.servicesChanged
      };
    },
  })
};
``` 
That is given the data property that we get from the query, it provides a function `subscribeToMore`: Given the subscription definition, we tell it to notify us with the query is updated, we get new data (subscriptionData) and we return new data as props.

3. Last thing remaining is to call this last function. We are going to do in `componentDidMount`. For those of you who know any react, this will involve using a class component and adding componentDidMount inside. 
In this case I'm going to use recompose:

```
import {lifecycle} from "recompose";

const enhance = compose(
  withStateHandlers({
    origin: INITIAL_ORIGIN,
    destination: "London"
  }, {
    originChanged: () => (origin) => ({origin}),
  }),
  graphql(getDepartingServicesFrom, {
    options: ({origin}) => ({
      variables: {
        origin
      }
    })
  }),
  lifecycle({
    componentDidMount() {
      _subscribeToNewServices(this.props);
    },
  }),
);
```