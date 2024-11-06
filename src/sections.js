import {
  OsmosisCore,
  Network,
  Cosmwasm,
  Beaker,
  Osmojs,
  Telescope,
  Frontend,
} from './icons';

const SECTIONS = [
  // no sections for default section, i.e; home
  {
    id: 'default',
    section: false,
  },
  {
    id: 'guides',
    section: false,
  },

  // Core Development
  {
    name: 'Osmosis Core',
    id: 'osmosis-core',
    icon: OsmosisCore,
    section: 'core-sdk',
  },
  //Cosmwasm
  {
    name: 'Cosmwasm',
    id: 'cosmwasm',
    icon: Cosmwasm,
    section: 'cosmwasm',
  },
  {
    name: 'Beaker',
    id: 'beaker',
    icon: Beaker,
    section: 'cosmwasm',
  },

  // UI SDKs
  {
    name: 'Frontend',
    id: 'frontend',
    icon: Frontend,
    section: 'frontend',
  },
  {
    name: 'OsmoJS',
    id: 'osmojs',
    icon: Osmojs,
    section: 'frontend',
  },
  {
    name: 'Telescope',
    id: 'telescope',
    icon: Telescope,
    section: 'frontend',
  },

];

const MULTI_SECTIONS = [
  [
    {
      name: 'Osmosis Core',
      section: 'core-sdk',
      description: 'Osmosis Chain Development documentation.',
    },
    {
      name: 'CosmWasm',
      section: 'cosmwasm',
      description:
        'Building and interacting with Smart contracts on Osmosis.',
    },
    {
      name: 'Frontend & SDKs',
      section: 'frontend',
      description:
        'Libraries & UI components to build on top of Osmosis.',
    }

  ],
  [
    {
      name: 'Osmosis Core',
      section: 'mobile-core',
      description: 'Osmosis Chain Development documentation.',
    },
    {
      name: 'Prebuilt SDK',
      section: 'mobile-sdk',
      description: 'Use our pre-built mobile SDK, ready to go',
    }
  ]
];

export { SECTIONS, MULTI_SECTIONS };
