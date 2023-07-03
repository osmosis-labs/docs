---
sidebar_position: 2
sidebar_label: Installation
description: How to install and run the dApp.
---

# Installation

You can run the *frontend platform interface* of **your Osmosis outpost** in 
**dev mode** by downloading the corresponding repository and setup the 
environment. To do this, you need to execute the following steps:

> **_NOTE_:**  Node.js is required to run the project.

### 1. Clone repo

Clone the repository to your local machine:

```bash
git clone https://github.com/nabla-studio/osmosis-outposts-ui.git
```

### 2. Install deps

Install the dependencies:

```bash
cd osmosis-outposts-ui
pnpm i
```

### 3. Build packages

Build the needed packages:

```bash
nx build outpost-web-ui
nx build outpost-web-ui-react
```


### 4. Setup environment

You need to setup your **local environment**. 

If you want to simply and fastly test the dApp, you can use the example *.env* 
file we provide, which will setup the *nabla branded* dApp using the *Osmosis* 
*and Juno* **official testnet**.
```bash
cp ./apps/web/.env.example ./apps/web/.env
```
You can create your custom `.env` file by following the 
[corresponding guide](./customization-guide/customization/code-customization).

To better understand how to customize such file to style the interface, please
follow the documentation at the 
[Customizazion Guide](./customization-guide/customizability).

### 5. Start dev server
Start the development server for the whole dApp:

```bash
nx serve web
```

### 6. Navigate to dapp
Open the browser and navigate to [http://localhost:4200](http://localhost:4200)
to see the dApp in action.