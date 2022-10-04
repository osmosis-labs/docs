import { ampli } from '../ampli';
ampli.load({ environment: 'production' });

function init() {
    ampli.load({ environment: 'production' });
  }
  
  function sendEvent(payload) {
    ampli.track({event_type: 'Docs: Homepage'})
  }
  
  
  
  export default {
    init,
    sendEvent,
  }