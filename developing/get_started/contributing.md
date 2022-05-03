# Contributing

The following information provides a set of guidelines for contributing to the Osmo chain dev repo. Use your best judgment, and, if you see room for improvement, please propose changes to this document.

The contributing guide for Osmosis explains the branching structure, how to use the SDK fork, how to make / test updates to SDK branches and how to create release notes.

Contributions come in the form of writing documentation, raising issues / PRs, and any other actions that help develop the Osmo protocol documentation.

## First steps

The first step is to find an issue you want to fix. To identify issues we think are good for first-time contributors, we add the **good first issue** label.

If you have a feature request, please use the [feature-request repo](https://github.com/osmosis-labs/feature-requests)

Once you find an existing issue that you want to work on or if you have a new issue to create, continue below.

## Working with the SDK

### Updating dependencies for builds

Commit & push to our cosmos-sdk fork in a new branch somewhere, and then you can grab the commit hash to do:

`go get github.com/osmosis-labs/cosmos-sdk@{my commit hash}`

You get something like:

`go get: github.com/osmosis-labs/cosmos-sdk@v0.33.2 updating to
	github.com/osmosis-labs/cosmos-sdk@v0.42.10-0.20210829064313-2c87644925da: parsing go.mod:
	module declares its path as: github.com/cosmos/cosmos-sdk
	        but was required as: github.com/osmosis-labs/cosmos-sdk`

Then you can copy paste the `v0.42.10-0.20210829064313-2c87644925da` part and replace the corresponding section of go.mod

Then do `go mod vendor`, and your set.

### Changing things in vendor for local builds / local testing

### Branch structure of releases on v7, v6, v4, and using the mergify labels for backporting.

### How to build proto files. (rm -rf vendor/ && make build-reproducible once docker is installed)

## Proposing changes

To contribute a change proposal, use the following workflow:

1. [Fork the repository](https://github.com/osmosis-labs/osmosis).
2. [Add an upstream](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) so that you can update your fork.
3. Clone your fork to your computer.
4. Create a branch and name it appropriately.
5. Work on only one major change in one pull request.
6. Next, rince and repeat the following:

    1. Commit your changes. Write a simple, straightforward commit message. To learn more, see [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/).
    2. Push your changes to your remote fork.
    3. Create a PR on the Osmo repository. There should be a PR template to help you do so.
    4. Wait for your changes to be reviewed. If you are a maintainer, you can assign your PR to one or more reviewers. If you aren't a maintainer, one of the maintainers will assign a reviewer.
    5. After you receive feedback from a reviewer, make the requested changes, commit them to your branch, and push them to your remote fork again.
    6. Once approval is given, feel free to squash & merge!

## The release process

For releasing the SDK or IAVL, I normally just tag the branch and auto-generate the release notes. We haven't been utilizing the changelog much on our fork.

As for the osmosis repo, we need to ensure the following:
- All dependencies (sdk fork, iavl fork etc) are updated
- changelog is updated
- binaries are generated with make build-reproducible
    - make sure to test them on your platform. I've had issues where we they generated but didn't start up
- write up the release notes and run them by Dev

Once that's done, press "Draft a new release"

Then:
- Choose correct tag i.e. v7.2.1
- Title matches tag
- Press Auto-generate release notes
- makes sure they are correct
- Write up the description above the auto-generated notes
- Attached tested binaries
- Checkbox "This is a pre-release" and press "Publish"
- It must be published to be visible by others
- If you save draft, only you can see it
- Share with the team for review
- Once Dev approves, remove the pre-release checkmark and publish
- Announce on Discord in #validators
- Make sure that the message is proof read
- Don't @validators, unless specifically requested by Dev

Modify the make file to only make a linux/amd64 build. 
The tar.gz  and source code files come from make build-reproducible

When uploading binaries:
- Upload the binaries AFTER your branch is published. Make sure to create binaries from the correct tag
- 

Helpful tips:
- Use VSCode's extensions to help with resolving merge conflicts (which usually autohighlights the merge conflict and allows you to select the right one)
- If mergebot isn't helping, feel free to manually cherry-pick the commit.

