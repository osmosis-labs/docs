import React from 'react';
import clsx from 'clsx';

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        {logo && <div className="margin-bottom--sm">{logo}</div>}

        <div className="footer__row">
          <div className="footer__data">
            <div className="footer__cta">
             
            </div>
          </div>
          <div className="links">{links}</div>
        </div>
        {copyright && <div className="footer__bottom text--center">{copyright}</div>}
      </div>
         
<script async src="https://tally.so/widgets/embed.js"></script>
<script>
  window.TallyConfig = {
    "formId": "w8zL9k",
    "popup": {
      "width": 900,
      "emoji": {
        "text": ":wave:",
        "animation": "wave"
      },
      "layout": "modal",
      "showOnce": true,
      "autoClose": 0
    }
  };
</script>
<script src="https://widget.kapa.ai/kapa-widget.bundle.js" data-website-id="c5b5e9fc-d025-4c12-b08e-9784d0e2161f" data-project-name="Osmosis" data-project-color="#7900B4" data-project-logo="https://app.osmosis.zone/_next/image?url=%2Ftokens%2Fosmo.svg&w=64&q=75" async></script>

    </footer>
  );
}
