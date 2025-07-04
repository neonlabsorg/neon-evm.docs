// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    { type: 'html', value: '<h2 class="sidebar-menu-title">Introduction</h2>' },
    {
      type: 'doc',
      label: 'Quick Start',
      id: 'quick_start'
    },
    {
      type: 'category',
      label: 'Demos',
      items: ['about/Memecoin_Launchpad_Raydium_Integration', 'about/POC_Aave_V3_flash_loan_with_composability_requests_to_Solana']
    },
    {
      type: 'category',
      label: 'Tokens',
      items: ['tokens/neon_token', 'tokens/gas_fees', 'tokens/token_list', 'token_transferring/neonpass_usage', 'token_transferring/neon_transfer']
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">Building Solana Native EVM dApps</h2>' },
    {
      type: 'doc',
      label: 'Common Solana Terminology',
      id: 'composability/common_solana_terminology'
    },
    {
      type: 'doc',
      label: 'Overview of Composability',
      id: 'composability/Overview_of_Composability'
    },
    {
      type: 'doc',
      label: 'ICallSolana Interface',
      id: 'composability/ICallSolana_Interface'
    },
    {
      type: 'doc',
      label: 'Solana Interactions (Solidity Contracts on NeonEVM --> Solana Programs)',
      id: 'composability/Solana_Interactions'
    },
    {
      type: 'doc',
      label: 'Solana Native SDK (Solana Wallet → Neon EVM Programs)',
      id: 'composability/Solana_Native_SDK'
    },
    {
      type: 'category',
      label: 'Composability Libraries',
      items: [
        'composability/composability_libraries',
        'composability/system_program_composability_libraries',
        'composability/spl_token_program_composability_libraries',
        'composability/metaplex_program_composability_libraries',
        'composability/associated_token_program_composability_libraries',
        'composability/raydium_cpmm_program_composability_libraries'
        ]
    },
    {
      type: 'doc',
      label: 'Using SPL Tokens',
      id: 'composability/using_spl_tokens'
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">User Guide</h2>' },    
    {
      type: 'category',
      label: 'Neon EVM Overview',
      items: ['about/why_neon', 'about/neon_ecosystem', 'about/how_it_works', 'about/latest_updates']
    },
    {
      type: 'doc',
      label: 'Set Up Wallet',
      id: 'wallet/metamask_setup'
    },    
    {
      type: 'category',
      label: 'Transfer Tokens',
     items: ['token_transferring/neonpass_usage', 'token_transferring/neon_transfer']
    },    
    {
      type: 'doc',
      label: 'Voting Process',
      id: 'governance/proposals'
    },    
    {
      type: 'category',
      label: 'FAQ',
      items: ['faq/neon-brief-faq', 'faq/neonpass']
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">Developer Guide</h2>' },
    {
      type: 'category',
      label: 'Setup Dev Environment',
      items: [
        'developing/get-started',
        'developing/connect_rpc',
        'developing/utilities/faucet'
      ]
    },
    {
      type: 'category',
      label: 'Contract Development',
      items: [
        {
          type: 'category',
          label: 'Deploy Contracts',
          items: [
            'developing/deploy_facilities/using_hardhat',
            'developing/deploy_facilities/using_foundry',
            'developing/deploy_facilities/using_truffle',
            'developing/deploy_facilities/using_remix',
            'developing/deploy_facilities/using_goethereum'
          ]
        },
        {
          type: 'category',
          label: 'Verify Contracts',
          items: [
            'developing/verify_facilities/using_hardhat',
            'developing/verify_facilities/using_foundry',
            'developing/verify_facilities/verify_manually'
          ]
        },
        {
          type: 'category',
          label: 'Dev Recommendations',
          items: ['developing/dev_recommendations/global_variables']
        }
      ]
    },        
    {
      type: 'category',
      label: 'Integrate',
      items: [
        'developing/integrate/wallets/integrating_metamask_into_your_dapp',
        'developing/integrate/wallets/integrating_walletconnect',
        'developing/integrate/wallets/safe',
        'developing/integrate/wallets/safe_cli',
        'developing/integrate/wallets/integrating_web3auth',
        'developing/integrate/oracles/integrating_chainlink',
        'developing/integrate/oracles/integrating_pyth',
        // 'developing/integrate/oracles/integrating_api3', integrating_api3 item is blocked (detalis are in TBA-195)
        'developing/integrate/middleware/the-graph',
        'developing/integrate/indexer/flair',
        'developing/integrate/indexer/envio'
      ]
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        {
          type: 'category',
          label: 'Use Tokens',
          items: [
            'developing/deploy_facilities/interacting_with_spl_tokens',
            'tokens/token_list',
            'token_transferring/neon_transfer'
          ]
        },
        {
          type: 'category',
          label: 'Example Integrations',
          items: ['developing/integrate/indexer/subsquid']
        },        
      ]
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">Tools</h2>' },
    {
      type: 'link',
      label: 'Block Explorer',
      href: 'https://neon.blockscout.com/'
    },
    {
      type: 'link',
      label: 'NeonPass',
      href: 'https://devnet.neonpass.live/'
    },
    {
      type: 'link',
      label: 'NeonFaucet',
      href: 'https://neonfaucet.org/'
    },        
    {
      type: 'category',
      label: 'Configure Dev Tools',
      items: [
        'developing/deploy_facilities/configure_hardhat',
        'developing/deploy_facilities/configure_foundry',
        'developing/deploy_facilities/configure_truffle'
      ]
    },
    {
      type: 'doc',
      label: 'Set up Local Neon EVM',
      id: 'developing/dev_environment/local_proxy_remote_solana'
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">Architecture & Concepts</h2>' },
    {
      type: 'category',
      label: 'Neon EVM Architecture',
      items: [
        'architecture/neon_evm_arch',
        'architecture/eth_sol_solution',
        'architecture/solana-accounts'
      ]
    },
    {
      type: 'category',
      label: 'EVM Compatibility',
      items: [
        'evm_compatibility/overview',
        'evm_compatibility/code_compatibility_checklist',
        'evm_compatibility/opcodes',
        'evm_compatibility/precompiles'
      ]
    },    
    {
      type: 'category',
      label: 'Token Accounts',
      items: ['tokens/token-accounts']
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">API reference</h2>' },
    {
      type: 'doc',
      label: 'JSON-RPC API Methods',
      id: 'evm_compatibility/json_rpc_api_methods'
    },
    { type: 'doc', label: 'Neon Proxy API', id: 'api/neon-api' },
    {
      type: 'doc',
      label: 'Principles and Objectives',
      id: 'governance/principles'
    },
    {   type: 'link',   label: 'Community Channels & Support', href: 'https://www.neonevm.org/community' },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">Operating Neon EVM</h2>' },
    {
      type: 'doc',
      label: 'Operate a Neon Proxy',
      id: 'operating/operator-introduction'
    },
    {
      type: 'category',
      label: 'Run Neon Proxy',
      items: ['operating/basic', 'operating/enhanced']
    },
    {
      type: 'category',
      label: 'Configuration',
      items: ['operating/transaction-gas', 'operating/accounts', 'operating/configuration']
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h2 class="sidebar-menu-title">Govern</h2>' },
    {
      type: 'doc',
      label: 'Overview',
      id: 'governance/overview'
    },
    {
      type: 'doc',
      label: 'Neon DAO Organization',
      id: 'governance/neon_daos'
    },
    {
      type: 'doc',
      label: 'Claiming Vested NEON Tokens',
      id: 'governance/withdraw_neon'
    },    
    {
      type: 'doc',
      label: 'Voting Process',
      id: 'governance/proposals'
    },
    {
      type: 'doc',
      label: 'Sign Votes',
      id: 'governance/technical_implementation/vote'
    },
    {
      type: 'doc',
      label: 'Command Line Utilities',
      id: 'governance/command_line'
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' }
  ]
};

module.exports = sidebars;