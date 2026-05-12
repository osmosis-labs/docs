import React, { useEffect, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import DocSidebarDesktop from '@theme/DocSidebar/Desktop';
import DocSidebarMobile from '@theme/DocSidebar/Mobile';

/*
  Swizzled from @docusaurus/theme-classic/lib/theme/DocSidebar/index.js.

  Docusaurus's built-in `useWindowSize` hook hard-codes a 996px threshold
  for the desktop/mobile cut-off, which decides whether the docs sidebar
  renders inline (desktop) or only inside the navbar slide-in drawer
  (mobile). We bump the navbar to its hamburger form earlier (at 1440px)
  so the navbar items don't overflow, but that change moved the docs
  sidebar with it and left tablet-width readers without an in-page TOC.

  Override the threshold locally so the docs sidebar uses a much lower
  cut-off than the navbar does: keep the page TOC visible all the way
  down to 768px, where the layout genuinely runs out of horizontal room.
*/

const DOCS_SIDEBAR_DESKTOP_THRESHOLD = 768;

function getWindowSize() {
  if (!ExecutionEnvironment.canUseDOM) {
    return 'ssr';
  }
  return window.innerWidth > DOCS_SIDEBAR_DESKTOP_THRESHOLD
    ? 'desktop'
    : 'mobile';
}

function useDocSidebarWindowSize() {
  const [size, setSize] = useState(() => getWindowSize());

  useEffect(() => {
    function update() {
      setSize(getWindowSize());
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}

export default function DocSidebar(props) {
  const size = useDocSidebarWindowSize();
  const renderDesktop = size === 'desktop' || size === 'ssr';
  const renderMobile = size === 'mobile';

  return (
    <>
      {renderDesktop && <DocSidebarDesktop {...props} />}
      {renderMobile && <DocSidebarMobile {...props} />}
    </>
  );
}
