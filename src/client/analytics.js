import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { ampli } from '../ampli'

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
        console.log(location.pathname)
    //   _paq.push(["setCustomUrl", location.pathname]);
    //   _paq.push(["setDocumentTitle", document.title]);
    //   _paq.push(["trackPageView"]);
    },
  };
})();