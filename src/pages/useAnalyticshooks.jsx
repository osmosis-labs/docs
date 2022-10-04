//Analytics
import React from "react"
import {useLocation} from '@docusaurus/router';
import analytics from "./analytics"


export default function useAnalytics() {
    // React router provides the current component's route, even in SSR
    const location = useLocation();
    React.useEffect(() => {
      analytics.init()
    }, [])
  
    React.useEffect(() => {
      const currentPath = location.pathname + location.search
      analytics.sendEvent({event_type: 'Docs:'+currentPath})
    }, [location])
  }
