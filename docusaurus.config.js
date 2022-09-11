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
function defineSection(section, version = {}, options = {}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      path: `docs/${section}`,
      routeBasePath: section,
      id: section,
      sidebarPath: require.resolve('./sidebars-default.js'),
      breadcrumbs: false,
      editUrl: 'https://github.com/osmosis-labs/docs/tree/beta/',
      versions: version && {
        current: {
          label: version.label,
        },
      },
      ...defaultSettings,
      ...options,
    }),
  ];
}

const latestVersions = {
  'osmosis-core': '12.x',
  'localosmosis': '12.x',
  'networks': '12.x',
  'cosmwasm': '12.x',
  'beaker': '12.x',
  'osmojs': '12.x',
  'telescope': '12.x',
  'overview': '12.x',

  'web-core': '0.38.x',
};

const SECTIONS = [

  // Osmosis Core
  defineSection('osmosis-core', {
    label: latestVersions['osmosis-core'],
  }),
  defineSection('localosmosis', {
    label: latestVersions['localosmosis'],
  }),

  defineSection('networks', {
    label: latestVersions['networks'],
  }),

  defineSection('cosmwasm', {
    label: latestVersions['cosmwasm'],
  }),

  defineSection('beaker', {
    label: latestVersions['beaker'],
  }),

  // [web] ui-sdk

  defineSection('telescope', {
    label: latestVersions['telescope'],
  }),

  defineSection('osmojs', {
    label: latestVersions['osmojs'],
  }),


  //Overview
  defineSection('overview', {
    label: latestVersions['overview'],
  }),


];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Osmosis Docs',
  tagline: 'Swap, earn, and build on the leading decentralized Cosmos exchange. 🚀',
  // TODO: Update base url
  url: 'https://beta-docs.osmosis.zone',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/favicon.ico',
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
          editUrl: 'https://github.com/dyte-in/docs/tree/main/',
          ...defaultSettings,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/api-reference.css'),
          ],
        },
        googleAnalytics: {
          trackingID: '000',
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
            to: '/overview',
            position: 'left',
          },
          {
            label: 'Develop',
            to: 'osmosis-core',
            position: 'left',
            // className: 'new-badge',
            activeBaseRegex: '(.*ui-kit|.*web-core)',
          },
          {
            label: 'Networks',
            to: '/networks',
            position: 'left',
            // className: 'new-badge',
          },
          {
            label: 'API Reference',
            to: '/api/',
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
          alt: 'Dyte Docs',
          height: '36px',
        },
        links: [
          {
            title: 'Product',
            items: [
              {
                label: 'Demo',
                href: 'https://app.dyte.io',
              },
              {
                label: 'Developer Portal',
                href: 'https://dev.dyte.io',
              },
              {
                label: 'Pricing',
                href: 'https://dyte.io/#pricing',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://dyte.io',
              },
              {
                label: 'Join Us',
                href: 'https://dyte.freshteam.com/jobs',
              },
              {
                label: 'Privacy Policy',
                href: 'https://dyte.io/privacy-policy.html',
              },
              {
                label: 'Contact Us',
                href: 'mailto:support@dyte.in',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                href: 'https://docs.dyte.io',
              },
              {
                label: 'Blog',
                href: 'https://dyte.io/blog',
              },
              {
                label: 'Community',
                href: 'https://community.dyte.io',
              },
            ],
          },
        ],
        copyright: 'Copyright © Osmosis Labs since 2021. All rights reserved.',
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
};

module.exports = config;
