import React from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';

/*
  Swizzled from @docusaurus/theme-classic/lib/theme/Navbar/MobileSidebar/index.js.

  Docusaurus computes `shouldRender` from useWindowSize() and only
  renders the navbar mobile sidebar when the viewport is below its
  hardcoded 996px threshold. We force the hamburger to be visible up
  to 1440px via CSS to keep the top bar from squashing, so above 996px
  the user can click the hamburger but it opens an empty grey drawer
  because shouldRender is still false.

  Bypass the shouldRender gate. The drawer is rendered whenever the
  navbar has items at all (the disabled state), and `shown` continues
  to drive the slide-in animation. The body-scroll lock and the
  history-pop close behaviour are preserved.
*/

export default function NavbarMobileSidebar() {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);

  if (mobileSidebar.disabled) {
    return null;
  }

  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}
