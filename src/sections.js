import {
  ReactIcon,
  UIKitIcon,
  AngularIcon,
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  HTMLIcon,
  VueIcon,
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
    name: 'Osmosis Chain',
    id: 'osmosis-core',
    icon: UIKitIcon,
    section: 'core-sdk',
  },
  {
    name: 'Local Osmosis',
    id: 'localosmosis',
    icon: UIKitIcon,
    section: 'core-sdk',
  },
  {
    name: 'Networks',
    id: 'networks',
    icon: UIKitIcon,
    section: 'core-sdk',
  },
  //Cosmwasm
  {
    name: 'Cosmwasm',
    id: 'cosmwasm',
    icon: ReactIcon,
    section: 'cosmwasm',
  },
  {
    name: 'Beaker',
    id: 'beaker',
    icon: ReactIcon,
    section: 'cosmwasm',
  },

  // UI SDKs
  {
    name: 'OsmoJS',
    id: 'osmojs',
    icon: HTMLIcon,
    section: 'ui-sdk',
  },
  {
    name: 'Telescope',
    id: 'telescope',
    icon: HTMLIcon,
    section: 'ui-sdk',
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
      name: 'Frontend SDKs',
      section: 'ui-sdk',
      description:
        'Libraries & UI components to build on top of Osmosis.',
    }

  ],
  [
    {
      name: 'Osmosis Core',
      section: 'mobile-core',
      isNew: true,
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
