import React from 'react';

import DepartingService from './departing-service';
import './departing-services.css';

const DepartingServices = ({data: {origin, departingServices}, originChanged}) =>
  <div className="departing-services">
    <div className="departing-service-search">
      <label>Trains from...</label>
      <input onChange={originChanged}
             value={origin}/>
    </div>
    <ul>
      {departingServices.map((service, index) => {
        return <DepartingService key={`service-${index}`}
                                 service={service}/>
      }, this)}
    </ul>
  </div>
;
  
  

export default DepartingServices;