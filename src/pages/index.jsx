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
                  Realtime communication SDKs to add high quality audio/video
                  calls to your web applications. <br />
                  These are generally used with our UI Kit but you can create
                  your own UI as well, it&apos;s pretty easy.
                </>
              }
            >
              <Card
                title="Osmosis Core"
                description=" A node implementation for the Osmosis chain"
                to="/osmosis-core/"
                icon={<UIKitIcon />}
              />
              <Card
                title="Modules"
                description="Create your own plugins for use in meetings"
                to="/osmosis-core/modules/"
                icon={<DisconnectedPlugIcon />}
              />
              <Card
                title="Cosmos-sdk fork"
                description="Fork of the Cosmos SDK used in Osmosis"
                to="https://github.com/osmosis-labs/cosmos-sdk"
                icon={<DisconnectedPlugIcon />}
              />
            </Section>
            <Section title="🎨 UI Kit" id="ui-kit" HeadingTag="h4">
              <Card
                title="React UI Kit"
                description="Add UI Kit to your React App"
                to="/react-ui-kit/"
                icon={<ReactIcon />}
              />
              <Card
                title="UI Kit"
                description="HTML Web Components"
                to="/ui-kit/"
                icon={<HTMLIcon />}
              />
              <Card
                title="Angular UI Kit"
                description="Add UI Kit to your Angular App"
                to="/angular-ui-kit/"
                icon={<AngularIcon />}
              />
            </Section>
          </Section>

          <Section title="📱 Mobile SDKs" id="mobile-sdks">
            <Card
              title="React Native"
              description="Integrate Dyte in your React Native App"
              to="/react-native/"
              icon={<ReactIcon />}
            />
            <Card
              title="Android"
              description="Integrate Dyte in your Android App (Kotlin)"
              to="/android/"
              icon={<KotlinIcon />}
            />
            <Card
              title="iOS"
              description="Integrate Dyte in your iOS App (Swift)"
              to="/ios/"
              icon={<SwiftIcon />}
            />
            <Card
              title="Flutter"
              description="Integrate Dyte in your Flutter App"
              to="/flutter/"
              icon={<FlutterIcon />}
            />
          </Section>

          <Section title="🛠 Tools">
            <Card
              title="Dyte CLI"
              description="A command line tool to get things done quick!"
              to="/cli/"
              icon={<TerminalIcon />}
            />
          </Section>

          <Section title="📜 API Reference">
            <Card
              title="API Reference"
              description="Dyte REST API Reference"
              to="/api/"
              icon={<APIReferenceIcon />}
            />
          </Section>

          <GuidesSection title="📖 Advanced Guides" />
        </div>
      </div>
    </Layout>
  );
}
