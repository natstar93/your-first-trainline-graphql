Our next challenge is to use a REST endpoint from within the GrpahQL server. 
In other words, we will create a GraphQL endpoint that uses data from a REST server. That is the beauty of Graphql we can combine data from different sources and combine it one schema that we can query from.
We will be using our RealTime API, it is a REST service that returns departing services from a given origin and details for each service.
I'm sure some of you may be familiar already with it.

As an example when you query the following endpoint: [https://realtime.thetrainline.com/departures/wat](https://realtime.thetrainline.com/departures/wat), you'll get a response like the following (like any other rest api, the developers haven't provided a swagger spec with the documentation 😢)
(WAT is a station code for Waterloo)

```json
{
   "queryEarlierServices":"https://realtime.thetrainline.com/Departures/WAT?Date=2018-06-09&Time=10:57&ExpectedWindow=-74&DesiredNumberOfServices=50",
   "queryLaterServices":"https://realtime.thetrainline.com/Departures/WAT?Date=2018-06-09&Time=12:13&DesiredNumberOfServices=50",
   "realTimeDataSourceAvailable":true,
   "requestId":"GjyTYgkyqUWMh+qAgkUdpg",
   "services":[
      {
         "callingPatternUrl":"https://realtime.thetrainline.com/callingPattern/W10280/2018-06-09",
         "callingType":"PickUp",
         "destinationList":[
            {
               "crs":"DKG"
            }
         ],
         "realTimeUpdatesInfo":{
            "realTimeServiceInfo":{
               "realTime":"0001-01-01T00:00:00+00:00",
               "realTimeFlag":"Delayed"
            }
         },
         "scheduledInfo":{
            "scheduledPlatform":"1",
            "scheduledTime":"2018-06-09T10:54:00+01:00"
         },
         "serviceIdentifier":"W10280",
         "serviceOperator":"SW",
         "transportMode":"TRAIN"
      },
      {
         "callingPatternUrl":"https://realtime.thetrainline.com/callingPattern/Q02987/2018-06-09",
         "callingType":"PickUp",
         "destinationList":[
            {
               "crs":"RMD"
            }
         ],
         "realTimeUpdatesInfo":{
            "realTimeServiceInfo":{
               "realTime":"2018-06-09T11:00:00+01:00",
               "realTimeFlag":"Estimate",
               "realTimePlatform":"16"
            }
         },
         "scheduledInfo":{
            "scheduledPlatform":"16",
            "scheduledTime":"2018-06-09T11:00:00+01:00"
         },
         "serviceIdentifier":"Q02987",
         "serviceOperator":"SW",
         "transportMode":"TRAIN"
      }
   ]
}
```

Let's use this as a base to build our graphql server.