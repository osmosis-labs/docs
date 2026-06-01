import React from 'react';

import DemoElements from '../../components/DemoElements';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...DemoElements,
};

export default ReactLiveScope;
