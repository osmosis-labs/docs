import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '47e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '776'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'ed6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'a68'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'c1b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'a1d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '423'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '5bf'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '0e3'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '16f'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', 'f04'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '0c7'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '63a'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', 'bdc'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '954'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '99d'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', 'ea0'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'e9f'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '997'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '63e'),
    routes: [
      {
        path: '/docs/category/chain-development',
        component: ComponentCreator('/docs/category/chain-development', '9ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/cosmwasm-smart-contracts',
        component: ComponentCreator('/docs/category/cosmwasm-smart-contracts', '48e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/developers',
        component: ComponentCreator('/docs/category/developers', 'a30'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/modules',
        component: ComponentCreator('/docs/category/modules', '21d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---basics',
        component: ComponentCreator('/docs/category/tutorial---basics', 'd44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---extras',
        component: ComponentCreator('/docs/category/tutorial---extras', 'f09'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/Cosmwasm Smart Contracts/cosmwasm-bindings',
        component: ComponentCreator('/docs/developing/Cosmwasm Smart Contracts/cosmwasm-bindings', '3ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/Cosmwasm Smart Contracts/cosmwasm-localosmosis',
        component: ComponentCreator('/docs/developing/Cosmwasm Smart Contracts/cosmwasm-localosmosis', '367'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/Cosmwasm Smart Contracts/cosmwasm-testnet',
        component: ComponentCreator('/docs/developing/Cosmwasm Smart Contracts/cosmwasm-testnet', '049'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/Cosmwasm Smart Contracts/cosmwasm-testnet-manual',
        component: ComponentCreator('/docs/developing/Cosmwasm Smart Contracts/cosmwasm-testnet-manual', '884'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/Cosmwasm Smart Contracts/cosmwasm-verify-contract',
        component: ComponentCreator('/docs/developing/Cosmwasm Smart Contracts/cosmwasm-verify-contract', '04f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/Cosmwasm Smart Contracts/javascript',
        component: ComponentCreator('/docs/developing/Cosmwasm Smart Contracts/javascript', '859'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/Cosmwasm Smart Contracts/submit_wasm_proposal',
        component: ComponentCreator('/docs/developing/Cosmwasm Smart Contracts/submit_wasm_proposal', '49a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/',
        component: ComponentCreator('/docs/developing/osmosis-core/', '0f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/build',
        component: ComponentCreator('/docs/developing/osmosis-core/build', '719'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/contributing',
        component: ComponentCreator('/docs/developing/osmosis-core/contributing', 'd4b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/ide-guide',
        component: ComponentCreator('/docs/developing/osmosis-core/ide-guide', '6f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/', 'bc0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-epochs',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-epochs', '4a5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-gamm',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-gamm', 'd29'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-gov',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-gov', '56c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-incentives',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-incentives', '9eb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-lockup',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-lockup', 'dbc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-mint',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-mint', '0f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-pool-incentives',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-pool-incentives', '339'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-superfluid',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-superfluid', '79c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-tokenfactory',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-tokenfactory', 'ba7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-twap',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-twap', '7b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/modules/spec-txfees',
        component: ComponentCreator('/docs/developing/osmosis-core/modules/spec-txfees', '764'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/osmosisd',
        component: ComponentCreator('/docs/developing/osmosis-core/osmosisd', '54a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/developing/osmosis-core/performance',
        component: ComponentCreator('/docs/developing/osmosis-core/performance', '300'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/',
        component: ComponentCreator('/docs/overview/', '3b9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/getting-started',
        component: ComponentCreator('/docs/overview/getting-started', '70e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/governance',
        component: ComponentCreator('/docs/overview/governance', '736'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/osmo',
        component: ComponentCreator('/docs/overview/osmo', '623'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/osmosis-app/',
        component: ComponentCreator('/docs/overview/osmosis-app/', 'd64'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/osmosis-app/learn-more',
        component: ComponentCreator('/docs/overview/osmosis-app/learn-more', 'ef0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/terminology',
        component: ComponentCreator('/docs/overview/terminology', '4ce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/wallets/',
        component: ComponentCreator('/docs/overview/wallets/', 'bc5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/wallets/keplr/',
        component: ComponentCreator('/docs/overview/wallets/keplr/', 'd9e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/wallets/keplr/create-keplr-wallet',
        component: ComponentCreator('/docs/overview/wallets/keplr/create-keplr-wallet', 'fe0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/wallets/keplr/import-account',
        component: ComponentCreator('/docs/overview/wallets/keplr/import-account', '2f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/wallets/keplr/import-ledger-account',
        component: ComponentCreator('/docs/overview/wallets/keplr/import-ledger-account', '428'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview/wallets/keplr/install-keplr',
        component: ComponentCreator('/docs/overview/wallets/keplr/install-keplr', '7cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/docs/tutorial-basics/congratulations', '793'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', '68e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/docs/tutorial-basics/create-a-document', 'c2d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/docs/tutorial-basics/create-a-page', 'f44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', 'e46'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/docs/tutorial-basics/markdown-features', '4b7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', 'fdd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docs/tutorial-extras/translate-your-site', '2d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '296'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
