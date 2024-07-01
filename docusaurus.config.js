// @ts-check
const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Neon Docs',
  tagline: 'Neon EVM is an open source project implementing the Ethereum virtual machine on Solana.',
  url: 'https://neonevm.org',
  baseUrl: 'docs/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'neonlabsorg',
  projectName: 'neon-evm.docs',
  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'true' }
    },
    {
      tagName: 'link',
      attributes: {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
        rel: 'stylesheet'
      }
    }
  ],
  themes: ["docusaurus-json-schema-plugin"],
  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/og_image.png',
      cookieBanner: {},
      algolia: {
        apiKey: 'b42bf0be9b7f964aa534f802164b53f8',
        appId: 'IMU5IHYKIJ',
        indexName: 'neon-labs',
        contextualSearch: true,
        placeholder: 'search something...',
        algoliaOptions: { facetFilters: ['type:$TYPE'] },
        debug: false,
        dropdown: true
      },
      zoom: {
        selector: '.image-zoom > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(27, 27, 29)'
        },
        config: {
          margin: 60
        }
      },
      metadata: [
        {
          name: 'docsearch:language',
          content: 'en'
        }, {
          name: 'docsearch:version',
          content: 'current'
        }, {
          name: 'docsearch:docusaurus_tag',
          content: 'docs-default-current'
        }
      ],
      navbar: {
        title: 'Neon EVM Docs',
        logo: {
          alt: 'Neon EVM',
          src: 'img/logo.svg'
        },
        items: [
          {
            label: 'Home',
            position: 'left',
            to: '/quick_start'
          },
          // { label: 'DAO',
          //   position: 'left',
          //   to: '/governance/overview'
          // },
          {
            label: 'Develop',
            position: 'left',
            to: '/developing/get-started'
          },
          {
            label: 'Fees',
            position: 'left',
            to: '/tokens/gas_fees'
          },
          {
            label: 'Operate',
            position: 'left',
            to: '/operating/operator-introduction'
          }
        ]
      },
      footer: {
        logo: {
          alt: 'Neon EVM',
          src: 'img/logo.svg'
        },
        links: [
          {
            title: 'Get Started',
            items: [
              { label: '🏓 Quick Start', to: '/quick_start' },
              { label: '🧬 Neon EVM Overview', to: '/about/why_neon' },
              { label: '🔑 Set Up Wallet', to: '/wallet/metamask_setup' },
              { label: '💰 Tokens', to: '/tokens/neon_token' },
              { label: '🛰 Transfer Tokens', to: '/token_transferring/neonpass_usage' },
              { label: '💬 FAQ', to: '/faq/neon-brief-faq' }
            ]
          },
          {
            title: 'Tools',
            items: [
              { label: 'BlockExplorer', to: 'https://neonscan.org/' },
              { label: 'NeonPass', to: 'https://neonpass.live/' },
              { label: 'NeonFaucet', to: 'https://neonfaucet.org/' }
            ]
          },
          {
            title: 'Develop',
            items: [
              { label: 'Connect to Neon RPC', to: '/developing/connect_rpc' },
              { label: 'Request Test Tokens', to: '/developing/utilities/faucet' },
              {
                label: 'Configure Dev Tools',
                to: '/developing/deploy_facilities/configure_hardhat'
              },
              {
                label: 'Use Tokens',
                to: '/developing/deploy_facilities/interacting_with_spl_tokens'
              },
              {
                label: 'Integrate',
                to: '/developing/integrate/oracles/integrating_chainlink'
              },
              { label: 'Tutorials', to: '/developing/deploy_facilities/using_hardhat' }
            ]
          },
          {
            title: 'Operate',
            items: [
              { label: 'Operate a Neon Proxy', to: '/operating/operator-introduction' },
              { label: 'Run a Proxy Server', to: '/operating/basic' }
            ]
          },
          {
            title: 'Govern',
            items: [
              { label: 'Overview', to: '/governance/overview' },
              { label: 'Neon DAO Organization', to: '/governance/neon_daos' },
              { label: 'Voting Process', to: '/governance/proposals' },
              { label: 'Principles and Objectives', to: '/governance/principles' }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Neon Labs` // OK
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    }),

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-Y5QG48111W'
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/neonevm/neon-evm.docs/edit/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/docs', to: '/quick_start' }
        ]
      }
    ]
  ]
};

module.exports = config;
