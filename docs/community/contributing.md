---
description: Guidelines for contributing to the Osmosis repositories.
title: Contributing
sidebar_position: 5
---
# Contributing

The following guidelines are for contributing to the Osmosis chain repository ([osmosis-labs/osmosis](https://github.com/osmosis-labs/osmosis)). Use your best judgment, and, if you see room for improvement, please propose changes to this document.

This guide explains the branching structure, how to use the SDK fork, how to make and test updates to SDK branches, and how to create release notes.

To contribute to this documentation site itself, open an issue or PR against the [osmosis-labs/docs](https://github.com/osmosis-labs/docs) repository. Contributions come in the form of writing documentation, raising issues and PRs, and any other actions that help develop Osmosis and its docs.

## First steps

The first step is to find an issue you want to fix. To identify issues we think are good for first-time contributors, we add the **good first issue** label.

If you have a feature request, please use the [feature-request repo](https://github.com/osmosis-labs/feature-requests)

Once you find an existing issue that you want to work on or if you have a new issue to create, continue below.

## Proposing changes

To contribute a change proposal, use the following workflow:

1. [Fork the repository](https://github.com/osmosis-labs/osmosis).
2. [Add an upstream](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) so that you can update your fork.
3. Clone your fork to your computer.
4. Create a branch and name it appropriately.
5. Work on only one major change in one pull request.
6. Make sure all tests are passing locally.
7. Next, rinse and repeat the following:

    1. Commit your changes. Write a simple, straightforward commit message. To learn more, see [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/).
    2. Push your changes to your remote fork.
    3. Create a PR on the Osmo repository. There should be a PR template to help you do so.
    4. Wait for your changes to be reviewed. If you are a maintainer, you can assign your PR to one or more reviewers. If you aren't a maintainer, one of the maintainers will assign a reviewer.
    5. After you receive feedback from a reviewer, make the requested changes, commit them to your branch, and push them to your remote fork again.
    6. Once approval is given, feel free to squash & merge!

## Working with the SDK

### Pointing at a Cosmos SDK fork

Osmosis runs a fork of the Cosmos SDK and of CometBFT. They are wired in through `replace`
directives in `go.mod` rather than by vendoring, and there is no `vendor/` directory in the repo.

Each replace carries comments recording the fork branch, the commit, and the release tag it maps to,
for example:

```go
// Direct cosmos-sdk branch link: https://github.com/osmosis-labs/cosmos-sdk/tree/osmo-v30/0.50.14
cosmossdk.io/store => github.com/osmosis-labs/cosmos-sdk/store v1.1.1-v0.50.11-v28-osmo-2
```

To move Osmosis onto a new fork revision:

1. Commit and push your change to the [osmosis-labs/cosmos-sdk](https://github.com/osmosis-labs/cosmos-sdk) fork on a branch, and tag it if the replace targets a tag.
2. Update the version on the right-hand side of the relevant `replace` line in `go.mod`, and update the branch/commit/tag comments above it so they still describe what is pinned.
3. Run `go mod tidy` and build.

Note that the fork's `go.mod` still declares the upstream module path, so a bare
`go get github.com/osmosis-labs/cosmos-sdk` fails with a "module declares its path as" error. The
`replace` directive is what makes the substitution work, so edit `go.mod` directly rather than
relying on `go get`.

### Profiling and benchmarks

In whichever folder you're running benchmarks for, you can test via:

`go test -benchmem -bench DistributionLogicLarge -cpuprofile cpu.out -test.timeout 30m -v`

Then once that is done, and you get the short benchmark results out, you can do:

`go tool pprof -http localhost:8080 cpu.out`

and take a look at the graphviz output.

Note that if you are doing things that are low-level or small, the overhead of cpuprofile may
interfere with cache effects. For larger units of work such as epoch code or sizeable transactions
it works well.

### Branch structure and backports

Each major release has a long-lived release branch (for example `v31.x`). Older release branches are kept updated, since people still need those versions for querying old versions of the chain and syncing a node from genesis.

Most PRs land on `main` first. State-compatible fixes are then backported to the latest major release branch with a `backport` label. We typically use mergify for backporting, which takes place after a PR has been merged to main.

### Building proto files

Protobuf generation runs in Docker, so make sure Docker is installed first.

- `make proto-all` formats and regenerates the protobuf files (`proto-format` then `proto-gen`).
- `make build-reproducible` produces the reproducible release build.

A warning such as `No HttpRule found for method: Msg.CreateBalancerPool` during generation is
expected and can be ignored.

Before you commit and push, run the linters and unit tests:

- `make lint-all` runs golangci-lint and the markdown linter. `make lint-format` applies the
  autofixes, including `gofumpt`. Plain `make lint` only prints the available lint subtargets.
- `make test-unit` runs the unit tests.
