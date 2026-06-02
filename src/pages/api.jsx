import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useHistory } from '@docusaurus/router';
import clsx from 'clsx';

import useBreakpoint from '../lib/useBreakpoint';
import SectionsMenu from '../components/SectionsMenu';

// Load the Stoplight Elements web-components bundle once, client-side. We use
// the custom-element build rather than the React <API> export because the
// React build calls react-router's useLocation() and, under Docusaurus 3
// (which ships its own react-router v5), the router-context detection in
// Stoplight's bundled react-router v6 misfires and crashes the page. The
// web-component encapsulates its own router internally, so there is no
// context conflict with the host app.
const WEB_COMPONENTS_SRC = '/assets/js/elements-web-components.min.js';

function loadElementsWebComponent() {
  if (typeof window === 'undefined') return;
  if (window.customElements && window.customElements.get('elements-api')) return;
  if (document.querySelector(`script[src="${WEB_COMPONENTS_SRC}"]`)) return;
  const script = document.createElement('script');
  script.src = WEB_COMPONENTS_SRC;
  script.async = true;
  document.head.appendChild(script);
}

function APIElement({ layout = 'stacked', currentVersion = 'RPC' }) {
  return (
    <BrowserOnly
      fallback={
        <div className="loading-container">
          <span className="api-loading-spinner" aria-label="Loading" />
        </div>
      }
    >
      {() => {
        loadElementsWebComponent();

        return (
          <div className={clsx('elements-container', layout)}>
            <elements-api
              apiDescriptionUrl={`/api/${currentVersion}.yaml`}
              router="hash"
              layout={layout}
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}

export default function Home() {
  const router = useHistory();
  const size = useBreakpoint();

  const location = router.location;

  const url = new URL(
    `https://docs.osmosis.zone/${location.pathname}${location.search}`
  );

  const currentVersion = url.searchParams.get('v') || 'RPC';

  return (
    <Layout
      title="API Reference"
      description="Osmosis REST API Reference"
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <link rel="preload" href="/assets/css/elements.min.css" as="style" />
        <link rel="stylesheet" href="/assets/css/elements.min.css" />
      </Head>
      <div className="header">
        <h2>Osmosis {currentVersion} endpoints</h2>
        <div className="aside">
          <a className="navbar__item navbar__link dev-portal-signup dev-postman-link" target='_blank' href='https://www.postman.com/flight-astronomer-81853429/workspace/osmosis' rel="noreferrer">Open Postman Collection</a>

          <span title="Select an API set (RPC, LCD, DATA, IBCGO) from this menu.">
            <SectionsMenu
              defaultValue={currentVersion}
              values={[
                { name: 'RPC', id: 'RPC' },
                { name: 'LCD', id: 'LCD' },
                { name: 'DATA', id: 'DATA' },
                { name: 'IBCGO', id: 'IBCGO' },
              ]}
              onValueChange={(version) => {
                router.push(`/api/?v=${version}`);
              }}
              className="compact"
              slot="trigger"
            />
          </span>
        </div>
      </div>
      <APIElement
        layout={size === 'sm' ? 'stacked' : 'sidebar'}
        currentVersion={currentVersion}
      />
    </Layout>
  );
}
