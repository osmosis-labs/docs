# Contributing

The following is a set of guidelines for contributing. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

1. [Styleguides](#styleguides)
2. [What should I know before I get started?](#what-should-i-know-before-i-get-started)
3. [How Can I contribute?](#how-can-i-contribute)
4. [Code Contribution](#code-contribution)

# Guidelines

The following are the guidelines we request you to follow in order to contribute to this project.

## Styleguides

### Commit Messages

The commit messages should follow the following pattern:

```bash
feat: Description # if a new feature is added
fix: Description # if a bug is fixed
refactor: Description # if code is refactored
docs: Description # if documentation is added
lint: Description # if a lint issue is fixed
```

### Issues

```bash
update: Description # if an update is required for a feature
bug: Description # if there is a bug in a particular feature
suggestion: Description # if you want to suggest a better way to implement a feature
```

### Code Styleguide

The code should satisfy the following:

- Have meaningful variable names, either in `snake_case` or `camelCase`.
- Have no `lint` issues.
- Have meaningful file names, directory names and directory structure.
- Have a scope for easy fixing, refactoring and scaling.

### Docs page conventions

A few conventions keep the docs readable and consistent. These are
strongly preferred — push back in review if a PR ignores them.

- **Open every page with a lede.** One or two sentences directly under
  the page title that explain what the page covers and who it's for.
  The first paragraph gets a slightly larger size automatically, so use
  the space — don't waste it on filler ("This guide will...").

- **Break up walls of text.** If a paragraph is more than ~6 lines,
  split it, pull part into a bullet list, or move an aside into a
  Docusaurus admonition (`:::tip`, `:::note`, `:::warning`,
  `:::info`, `:::danger`). Admonitions are the cheapest way to break
  up dense prose and they render with strong visual contrast.

- **Use headings as scannable structure, not decoration.** Aim for an
  `<h2>` every ~150–200 words on dense pages. A reader should be able
  to skim heading-to-heading and understand the page's shape.

- **Index pages need an intro paragraph above the card grid.** When a
  page is mostly a `<HomepageSection>` table of contents (like the
  `osmosis-core/README.mdx`), add one or two sentences above the grid
  that frame what's in the section and which card to read first. A bare
  grid of identical cards reads as a placeholder.

- **Featured card per section.** `<HomepageCard>` accepts a `featured`
  prop that doubles the card width and brightens the border. Use it for
  the "if you read nothing else, read this" entry — **at most one per
  section**. Don't featuring everything; that's just colour noise.

- **Code blocks deserve a language tag.** ` ```sh ` / ` ```ts ` /
  ` ```rust ` so syntax highlighting picks them up. Plain ` ``` ` is
  rarely the right choice.

## What should I know before I get started

You can contribute to any of the features you want, here's what you need to know:

- How the project works.
- The technology stack used for the project.
- A brief idea about writing documentation.

## How Can I Contribute

You can contribute by:

- Reporting Bugs
- Suggesting Enhancements
- Code Contribution
- Pull Requests

## Code Contribution

1. Checkout the latest `main` branch to make sure the feature hasn't been implemented or the bug hasn't been fixed yet.
2. Check the issue tracker to make sure someone already hasn't requested it and/or contributed to it.
3. Fork it!
4. Create your feature branch: `git checkout -b feature/my-new-feature`
5. Add your changes: `git add .`
6. Commit your changes: `git commit -am 'feat: Add some feature'`
7. Push to the branch: `git push -u origin feature/my-new-feature`
8. Submit a pull request :sunglasses:

### Pull Requests

Make sure to document the contributions well in the pull request.
Pull requests should have:

- A concise commit message.
- A description of what was changed/added.

Others will give constructive feedback.
This is a time for discussion and improvements,
and making the necessary changes will be required before we can
merge the contribution.
