"use strict";(self.webpackChunkosmosis_docs=self.webpackChunkosmosis_docs||[]).push([[7694],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var o=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),m=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=m(e.components);return o.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),p=m(n),d=a,f=p["".concat(l,".").concat(d)]||p[d]||c[d]||i;return n?o.createElement(f,s(s({ref:t},u),{},{components:n})):o.createElement(f,s({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,s=new Array(i);s[0]=p;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:a,s[1]=r;for(var m=2;m<i;m++)s[m]=n[m];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},77712:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>r,toc:()=>m});var o=n(87462),a=(n(67294),n(3905));const i={sidebar_position:3,sidebar_label:"Osmosis Chain Configuration",description:"The Osmosis chain configuration variables."},s="Osmosis Chain Configuration",r={unversionedId:"user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/osmosis-chain-configuration",id:"user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/osmosis-chain-configuration",title:"Osmosis Chain Configuration",description:"The Osmosis chain configuration variables.",source:"@site/docs/osmosis-outpost/user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/osmosis-chain-configuration.md",sourceDirName:"user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements",slug:"/user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/osmosis-chain-configuration",permalink:"/osmosis-outpost/user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/osmosis-chain-configuration",draft:!1,editUrl:"https://github.com/osmosis-labs/docs/tree/main/docs/osmosis-outpost/user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/osmosis-chain-configuration.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"Osmosis Chain Configuration",description:"The Osmosis chain configuration variables."},sidebar:"tutorialSidebar",previous:{title:"Prices Source Configuration",permalink:"/osmosis-outpost/user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/prices-source-configuration"},next:{title:"Outpost Chain Configuration",permalink:"/osmosis-outpost/user-interface-setup/frontend-platform-interface/customization-guide/customization/customizable-elements/outpost-chain-configuration"}},l={},m=[{value:"Required",id:"required",level:2},{value:"OSMOSIS_CHAIN_ID_BASE",id:"osmosis_chain_id_base",level:3},{value:"OSMOSIS_CHAIN_NAME_BASE",id:"osmosis_chain_name_base",level:3},{value:"Optional",id:"optional",level:2},{value:"OSMOSIS_RPC",id:"osmosis_rpc",level:3},{value:"OSMOSIS_REST",id:"osmosis_rest",level:3},{value:"Useful Information",id:"useful-information",level:2}],u={toc:m};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"osmosis-chain-configuration"},"Osmosis Chain Configuration"),(0,a.kt)("p",null,"This configuration allows you to set the configuration value for the Osmosis\nblockchain. It allows you to switch between the ",(0,a.kt)("strong",{parentName:"p"},"mainnet")," and the ",(0,a.kt)("strong",{parentName:"p"},"testnet"),"\nconfigurations and to override the default endpoints and values used by\n",(0,a.kt)("em",{parentName:"p"},"cosmos-kit"),"."),(0,a.kt)("p",null,"This configuration affects the logic of the platform."),(0,a.kt)("h2",{id:"required"},"Required"),(0,a.kt)("h3",{id:"osmosis_chain_id_base"},"OSMOSIS_CHAIN_ID_BASE"),(0,a.kt)("p",null,"This is the chain id of the Osmosis chain you want to use."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("strong",{parentName:"strong"},"NOTE")),": The ",(0,a.kt)("inlineCode",{parentName:"p"},"chain-id")," in the following example is the one of the\nOsmosis testnet chain.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"NEXT_PUBLIC_OSMOSIS_CHAIN_ID_BASE=osmo-test-5\n")),(0,a.kt)("h3",{id:"osmosis_chain_name_base"},"OSMOSIS_CHAIN_NAME_BASE"),(0,a.kt)("p",null,"This is the chain name of the Osmosis chain you want to use."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("strong",{parentName:"strong"},"NOTE")),": The ",(0,a.kt)("inlineCode",{parentName:"p"},"chain-name")," in the following example is the one of the\nOsmosis testnet chain.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"NEXT_PUBLIC_OSMOSIS_CHAIN_NAME_BASE=osmosistestnet\n")),(0,a.kt)("h2",{id:"optional"},"Optional"),(0,a.kt)("p",null,"The following parameters could be set to overwrite the default values set by\n",(0,a.kt)("em",{parentName:"p"},"cosmos-kit"),". If you do not want to overwrite them, simply comment or discard\nthe following lines."),(0,a.kt)("h3",{id:"osmosis_rpc"},"OSMOSIS_RPC"),(0,a.kt)("p",null,"This is the Osmosis chain ",(0,a.kt)("strong",{parentName:"p"},"RPC")," url you want to override to the default\nendpoint used by ",(0,a.kt)("em",{parentName:"p"},"cosmos-kit"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"NEXT_PUBLIC_OSMOSIS_RPC=\n")),(0,a.kt)("h3",{id:"osmosis_rest"},"OSMOSIS_REST"),(0,a.kt)("p",null,"This is the Osmosis chain ",(0,a.kt)("strong",{parentName:"p"},"LCD")," url you want to override to the default\nendpoint used by ",(0,a.kt)("em",{parentName:"p"},"cosmos-kit"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"NEXT_PUBLIC_OSMOSIS_REST=\n")),(0,a.kt)("h2",{id:"useful-information"},"Useful Information"),(0,a.kt)("p",null,"The following table resume the information for the Osmosis ",(0,a.kt)("em",{parentName:"p"},"mainnet")," and\n",(0,a.kt)("em",{parentName:"p"},"testnet")," at the time of writing. To get deeper information, you can give a\nlook at the\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/chain-registry/"},"cosmos/chain-registry")," repository."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Osmosis Testnet (osmo-test-5)"),(0,a.kt)("th",{parentName:"tr",align:null},"Osmosis Mainnet"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Chain ID"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"osmo-test-5")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"osmosis-1"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Chain Name"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"osmosistestnet")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"osmosis"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"RPC"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"https://rpc.testnet.osmosis.zone:443"},"https://rpc.testnet.osmosis.zone:443")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"https://rpc.osmosis.zone"},"https://rpc.osmosis.zone"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"LCD"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"https://lcd.testnet.osmosis.zone"},"https://lcd.testnet.osmosis.zone")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"https://lcd.osmosis.zone"},"https://lcd.osmosis.zone"))))))}c.isMDXComponent=!0}}]);