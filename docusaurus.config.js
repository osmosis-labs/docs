/* eslint-disable */

const { themes: prismThemes } = require('prism-react-renderer');
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.vsDark;

const { webpackPlugin } = require('./plugins/webpack-plugin.cjs');

// remark/rehype plugins are ESM-only as of MDX 3 / Docusaurus 3. Under the
// sync (jiti) config loader, `require()` returns the module namespace object,
// so unwrap the default export before handing the plugin to unified.
const esmDefault = (m) => m.default ?? m;
const npm2yarn = esmDefault(require('@docusaurus/remark-plugin-npm2yarn'));
const remarkMath = esmDefault(require('remark-math'));
const rehypeKatex = esmDefault(require('rehype-katex'));

/** @type {import('@docusaurus/preset-classic').Options} */ defaultSettings = {
  remarkPlugins: [[npm2yarn, { sync: true }]],
};

// Math (KaTeX) is applied globally to the single docs instance. remark-math 6
// supports `singleDollarTextMath: false`, which requires `$$...$$` for inline
// math and leaves a single `$` as literal text, so bare dollar signs in prose
// and code (currency like $500, shell vars like $HOME / $CODE_ID across the
// cosmwasm and validate pages) are NOT parsed as math. This removes the old
// per-section scoping (a remark-math v3 limitation) that previously forced the
// docs to be split into separate plugin instances. Inline math uses `$$...$$`
// on the same line; display math uses `$$...$$` as its own block.
const mathRemark = [remarkMath, { singleDollarTextMath: false }];

// Single docs instance rooted at `docs/`, served at the site root so existing
// URLs are preserved (docs/osmosis-core/... -> /osmosis-core/...). One sidebar
// follows the reader across all sections (the fix for the former per-section
// isolated sidebars). MTN-88 Phase 1: collapse only; the folder->taxonomy
// reorganization and redirects come in a later phase.
const docsPlugin = [
  '@docusaurus/plugin-content-docs',
  /** @type {import('@docusaurus/plugin-content-docs').Options} */
  ({
    path: 'docs',
    routeBasePath: '/',
    id: 'default',
    sidebarPath: require.resolve('./sidebars-default.js'),
    breadcrumbs: false,
    editUrl: 'https://github.com/osmosis-labs/docs/tree/main/',
    remarkPlugins: [...defaultSettings.remarkPlugins, mathRemark],
    rehypePlugins: [rehypeKatex],
  }),
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Osmosis Docs',
  tagline: 'Build on the leading decentralized Cosmos exchange. 🚀',
  // TODO: Update base url
  url: 'https://docs.osmosis.zone',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: '/favicon.png',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'osmosis-labs', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/api-reference.css'),
          ],
        },
      }),
    ],
  ],

  plugins: [
    docsPlugin,
    webpackPlugin,
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: '/img/osmosis-docs-card.png',
      colorMode: {
        defaultMode: 'dark',
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        // NOTE: hideOnScroll breaks on `/api`, enable when fixed
        // hideOnScroll: true,
        logo: {
          href: '/',
          src: '/logo/light.svg',
          srcDark: '/logo/dark.svg',
          alt: 'Osmosis Docs',
          height: '26px',
          width: '114px',
        },
        items: [
          {
            label: 'Overview',
            to: 'overview/educate',
            position: 'left',
          },
          {
            label: 'Integrate',
            to: 'overview/integrate',
            position: 'left',
          },
          {
            label: 'Develop',
            to: 'osmosis-core',
            position: 'left',
          },
          {
            label: 'CosmWasm',
            to: 'cosmwasm',
            position: 'left',
          },
          {
            label: 'SDKs',
            position: 'left',
            items: [
              { label: 'Frontend', to: 'frontend' },
              { label: 'OsmoJS', to: 'osmojs' },
              { label: 'Telescope', to: 'telescope' },
              { label: 'Beaker', to: 'beaker' },
            ],
          },
          {
            label: 'Validate & Run your Node',
            to: 'overview/validate',
            position: 'left',
          },
          {
            label: 'Endpoints',
            to: 'overview/endpoints',
            position: 'left',
          },
          {
            label: 'Features',
            to: 'overview/features',
            position: 'left',
          },
          {
            href: 'https://github.com/osmosis-labs',
            className: 'pseudo-icon github-icon',
            position: 'right',
          },
          {
            href: 'https://discord.com/invite/osmosis',
            className: 'pseudo-icon discord-icon',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            label: 'Launch Dex',
            href: 'https://app.osmosis.zone',
            position: 'right',
            className: 'dev-portal-signup dev-portal-link',
          },

        ],
      },
      footer: {
        logo: {
          href: '/',
          src: '/logo/light.svg',
          srcDark: '/logo/dark.svg',
          alt: 'Osmosis Docs',
          height: '36px',
        },
        links: [
          {
            title: 'Platform',
            items: [
              { label: 'Trade', href: 'https://app.osmosis.zone' },
              { label: 'Assets', href: 'https://app.osmosis.zone/assets' },
              { label: 'Staking', href: 'https://app.osmosis.zone/stake' },
              { label: 'Pools', href: 'https://app.osmosis.zone/pools' },
            ],
          },
          {
            title: 'Token',
            items: [
              { label: 'OSMO', href: 'https://app.osmosis.zone/assets/OSMO' },
              { label: 'CoinGecko', href: 'https://www.coingecko.com/en/coins/osmosis' },
              { label: 'CoinMarketCap', href: 'https://coinmarketcap.com/currencies/osmosis/' },
              { label: 'Governance', href: 'https://support.osmosis.zone/tutorials/governance' },
              { label: 'Vote', href: 'https://daodao.zone/gov/osmosis/proposals' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'X (Twitter)', href: 'https://twitter.com/osmosis' },
              { label: 'Telegram', href: 'https://t.me/osmosis_chat' },
              { label: 'Discord', href: 'https://discord.com/invite/osmosis' },
              { label: 'Forum', href: 'https://forum.osmosis.zone/' },
            ],
          },
          {
            title: 'Developers',
            items: [
              { label: 'Docs', href: 'https://docs.osmosis.zone/' },
              { label: 'GitHub', href: 'https://github.com/osmosis-labs' },
              { label: 'Grants', href: 'https://grants.osmosis.zone/' },
            ],
          },
          {
            title: 'Team',
            items: [
              { label: 'Contact', href: 'https://support.osmosis.zone/' },
              { label: 'Blog', href: 'https://forum.osmosis.zone/c/blog/13' },
            ],
          },
        ],
        copyright: 'Copyright © Osmosis Labs since 2023. All rights reserved.',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          'dart',
          'ruby',
          'groovy',
          'kotlin',
          'java',
          'swift',
          'objectivec',
          'rust',
          'toml',
        ],
      },
      algolia: {
        appId: 'O18C1RUI3F',
        apiKey: '7e6702351d8d0157591e9c8d417f47dd',
        indexName: 'Docs',
        contextualSearch: true,
        searchParameters: {},
      },
    }),
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossorigin: 'anonymous',
    },
  ],
};

module.exports = config;
