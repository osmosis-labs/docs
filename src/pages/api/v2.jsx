import React from 'react';
import { Redirect, useHistory } from '@docusaurus/router';

/**
 * Route to make sure older /api/v2 links work.
 * There is no `v2` API set (no static/api/v2.yaml); redirect to the default
 * RPC reference rather than a nonexistent spec that would fail to load.
 */
export default function V2API() {
  const router = useHistory();

  return (
    <Redirect
      to={{
        pathname: '/api',
        search: 'v=RPC',
        hash: router.location.hash,
      }}
    />
  );
}
