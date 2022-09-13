import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { DyteButton } from '@dytesdk/react-ui-kit';

import {
  HomepageCard as Card,
  HomepageSection as Section,
} from '../components/HomepageComponents';
import {
  AngularIcon,
  APIReferenceIcon,
  FlutterIcon,
  HTMLIcon,
  KotlinIcon,
  ReactIcon,
  SwiftIcon,
  TerminalIcon,
  DisconnectedPlugIcon,
  UIKitIcon,
  ChainIcon,
  IDEIcon,
  ModulesIcon,
  RelayerIcon,
  AssetIcon,
  Telescope,
  Osmojs,
  Createapp,
  Cosmoskit,
  Tscodegen,
  KeysIcon,
  Transaction,
  OsmosisCore,
} from '../icons';
import GuidesSection from '../components/GuidesSection';

export default function Homepage() {
  const router = useHistory();

  return (
    <Layout
      description="The Osmosis blockchain is a decentralized network, ran by 100+ validators and full nodes, with many front-ends and development teams on it. 🚀"
      wrapperClassName="homepage"
    >
      <div className="pad">
        <div className="center homepage-content">
          <div id="hero">
            <h2>Osmosis Docs</h2>
            <p>
            The Osmosis blockchain is a decentralized network, ran by 100+ validators and full nodes, with many front-ends and development teams on it. Explore our docs and examples to quickly learn, develop & integrate with the Osmosis blockchain.
            </p>
            <DyteButton onClick={() => router.push('/osmosis-core/')}>
              Get Started &rarr;
            </DyteButton>
          </div>

          <Section title="Learn about Osmosis">
            <Card
              title="What is Osmosis?"
              description="Osmosis is an advanced automated market maker (AMM) protocol that allows developers to build customized AMMs with sovereign liquidity pools."
              to="/overview/"
            />
            <Card
              title="How to use the Osmosis Dex"
              description="Learn about how to swap, provide liquidity and more."
              to="/overview/getting-started"
            />
            <Card
              title="The OSMO Token"
              description="The OSMO token is a governance token that allows staked token holders to decide the future of the protocol, including every implementation detail. "
              to="/overview/getting-started"
            />
          </Section>

          <Section title="Developers" id="web-sdks" hasSubSections>
            <Section
              title="⚙️ Chain Development"
              id="core-sdks"
              HeadingTag="h4"
              description={
                <>
                  Everything that is needed to learn about the Osmosis core chain development. 
                </>
              }
            >
             

             <Card
    title="Build and Test Osmosis Source Code"
    description="Getting started with building and testing Osmosis codebase"
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
  />
  <Card
    title="Modules"
    description="Osmosis modules and their respective CLI commands"
    to="/osmosis-core/modules"
    icon={<ModulesIcon />}
  />
  <Card
    title="Relaying"
    description=" Relay IBC packets between Osmosis and other chains"
    to="/osmosis-core/relaying"
    icon={<RelayerIcon />}
  />
  <Card
    title="Assets"
    description="     Currently supported assets on Osmosis with their corresponding channels and IBC denoms."
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
    description=" Understanding the structure of a transaction on the Osmosis blockchain"
    to="/osmosis-core/guides/structure"
    icon={<Transaction />}
  />
  <Card
    title="Contributing"
    description=" Guidelines to contributing to Osmosis core development."
    to="/osmosis-core/contributing"
    icon={<KeysIcon />}
  />

            </Section>
          </Section>

    
   <Section title="Frontend Libraries & Utilities" id="front-end">
    <Card
    title="OsmoJS"
    description="Compose and broadcast Osmosis and Cosmos messages, with all of the proto and amino encoding handled for you."
    to="/osmojs"
    icon={<Osmojs />}
  />

  <Card
    title="Cosmos Kit"
    description="A wallet adapter for react with mobile WalletConnect support for the Cosmos ecosystem."
    to="https://github.com/cosmology-tech/cosmos-kit"
    icon={<Cosmoskit />}
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
  />

  <Card
    title="Chain Registry"
    description="The npm package for the Official Cosmos chain registry"
    to="https://github.com/cosmology-tech/chain-registry"
    icon={<Cosmoskit />}
  />

  <Card
    title="TS Codegen"
    description="The npm package for the Official Cosmos chain registry"
    to="https://github.com/cosmology-tech/chain-registry"
    icon={<Tscodegen />}
  />   
 
  </Section>


          <Section title="🛠 Tools">
            <Card
              title="Osmosisd CLI"
              description="A command line tool to get things done quick!"
              to="/osmosis-core/osmosisd"
              icon={<TerminalIcon />}
            />
          </Section>

          <Section title="📜 API Reference">
            <Card
              title="API Reference"
              description="Osmosis RPC and LCD API Reference"
              to="/api/"
              icon={<APIReferenceIcon />}
            />
          </Section>

        </div>
      </div>
    </Layout>
  );
}
