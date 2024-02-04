/* eslint-disable */

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

// const UIKitReferencePlugins = require('./plugins/ui-kit-reference-plugin.cjs');
const { webpackPlugin } = require('./plugins/webpack-plugin.cjs');
const posthogPlugin = require('./plugins/posthog-plugin.cjs');

/** @type {import('@docusaurus/preset-classic').Options} */ defaultSettings = {
  remarkPlugins: [
    [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
  ],
};

/**
 * Defines a section with overridable defaults
 * @param {string} section
 * @param {import('@docusaurus/plugin-content-docs').Options} options
 */
function defineSection(section, options = {}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      path: `docs/${section}`,
      routeBasePath: section,
      id: section,
      sidebarPath: require.resolve('./sidebars-default.js'),
      breadcrumbs: false,
      editUrl: 'https://github.com/osmosis-labs/docs/tree/main/',
      ...defaultSettings,
      ...options,
    }),
  ];
}

const SECTIONS = [
  defineSection('osmosis-core'),
  defineSection('osmosis-outpost'),
  defineSection('localosmosis'),
  defineSection('cosmwasm'),
  defineSection('frontend'),
  defineSection('beaker'),
  defineSection('telescope'),
  defineSection('osmojs'),
  defineSection('overview'),
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Osmosis Docs',
  tagline: 'Build on the leading decentralized Cosmos exchange. 🚀',
  // TODO: Update base url
  url: 'https://docs.osmosis.zone',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
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

  clientModules: [require.resolve('./src/client/define-ui-kit.js')],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/home',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars-home.js'),
          breadcrumbs: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/osmosis-labs/docs/tree/main/',
          ...defaultSettings,
        },
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
    ...SECTIONS,
    // ...UIKitReferencePlugins,
    webpackPlugin,
    posthogPlugin,
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

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
            label: 'Develop',
            to: 'osmosis-core',
            position: 'right',
            // className: 'new-badge',
            activeBaseRegex: '(.*ui-kit|.*web-core)',
          },
          {
            label: 'Integrate',
            to: 'overview/integrate',
            position: 'left',
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
            title: 'Product',
            items: [
              {
                label: 'Launch App',
                href: 'https://app.osmosis.zone',
              },
              {
                label: 'Developer Portal',
                href: 'https://docs.osmosis.zone',
              },
              {
                label: 'Ecosystem',
                href: 'https://osmosis.zone/ecosystem',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                href: 'https://docs.osmosis.zone',
              },
              {
                label: 'Medium',
                href: 'https://medium.com/@Osmosis',
              },
              {
                label: 'Community',
                href: 'https://commonwealth.im/osmosis/',
              },
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
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      algolia: {
        appId: '2CBDVP21VK',
        apiKey: 'd983fd8603756b134758592e0334d240',
        indexName: 'Docs',
        contextualSearch: true,
        searchParameters: {},
      },
      posthog: {
        apiKey: '00',
      },
    }),
  scripts: [
    "https://tally.so/widgets/embed.js",
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "c5b5e9fc-d025-4c12-b08e-9784d0e2161f",
      "data-project-name": "Osmosis",
      "data-project-color": "#7900B4",
      "data-project-logo":
        "https://app.osmosis.zone/tokens/osmo.svg",
      async: true,
    },
  ],
};

module.exports = config;
