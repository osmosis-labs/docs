import React from 'react';
import Layout from '@theme/Layout';

import {
  APIReferenceIcon,
  TerminalIcon,
  IDEIcon,
  ModulesIcon,
  AssetIcon,
  Telescope,
  Osmojs,
  Createapp,
  Cosmoskit,
  Tscodegen,
  KeysIcon,
  Transaction,
  OsmosisCore,
  Contribute,
  Guide,
  Network,
  ChainIcon,
} from '../icons';
import {
  HomepageCard as Card,
  HomepageSection as Section,
} from '../components/HomepageComponents';

/** Opens the Algolia DocSearch modal by dispatching the Ctrl+K shortcut
 *  it already listens for. Docusaurus doesn't expose a public API for this. */
function openSearch(event) {
  event.preventDefault();
  const keyEvent = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    keyCode: 75,
    which: 75,
    ctrlKey: true,
    metaKey: true,
    bubbles: true,
  });
  document.dispatchEvent(keyEvent);
}

export default function Homepage() {
  return (
    <Layout
      description="The Osmosis blockchain is a decentralized network, run by 150+ validators and full nodes, with many front-ends and development teams on it."
      wrapperClassName="homepage"
    >
      <div className="pad">
        <div className="center homepage-content">
          <section id="hero">
            <span className="hero-eyebrow">Osmosis / Docs</span>
            <h2>Build on the leading Cosmos DEX</h2>
            <p>
              The Osmosis blockchain is a decentralized network run by 150+
              validators and full nodes, with many front-ends and development
              teams building on it. Explore the docs and examples to learn,
              develop, and integrate with Osmosis.
            </p>
            <a
              className="hero-cta"
              href="#search"
              onClick={openSearch}
              aria-label="Search the docs"
            >
              Get Started &rarr;
            </a>
          </section>

          <Section title="Learn about Osmosis">
            <Card
              featured
              title="What is Osmosis?"
              description="Osmosis is the premier cross-chain DEX and DeFi hub for the Cosmos ecosystem and beyond. Start here if you're new."
              to="/overview/educate/osmosis"
              icon={<OsmosisCore />}
            />
            <Card
              title="How to use the Osmosis DEX"
              description="Learn about how to swap, provide liquidity and more."
              to="/overview/educate/getting-started"
              icon={<Guide />}
            />
            <Card
              title="Explore the Ecosystem"
              description="Osmosis is home to a wide array of protocols and tools, find documentation relating to these on their sites"
              to="https://app.osmosis.zone/apps"
              icon={<Network />}
            />
            <Card
              title="List on Osmosis"
              description="Learn how to list your project's token on Osmosis"
              to="/overview/integrate"
              icon={<AssetIcon />}
            />
            <Card
              title="Join the Chain"
              description="Learn how to run an Osmosis node or validator"
              to="/overview/validate"
              icon={<ChainIcon />}
            />
          </Section>

          <Section title="Osmosis Chain">
            <Card
              featured
              title="Build and Test Osmosis Source Code"
              description="The starting point for working on the chain itself — set up your toolchain, compile, and run the test suite."
              to="/osmosis-core/build"
              icon={<OsmosisCore />}
            />
            <Card
              title="IDE Setup"
              description="Recommended IDE setup for developing on Osmosis in Go"
              to="/osmosis-core/ide-guide"
              icon={<IDEIcon />}
            />
            <Card
              title="Osmosisd CLI"
              description="Install osmosisd to join the network or simple query it."
              to="/osmosis-core/osmosisd"
              icon={<TerminalIcon />}
              svgFile="/icons/cli.svg"
            />
            <Card
              title="Modules"
              description="Osmosis modules and their respective CLI commands"
              to="/osmosis-core/modules"
              icon={<ModulesIcon />}
              svgFile="/icons/modules.svg"
            />
            <Card
              title="Relaying"
              description="Relay IBC packets between Osmosis and other chains"
              to="/osmosis-core/relaying"
              svgFile="/icons/relayer.svg"
            />
            <Card
              title="Assets"
              description="Currently supported assets on Osmosis with their corresponding channels and IBC denoms."
              to="/osmosis-core/asset-info"
              icon={<AssetIcon />}
            />
            <Card
              title="Key Management"
              description="Managing keys via CLI and advanced operations such as multisig wallets"
              to="/osmosis-core/category/keys-management"
              icon={<KeysIcon />}
            />
            <Card
              title="Transaction Structure"
              description="Understanding the structure of a transaction on the Osmosis blockchain"
              to="/osmosis-core/guides/structure"
              icon={<Transaction />}
              svgFile="/icons/transaction.svg"
            />
            <Card
              title="Contributing"
              description="Guidelines to contributing to Osmosis core development."
              to="/osmosis-core/contributing"
              icon={<Contribute />}
              svgFile="/icons/octocat.svg"
            />
          </Section>

          <Section title="Osmosis Frontend">
            <Card
              featured
              title="Osmosis Frontend"
              description="The web interface for app.osmosis.zone — architecture, contributing, and local setup."
              to="/frontend/osmosis-frontend"
              svgFile="/icons/osmo.svg"
            />
            <Card
              title="OsmoJS"
              description="Compose and broadcast Osmosis and Cosmos messages, with all of the proto and amino encoding handled for you."
              to="/osmojs"
              icon={<Osmojs />}
            />
            <Card
              title="Osmosis-Labs Math"
              description="NPM package with math functions related to Osmosis AMM. Useful for estimating state changes to propose reasonable min/max amounts in transactions."
              to="https://www.npmjs.com/package/@osmosis-labs/math"
              icon={<Tscodegen />}
              svgFile="/icons/math.svg"
            />
            <Card
              title="Osmosis-Labs Pools"
              description="NPM package that defines pool interface and pool routing logic for the Osmosis Dex."
              to="https://www.npmjs.com/package/@osmosis-labs/pools"
              icon={<Tscodegen />}
              svgFile="/icons/pools.svg"
            />
            <Card
              title="Osmosis-Labs Stores"
              description="NPM package which contains observable stores via mobx data storage framework for the Osmosis front-end"
              to="https://www.npmjs.com/package/@osmosis-labs/stores"
              icon={<Tscodegen />}
              svgFile="/icons/store.svg"
            />
          </Section>

          <Section title="Tooling and References">
            <Card
              featured
              title="API Reference"
              description="The complete RPC, LCD, and gRPC endpoint reference for integrating against Osmosis."
              to="/api/"
              icon={<APIReferenceIcon />}
            />
            <Card
              title="Cosmos Kit"
              description="A wallet adapter for react with mobile WalletConnect support for the Cosmos ecosystem."
              to="https://github.com/cosmology-tech/cosmos-kit"
              svgFile="/icons/bag.svg"
            />
            <Card
              title="Telescope"
              description="TypeScript Transpiler for Cosmos Protobufs. Telescope is used to generate libraries for Cosmos blockchains."
              to="/telescope"
              icon={<Telescope />}
            />
            <Card
              title="Create Cosmos App"
              description="Set up a modern Cosmos app by running one command"
              to="https://github.com/cosmology-tech/create-cosmos-app"
              icon={<Createapp />}
              svgFile="/icons/create-cosmos-app.svg"
            />
            <Card
              title="Chain Registry"
              description="The npm package for the Official Cosmos chain registry"
              to="https://github.com/cosmology-tech/chain-registry"
              icon={<Cosmoskit />}
              svgFile="/icons/registry.svg"
            />
            <Card
              title="TS Codegen"
              description="The quickest and easiest way to interact with CosmWasm Contracts"
              to="https://github.com/CosmWasm/ts-codegen"
              icon={<Tscodegen />}
              svgFile="/icons/tscodegen.svg"
            />
            <Card
              title="Cw-orchestrator"
              description="All-in-one Rust-based CosmWasm contracts testing, scripting, and deployment tool"
              to="/cosmwasm/cw-orch"
              icon={<TerminalIcon />}
              svgFile="/icons/cw-orch.svg"
            />
          </Section>
        </div>
      </div>
    </Layout>
  );
}
