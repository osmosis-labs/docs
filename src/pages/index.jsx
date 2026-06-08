import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';

import {
  HomepageCard as Card,
  HomepageSection as Section,
} from '../components/HomepageComponents';
import {
  TerminalIcon,
  ModulesIcon,
  AssetIcon,
  Telescope,
  Osmojs,
  Tscodegen,
  KeysIcon,
  OsmosisCore,
  Contribute,
  RelayerIcon,
} from '../icons';

export default function Homepage() {
  const router = useHistory();

  return (
    <Layout
      description="The Osmosis blockchain is a decentralized network of validators and full nodes, with many front-ends and development teams on it."
      wrapperClassName="homepage"
    >
      <div className="pad">
        <div className="center homepage-content">
          <div className='margin-bottom--lg'>
            <h2>Osmosis Documentation</h2>
            <p>
              Osmosis is the cross-chain DEX and liquidity hub. Whether you want to understand how the protocol works, connect your app or assets, build on the chain, or run a node, these docs cover it. Use the sections below to find your path, or jump straight in.
            </p>
            <button
              type="button"
              className="button button--primary button--lg"
              onClick={() => router.push('/learn')}
            >
              Get Started &rarr;
            </button>
          </div>

          <Section title="Learn">
            <Card
              featured
              title="What is Osmosis?"
              description="Osmosis is the premier cross-chain DEX and DeFi hub for the Cosmos ecosystem and beyond. Start here for the concepts behind the protocol."
              to="/learn/osmosis"
              icon={<OsmosisCore />}
            />
            <Card
              title="The OSMO Token"
              description="Tokenomics, staking, governance, and fees of the OSMO token."
              to="/learn/osmo"
              icon={<OsmosisCore />}
              svgFile="/icons/osmo.svg"
            />
            <Card
              title="Get Started"
              description="Connect a wallet and make your first trade on Osmosis."
              to="/learn/get-started"
              icon={<AssetIcon />}
              svgFile="/icons/store.svg"
            />
            <Card
              title="Features"
              description="Concentrated liquidity, the fee market, fee abstraction, ProtoRev, and more."
              to="/learn/features"
              icon={<ModulesIcon />}
              svgFile="/icons/modules.svg"
            />
            <Card
              title="Glossary"
              description="Definitions for the DeFi and Cosmos terms used throughout the docs."
              to="/learn/terminology"
              icon={<ModulesIcon />}
              svgFile="/icons/registry.svg"
            />
          </Section>

          <Section title="Integrate">
            <Card
              featured
              title="List an Asset"
              description="The end-to-end workflow for bringing a token to Osmosis: connect over IBC, register, source liquidity, create a pool, and add incentives."
              to="/integrate/list-asset"
              icon={<AssetIcon />}
            />
            <Card
              title="Endpoints"
              description="Public RPC, REST, gRPC, and SQS infrastructure for mainnet and testnet."
              to="/integrate/endpoints"
              icon={<TerminalIcon />}
              svgFile="/icons/cli.svg"
            />
            <Card
              title="Feature Integrations"
              description="Integrate against concentrated liquidity, alloyed assets, and smart accounts."
              to="/integrate/features"
              icon={<ModulesIcon />}
              svgFile="/icons/modules.svg"
            />
            <Card
              title="Swap Integration"
              description="Get a routed quote from SQS, build the swap message, and broadcast it."
              to="/integrate/swap"
              icon={<ModulesIcon />}
              svgFile="/icons/swap.svg"
            />
            <Card
              title="Prices and Oracles"
              description="Get a USD or spot price for an asset, and when to use each source."
              to="/integrate/prices"
              icon={<ModulesIcon />}
              svgFile="/icons/gauge.svg"
            />
          </Section>

          <Section title="Build" id="build" hasSubSections>
            <Section id="build-main" HeadingTag="h4">
              <Card
                featured
                title="Install osmosisd"
                description="Minimum specs, installation, building from source, and the osmosisd command reference. The starting point for chain development."
                to="/build/developer-environment/osmosisd"
                icon={<TerminalIcon />}
                svgFile="/icons/cli.svg"
              />
              <Card
                title="Key Management"
                description="Manage keys via the CLI, including multisig wallets."
                to="/build/developer-environment/keys/keys-cli"
                icon={<KeysIcon />}
              />
              <Card
                title="Local Testing"
                description="Spin up a containerized LocalOsmosis chain to develop against."
                to="/build/developer-environment/localtesting"
                icon={<TerminalIcon />}
                svgFile="/icons/cli.svg"
              />
              <Card
                title="Chain Development"
                description="Specifications for every x/ module: messages, state, and parameters."
                to="/build/chain"
                icon={<ModulesIcon />}
                svgFile="/icons/modules.svg"
              />
              <Card
                title="CosmWasm"
                description="Write, deploy, and interact with CosmWasm smart contracts on Osmosis."
                to="/build/cosmwasm"
                icon={<TerminalIcon />}
                svgFile="/icons/cw-orch.svg"
              />
            </Section>

            <Section
              title="🖥 Frontend & SDKs"
              id="build-frontend"
              HeadingTag="h4"
              description={<>TypeScript and JavaScript libraries for building on Osmosis.</>}
            >
              <Card
                title="Osmosis Frontend"
                description="Architecture of the app.osmosis.zone web interface."
                to="/build/frontend/osmosis-frontend"
                icon=""
                svgFile="/icons/osmo.svg"
              />
              <Card
                title="OsmoJS"
                description="Compose and broadcast Osmosis and Cosmos messages, with proto and amino encoding handled for you."
                to="/build/frontend/osmojs"
                icon={<Osmojs />}
              />
              <Card
                title="Telescope"
                description="TypeScript transpiler for Cosmos protobufs, used to generate chain libraries."
                to="/build/frontend/telescope"
                icon={<Telescope />}
              />
              <Card
                title="CosmosKit"
                description="A wallet adapter for React with mobile WalletConnect support for the Cosmos ecosystem."
                to="/build/frontend/cosmos-kit"
                icon=""
                svgFile="/icons/bag.svg"
              />
              <Card
                title="Osmosis-Labs Math"
                description="NPM package with math functions for the Osmosis AMM, useful for estimating state changes."
                to="https://www.npmjs.com/package/@osmosis-labs/math"
                icon={<Tscodegen />}
                svgFile="/icons/math.svg"
              />
              <Card
                title="Osmosis-Labs Pools"
                description="NPM package defining the pool interface and routing logic for the Osmosis DEX."
                to="https://www.npmjs.com/package/@osmosis-labs/pools"
                icon={<Tscodegen />}
                svgFile="/icons/pools.svg"
              />
            </Section>
          </Section>

          <Section title="Validate">
            <Card
              featured
              title="Running a Node on Mainnet"
              description="Sync and run a full Osmosis node on mainnet, the foundation for validating and relaying."
              to="/validate/joining-mainnet"
              icon={<TerminalIcon />}
              svgFile="/icons/cli.svg"
            />
            <Card
              title="Install osmosisd"
              description="Minimum specs and installation for the osmosisd binary."
              to="/validate/install-osmosisd"
              icon={<TerminalIcon />}
              svgFile="/icons/cli.svg"
            />
            <Card
              title="Validating on Mainnet"
              description="Create a validator and go live on mainnet."
              to="/validate/validating-mainnet"
              icon={<TerminalIcon />}
              svgFile="/icons/cli.svg"
            />
            <Card
              title="Using TMKMS"
              description="Production key security for a validator with the Tendermint KMS."
              to="/validate/tmkms"
              icon={<KeysIcon />}
            />
            <Card
              title="Relayer Guide"
              description="Run IBC relaying infrastructure (Hermes) between Osmosis and other chains."
              to="/validate/relayer-guide"
              icon=""
              svgFile="/icons/relayer.svg"
            />
          </Section>

          <Section title="Community">
            <Card
              title="Contributing"
              description="Guidelines for contributing to Osmosis development."
              to="/community/contributing"
              icon={<Contribute />}
              svgFile="/icons/octocat.svg"
            />
            <Card
              title="Translations"
              description="Help translate the Osmosis interface into new languages."
              to="/community/translating"
              icon={<Contribute />}
              svgFile="/icons/registry.svg"
            />
            <Card
              title="IBC Relayer List"
              description="Directory of relaying operators connecting Osmosis to the Cosmos ecosystem."
              to="/community/ibc-relayers-list"
              icon={<RelayerIcon />}
              svgFile="/icons/relayer.svg"
            />
          </Section>

        </div>
      </div>
    </Layout>
  );
}
