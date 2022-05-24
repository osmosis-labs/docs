module.exports = {
  title: "Osmosis Docs",
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      md.use(require("markdown-it-footnote"));
    },
  },
  base: "/",
  description:
    "Osmosis - The Cosmos Interchain AMM",
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: "theme/components",
      },
    ],
    [
      "vuepress-plugin-mathjax",
      {
        target: "svg",
        macros: {
          "*": "\\times",
        },
      },
    ],
  //  https://github.com/znicholasbrown/vuepress-plugin-code-copy
  //  ["vuepress-plugin-code-copy", {
  //    color: "#ffffff",
  //    backgroundColor: "#3e3383",
  //    }
  //  ],
    ["@maginapp/vuepress-plugin-copy-code", {
      color: "#ffffff",
      backgroundColor: "#ffffff",
      align: { bottom: '7px', right: '12px' },
      successText: " ",
      duration: 350,
    }
    ],
    [ 'tabs' ],
  ],
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cloud.typography.com/7420256/6416592/css/fonts.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined",
      },
    ],

    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/img/favicondocs.png",
      },
    ],
    [
      "script",
      {},
      `window.onload = function() {
        requestAnimationFrame(function() {
          if (location.hash) {
            const element = document.getElementById(location.hash.slice(1))

            if (element) {
              element.scrollIntoView()
            }
          }
        })
      }`,
    ],
    [
      "meta",
      {
        property:"og:image",
        content:"/img/osmosis-tile.png",
      },
    ],
  ],
  themeConfig: {
    sidebarDepth: 3,
    smoothScroll: true,
    // overrideTheme: 'dark',
    // prefersTheme: 'dark',
    // overrideTheme: { light: [6, 18], dark: [18, 6] },
    // theme: 'default-prefers-color-scheme',
    logo: "/img/osmosis-logo-dark.svg",
    logoDark: "/img/osmosis-logo-light.svg",
    lastUpdated: "Updated on",
    repo: "osmosis-labs/docs",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    docsBranch: 'main',
    docsDir: "",
    algolia: {
      apiKey: "a95b2bd527cd60164d4e6e26c15fc4d1", //TODO GET KEY
      indexName: "Docs",
      appId: "YQ6N23UJAN"
      // If Algolia did not provided you any `appId`, use `BH4D9OD16A` or remove this option
    },
    nav: [

      { text: 'Home', link: '/', },
      { text: 'Develop', link: '/developing/',},
      { text: 'Infra', link: '/infra/',},
      { text: 'Validate', link: '/validators/',},
      { text: 'Integrate', link: '/integrate/',},
      // { text: 'Chat', link: 'https://v2.vuepress.vuejs.org/',},
      {
        text: "GitHub",
        link: "https://github.com/osmosis-labs/osmosis",
        icon: "/img/github.svg",
      },
    ],
    sidebar: {
      "/overview/": [
        {
          title: "About",
          children: [
            '/overview/',
            '/overview/osmo',
            '/overview/terminology',
            '/overview/governance',
          ],
          collapsable: true,
        },
        {
          title: "Osmosis AMM App",
          children: [
            '/overview/osmosis-app/',
            '/overview/osmosis-app/learn-more',
          ],
          collapsable: true,
        },
        {
          title: 'Wallets',
          children: [
            '/overview/wallets/keplr/install-keplr',
            '/overview/wallets/keplr/create-keplr-wallet',
            '/overview/wallets/keplr/import-account',
            '/overview/wallets/keplr/import-ledger-account',
          ],
          collapsable: true,
        },
      ],
      '/developing': [
        {
          title: 'Building dApps',
          children: [
            '/developing/dapps/get_started/',
            '/developing/dapps/get_started/cosmwasm-localosmosis',
            '/developing/dapps/get_started/cosmwasm-testnet',
            '/developing/dapps/get_started/submit_wasm_proposal',
            '/developing/dapps/get_started/javascript',
          ],
          collapsable: true,
        },
        {
          title: 'Tools',
          children: [

            '/developing/tools/membrane',
            '/developing/tools/localosmosis',
            '/developing/tools/osmojs',
            '/developing/tools/osmosisd',
          ],
          collapsable: true,
        },
        {
          title: 'Osmosis Core',
          children: [
            '/developing/osmosis-core/',
            '/developing/osmosis-core/build',
            '/developing/osmosis-core/ide-guide',
            '/developing/osmosis-core/performance',
            "/developing/osmosis-core/modules/",
            "/developing/osmosis-core/modules/spec-epochs",
            "/developing/osmosis-core/modules/spec-gamm",
            "/developing/osmosis-core/modules/spec-gov",
            "/developing/osmosis-core/modules/spec-lockup",
            "/developing/osmosis-core/modules/spec-mint",
            "/developing/osmosis-core/modules/spec-incentives",
            "/developing/osmosis-core/modules/spec-pool-incentives",
            "/developing/osmosis-core/modules/spec-superfluid"
          ],
          collapsable: true,
        },

        // {
        //   title: "osmosisd",
        //   children: [
        //     "/developing/osmosisd/commands",
        //     "/developing/osmosisd/subcommands",
        //   ],
        //   collapsable: true,
        // },
        {
          title: 'Networks',
          children: [
            '/developing/network/public-endpoints',
            '/developing/tools/localosmosis',
            '/developing/network/join-edgenet',
            '/developing/network/join-testnet',
            '/developing/network/join-mainnet',
          ],
          collapsable: true,
        },
        {
          title: 'Relaying',
          children: [
            "/developing/relaying/",
            "/developing/relaying/relay",
            "/developing/relaying/relayers"
          ],
          collapsable: true,
        },
        {
        title: 'Asset Info',
        children: [
          "/developing/assets/asset-info",
        ],
        collapsable: true,
        },
        {
        title: 'Key Management',
        children: [
          "/developing/keys/keys-cli",
          "/developing/keys/multisig",
          "/developing/keys/tmkms",
        ],
        collapsable: true,
        },
        {
          title: 'Osmosis Frontend',
          children: [
            '/developing/web-dev-guide'
          ],
          collapsable: true,
        },
        {
          title: 'Guides',
          children: [
            "/developing/guides/structure/transaction",
          ],
          collapsable: true,
        },

      ],

      "/infra/": [
        {
          title: "Infrastructure",
          children: [
            '/infra/',
            '/infra/do/single-rpc',
            '/infra/do/loadbalanced-rpc',
          ],
          collapsable: true,
        }
      ],
      '/validators': [
        {
          title: 'Home',
          children: [
            '/validators/',
          ],
          collapsable: false,
        },
        {
          title: 'Validate',
          children: [
            '/validators/validating-testnet',
            '/validators/validating-mainnet',
          ],
          collapsable: true,
        },
      ],

      '/integrate': [
        {
          title: 'Home',
          children: [
            '/integrate/',
          ],
          collapsable: false,
        },
        {
          title: 'Integrate',
          children: [
            '/integrate/token-listings',
            '/integrate/airdrops',
            '/integrate/registration',
            '/integrate/liquidity',
            '/integrate/incentives',
            '/integrate/frontend',
            '/integrate/marketing',
          ],
          collapsable: true,
        },
      ],
      "/": [
        {
          title: "Overview",
          children: [
            "/history-and-changes",
            "/awesome/",
          ],
          collapsable: false,
        },
      ],
    },

  },
};
