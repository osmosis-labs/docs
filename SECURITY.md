# Security Policy

This repository contains the source for [docs.osmosis.zone](https://docs.osmosis.zone), a static documentation site. It holds no user funds, accounts or private data.

For vulnerabilities in the Osmosis chain, frontend or other Osmosis repositories, follow the [Osmosis security policy](https://github.com/osmosis-labs/osmosis/blob/main/SECURITY.md).

## Reporting a vulnerability

Report security issues privately to `security@osmosis.team`, not through public GitHub issues.

Include the affected file or URL, steps to reproduce, and the impact you believe it has. Do not test against production services beyond what is needed to confirm the issue.

## Out of scope

The following are not vulnerabilities and are not eligible for a bounty:

- **Public client-side keys.** The Algolia DocSearch search-only API key is shipped to every visitor's browser so the search box works. It is read-only by design, whether it appears in the published site, the repository, or its git history. The keys with write access to the search index are stored as GitHub Actions secrets and are not in this repository.
- Credentials in git history that have already been rotated or revoked.
- Reports from automated scanners that do not demonstrate real impact, such as a working write or admin action.
- Missing security headers, clickjacking, or other best-practice findings on static pages with no sensitive actions.
- Typos, broken links or incorrect content in the documentation. Please open a regular issue or pull request for these.

## Bug bounty

Osmosis does not run an official bug bounty program for this repository. Rewards for high and critical findings across Osmosis are covered by the [Osmosis security policy](https://github.com/osmosis-labs/osmosis/blob/main/SECURITY.md#bug-bounty).
