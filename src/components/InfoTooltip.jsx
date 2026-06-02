import React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';

// Native-tooltip replacement for the former DyteTooltip-based component.
// Uses the title attribute so there is no third-party UI dependency.
export default function InfoTooltip({ label }) {
  return (
    <span
      style={{ verticalAlign: 'middle', cursor: 'help' }}
      title={label}
      aria-label={label}
    >
      <InfoCircledIcon />
    </span>
  );
}
