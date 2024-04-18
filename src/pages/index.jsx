import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { DyteButton } from '@dytesdk/react-ui-kit';

import {
  HomepageCard as Card,
  HomepageSection as Section,
} from '../components/HomepageComponents';
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
} from '../icons';

export default function Homepage() {
  const router = useHistory();

  return (
    <Layout
      description="The Osmosis blockchain is a decentralized network, run by 150+ validators and full nodes, with many front-ends and development teams on it."
      wrapperClassName="homepage"
    >
      <div className="pad">
        <div className="center homepage-content">
          <div className='margin-bottom--lg'>
            <h2>Osmosis Docs</h2>
            <p>
              The Osmosis blockchain is a decentralized network, run by 150+ validators and full nodes, with many front-ends and development teams on it. Explore our docs and examples to quickly learn, develop & integrate with the Osmosis blockchain.
            </p>
            <DyteButton onClick={() => router.push('/osmosis-core/')}>
              Get Started &rarr;
            </DyteButton>
          </div>

          <Section title="What's the latest">
            <Card
              title="Osmosis Outpost Docs"
              description="An Osmosis outpost is a platform that makes it much simpler to perform swaps
              on different Cosmos chains without having to manually send the tokens to 
              Osmosis to trade them, or worse, to build their own DEX. Learn more about it here."
              to="/osmosis-outpost"
            />
            <Card
              title="Osmosis Testnet-5 is live"
              description="Now live and ready for exploration. Join the testnet to gain hands-on experience with the newest features and take advantage of the expanded network options available."
              to="/overview/endpoints"
            />

            <Card
              title="Introducing the Osmosis Web CLI"
              description=" Whether you're a seasoned developer or a curious enthusiast, this user-friendly interface provides a quick and intuitive way to access and leverage the power of Osmosis."
              to="https://cli.osmosis.zone/"
            />
          </Section>



          <Section title="Learn about Osmosis">
            <Card
              title="What is Osmosis?"
              description="Osmosis is an advanced automated market maker (AMM) protocol that allows developers to build customized AMMs."
              to="/overview/educate/osmosis"
              icon={<OsmosisCore />}
            />
            <Card
              title="How to use the Osmosis DEX"
              description="Learn about how to swap, provide liquidity and more."
              to="/overview/educate/getting-started"
            />
            <Card
              title="Explore the Ecosystem"
              description="Osmosis is home to a wide array of protocols and tools, find documentation relating to these on their sites"
              to="https://osmosis.zone/ecosystem"
            />
            <Card
              title="List on Osmosis"
              description="Learn how to list your project's token on Osmosis"
              to="/overview/integrate"
            />
            <Card
              title="Join the Chain"
              description="Learn how to run an Osmosis node or validator"
              to="/overview/validate"
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
                description=" Relay IBC packets between Osmosis and other chains"
                to="/osmosis-core/relaying"
                icon=""
                svgFile="/icons/relayer.svg"
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
                svgFile="/icons/transaction.svg"
              />
              <Card
                title="Contributing"
                description=" Guidelines to contributing to Osmosis core development."
                to="/osmosis-core/contributing"
                icon={<Contribute />}
                svgFile="/icons/octocat.svg"
              />

            </Section>
          </Section>


          <Section title="Osmosis Frontend" id="web-sdks" hasSubSections >

            <Section>
              <Card
                title="Osmosis Frontend"
                description="Web interface for Osmosis Zone"
                to="/frontend/osmosis-frontend"
                icon=""
                svgFile="/icons/osmo.svg" />

              <Card
                title="OsmoJS"
                description="Compose and broadcast Osmosis and Cosmos messages, with all of the proto and amino encoding handled for you."
                to="/osmojs"
                icon={<Osmojs />}
                svgFile=""
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
          </Section>

          <Section title="Frontend SDK Libraries & Utilities" id="web-sdks" hasSubSections >

            <Section>

              <Card
                title="Cosmos Kit"
                description="A wallet adapter for react with mobile WalletConnect support for the Cosmos ecosystem."
                to="https://github.com/cosmology-tech/cosmos-kit"
                icon=""
                svgFile="/icons/bag.svg"
              />
              <Card
                title="Telescope"
                description="TypeScript Transpiler for Cosmos Protobufs. Telescope is used to generate libraries for Cosmos blockchains."
                to="/telescope"
                icon={<Telescope />}
                svgFile=""
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



            </Section>
          </Section>


          <Section title="🛠 Tools">
            <Card
              title="Osmosisd CLI"
              description="A command line tool to get things done quick!"
              to="/osmosis-core/osmosisd"
              icon={<TerminalIcon />}
              svgFile="/icons/cli.svg"
            />
            <Card
              title="Cw-orchestrator"
              description="All-in-one Rust-based CosmWasm contracts testing, scripting, and deployment tool"
              to="/cosmwasm/cw-orch"
              icon={<TerminalIcon/>}
              svgFile="/icons/cw-orch.svg"
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
