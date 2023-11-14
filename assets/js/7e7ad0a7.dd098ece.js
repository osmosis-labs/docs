"use strict";(self.webpackChunkosmosis_docs=self.webpackChunkosmosis_docs||[]).push([[6922],{3905:(e,t,i)=>{i.d(t,{Zo:()=>c,kt:()=>h});var n=i(67294);function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){a(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function s(e,t){if(null==e)return{};var i,n,a=function(e,t){if(null==e)return{};var i,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),i=t;return e&&(i="function"==typeof e?e(t):r(r({},t),e)),i},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var i=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(i),h=a,m=u["".concat(l,".").concat(h)]||u[h]||d[h]||o;return i?n.createElement(m,r(r({ref:t},c),{},{components:i})):n.createElement(m,r({ref:t},c))}));function h(e,t){var i=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=i.length,r=new Array(o);r[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var p=2;p<o;p++)r[p]=i[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,i)}u.displayName="MDXCreateElement"},24337:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=i(87462),a=(i(67294),i(3905));const o={sidebar_position:3},r="Concentrated Liquidity",s={unversionedId:"integrate/Concentrated Liquidity/README",id:"integrate/Concentrated Liquidity/README",title:"Concentrated Liquidity",description:"Index",source:"@site/docs/overview/integrate/Concentrated Liquidity/README.md",sourceDirName:"integrate/Concentrated Liquidity",slug:"/integrate/Concentrated Liquidity/",permalink:"/overview/integrate/Concentrated Liquidity/",draft:!1,editUrl:"https://github.com/osmosis-labs/docs/tree/main/docs/overview/integrate/Concentrated Liquidity/README.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Airdrop Distribution",permalink:"/overview/integrate/airdrops"},next:{title:"Overview",permalink:"/overview/integrate/Concentrated Liquidity/overview"}},l={},p=[{value:"Index",id:"index",level:2},{value:"Background",id:"background",level:2},{value:"Our Implementation",id:"our-implementation",level:2},{value:"Incentive Creation and Querying",id:"incentive-creation-and-querying",level:3},{value:"Reward Splitting Between Classic and CL pools",id:"reward-splitting-between-classic-and-cl-pools",level:3},{value:"TWAP Integration",id:"twap-integration",level:2},{value:"Precision Issues With Price",id:"precision-issues-with-price",level:2},{value:"Solution",id:"solution",level:3},{value:"Terminology",id:"terminology",level:2},{value:"External Sources",id:"external-sources",level:2}],c={toc:p};function d(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"concentrated-liquidity"},"Concentrated Liquidity"),(0,a.kt)("h2",{id:"index"},"Index"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#concentrated-liquidity"},"Concentrated Liquidity"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#background"},"Background")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#notable-features"},"Notable Features")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#our-implementation"},"Our Implementation"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#Incentive-Creation-and-Querying"},"Incentives")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#Reward-Splitting-Between-Classic-and-CL-pools"},"Reward Splitting Between Classic and CL pools")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#twap-integration"},"TWAP Integration")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#precision-issues-with-price"},"Precision Issues With Price"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#solution"},"Solution")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#terminology"},"Terminology")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#external-sources"},"External Sources"))),(0,a.kt)("h2",{id:"background"},"Background"),(0,a.kt)("p",null,"Concentrated liquidity is a novel Automated Market Maker (AMM) design introduced\nby Uniswap that allows for more efficient use of capital. The improvement is\nachieved by providing liquidity in specific price ranges chosen by the user."),(0,a.kt)("p",null,"For instance, a pool with stablecoin pairs like USDC/USDT has a spot price that\nshould always be trading near 1. As a result, Liquidity Providers (LPs) can\nfocus their capital in a small range around 1, rather than the full range from 0\nto infinity. This approach leads to an average of 200-300x higher capital\nefficiency. Moreover, traders benefit from lower price impact because the pool\nincentivizes greater depth around the current price."),(0,a.kt)("p",null,"Concentrated liquidity also opens up new opportunities for providing liquidity\nrewards to desired strategies. For example, it's possible to incentivize LPs\nbased on their position's proximity to the current price and the time spent\nwithin that position. This design also allows for a new \"range order\" type,\nsimilar to a limit order with order-books."),(0,a.kt)("p",null,"For comprehensive technical information, we highly recommend reading the complete README of concentrated liquidity, available at ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/osmosis-labs/osmosis/blob/main/x/concentrated-liquidity/README.md"},"https://github.com/osmosis-labs/osmosis/blob/main/x/concentrated-liquidity/README.md")),(0,a.kt)("h2",{id:"our-implementation"},"Our Implementation"),(0,a.kt)("p",null,"At launch, Osmosis's CL incentives will primarily be in the format described ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/osmosis-labs/osmosis/blob/main/x/concentrated-liquidity/README.md"},"here"),' while we iron out a mechanism that achieves the remaining two properties predictably and effectively. As a piece of foreshadowing, the primary problem space we will be tackling is the following: status quo incentives advantage LPs who keep their liquidity off the books until a trade happens, ultimately pushing liquidity off of the DEX and creating ambiguity around the "real" liquidity depth. This forces traders to make uninformed decisions about where to trade their assets (or worse, accept worse execution on an inferior venue).'),(0,a.kt)("p",null,"In other words, instead of having incentives go towards bootstrapping healthy liquidity pools, they risk going towards adversely pushing volume to other exchanges at the cost of the DEX, active LPs, and ultimately traders."),(0,a.kt)("p",null,"Note on supported and authorized uptimes\nIf you dig through our incentives logic, you might find code dealing with notions of Supported Uptimes and Authorized Uptimes. These are for an uptime incentivization mechanism we are keeping off at launch while we refine a more sophisticated version. We leave the state-related parts in core logic to ensure that if we do decide to turn the feature on (even if just to experiment), it could be done by a simple governance proposal (to add more supported uptimes to the list of authorized uptimes) and not require a state migration for pools. At launch, only the 1ns uptime will be authorized, which is roughly equivalent to status quo CL incentives with the small difference that positions that are created and closed in the same block are not eligible for any incentives."),(0,a.kt)("p",null,"For the sake of clarity, this mechanism functions very similarly to status quo incentives, but it has a separate accumulator for each supported uptime and ensures that only liquidity that has been in the pool for the required amount of time qualifies for claiming incentives."),(0,a.kt)("h3",{id:"incentive-creation-and-querying"},"Incentive Creation and Querying"),(0,a.kt)("p",null,"While it is technically possible for Osmosis to enable the creation of incentive records directly in the CL module, incentive creation is currently funneled through existing gauge infrastructure in the ",(0,a.kt)("inlineCode",{parentName:"p"},"x/incentives")," module. This simplifies UX drastically for frontends, external incentive creators, and governance, while making CL incentives fully backwards-compatible with incentive creation and querying flows that everyone is already used to. As of the initial version of Osmosis's CL, all incentive creation and querying logic will be handled by respective gauge functions (e.g. the ",(0,a.kt)("inlineCode",{parentName:"p"},"IncentivizedPools")," query in the ",(0,a.kt)("inlineCode",{parentName:"p"},"x/incentives")," module will include CL pools that have internal incentives on them)."),(0,a.kt)("p",null,"To create a gauge dedicated to the concentrated liquidity pool, run a ",(0,a.kt)("inlineCode",{parentName:"p"},"MsgCreateGauge")," message in the ",(0,a.kt)("inlineCode",{parentName:"p"},"x/incentives")," module with the following parameter constraints:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"PoolId"),": The ID of the CL pool to create a gauge for."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"DistrTo.LockQueryType")," must be set to ",(0,a.kt)("inlineCode",{parentName:"li"},"locktypes.LockQueryType.NoLock")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"DistrTo.Denom")," must be an empty string.")),(0,a.kt)("p",null,"The rest of the parameters can be set according to the desired configuration of the gauge. Please read the ",(0,a.kt)("inlineCode",{parentName:"p"},"x/incentives")," module documentation for more information on how to configure gauges."),(0,a.kt)("p",null,"Note, that the created gauge will start emitting at the first epoch after the given ",(0,a.kt)("inlineCode",{parentName:"p"},"StartTime"),". During the epoch, a ",(0,a.kt)("inlineCode",{parentName:"p"},"x/concentrated-liquidity"),"\nmodule ",(0,a.kt)("inlineCode",{parentName:"p"},"IncentiveRecord")," will be created for every denom in the gauge. This incentive record will be configured to emit all given incentives\nover the period of an epoch. If the gauge is non-perpetual (emits over several epochs), the distribution will be split evenly between the epochs.\nand a new ",(0,a.kt)("inlineCode",{parentName:"p"},"IncentiveRecord")," will be created for each denom every epoch with the emission rate and token set to finish emitting at the end of the epoch."),(0,a.kt)("h3",{id:"reward-splitting-between-classic-and-cl-pools"},"Reward Splitting Between Classic and CL pools"),(0,a.kt)("p",null,"While we want to nudge Classic pool LPs to transition to CL pools, we also want to ensure that we do not have a hard cutoff for incentives where past a certain point it is no longer worth it to provide liquidity to Classic pools. This is because we want to ensure that we have a healthy transition period where liquidity is not split between Classic and CL pools, but rather that liquidity is added to CL pools while Classic pools are slowly drained of liquidity."),(0,a.kt)("p",null,"To achieve this in a way that is difficult to game and efficient for the chain to process, we will be using a ",(0,a.kt)("strong",{parentName:"p"},"reward-splitting")," mechanism that treats ",(0,a.kt)("em",{parentName:"p"},"bonded")," liquidity in a Classic pool that is paired by governance to a CL pool (e.g. for the purpose of migration) as a single full-range position on the CL pool for the purpose of calculating incentives. Note that this ",(0,a.kt)("em",{parentName:"p"},"does not affect spread reward distribution")," and only applies to the flow of incentives through a CL pool."),(0,a.kt)("p",null,"One implication of this mechanism is that it moves the incentivization process to a higher level of abstraction (incentivizing ",(0,a.kt)("em",{parentName:"p"},"pairs")," instead of ",(0,a.kt)("em",{parentName:"p"},"pools"),"). For internal incentives (which are governance managed), this is in line with the goal of continuing to push governance to require less frequent actions, which this change ultimately does."),(0,a.kt)("p",null,"To keep a small but meaningful incentive for LPs to still migrate their positions, we have added a ",(0,a.kt)("strong",{parentName:"p"},"discount rate")," to incentives that are redirected to Classic pools. This is initialized to 5% by default but is a governance-upgradable parameter that can be increased in the future. A discount rate of 100% is functionally equivalent to all the incentives staying in the CL pool."),(0,a.kt)("h2",{id:"twap-integration"},"TWAP Integration"),(0,a.kt)("p",null,"In the context of twap, concentrated liquidity pools function differently from\nCFMM pools."),(0,a.kt)("p",null,"There are 2 major differences that stem from how the liquidity is added and\nremoved in concentrated-liquidity."),(0,a.kt)("p",null,"The first one is given by the fact that a user does not provide liquidity at\npool creation time. Instead, they have to issue a separate message post-pool\ncreation. As a result, there can be a time where there is no valid spot price\ninitialized for a concentrated liquidity pool. When a concentrated liquidity pool\nis created, the ",(0,a.kt)("inlineCode",{parentName:"p"},"x/twap"),' module still initializes the twap records. However, these\nrecords are invalidated by setting the "last error time" field to the block time\nat pool creation. Only adding liquidity to the pool will initialize the spot price\nand twap records correctly. One technical detail to note is that adding liquidity\nin the same block as pool creation will still set the "last error time" field to\nthe block time despite spot price already being initialized. Although we fix an\nerror within that block, it still occurs. As a result, this is deemed acceptable.\nHowever, this is a technical trade-off for implementation simplicity and not an\nintentional design decision.'),(0,a.kt)("p",null,"The second difference from balancer pools is focused around the fact that\nliquidity can be completely removed from a concentrated liquidity pool,\nmaking its spot price be invalid."),(0,a.kt)("p",null,"To recap the basic LP functionality in concentrated liquidity, a user adds\nliqudity by creating a position. To remove liquidity, they withdraw their\nposition. Contrary to CFMM pools, adding or removing liquidity does not affect\nthe price in 99% of the cases in concentrated liquidity. The only two exceptions\nto this rule are:"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Creating the first position in the pool.")),(0,a.kt)("p",null,"In this case, we transition from invalid state where there is no liqudity, and\nthe spot price is uninitialized to the state where there is some liqudity, and\nas a result a valid spot price."),(0,a.kt)("p",null,"Note, that if there is a pool where liqudiity is completely drained and re-added,\nthe TWAP's last error time will be pointing at the time when the liquidity was drained.\nThis is different from how twap functions in CFMM pool where liquidity cannot\nbe removed in-full."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Removing the last position in the pool.")),(0,a.kt)("p",null,"In this case, we transition from a valid state with liquidity and spot price to\nan invalid state where there is no liquidity and, as a result, no valid spot\nprice anymore. The last spot price error will be set to the block time of when\nthe last position was removed."),(0,a.kt)("p",null,"To reiterate, the above two exceptions are the only cases where twap is updated\ndue to adding or removing liquidity."),(0,a.kt)("p",null,"The major source of updates with respect to twap is the swap logic. It functions\nsimilarly to CFMM pools where upon the completion of a swap, a listener ",(0,a.kt)("inlineCode",{parentName:"p"},"AfterConcentratedPoolSwap"),"\npropagates the execution to the twap module for the purposes of tracking state updates\nnecessary to retrieve the spot price and update the twap accumulators\n(more details in x/twap module)."),(0,a.kt)("p",null,'Lastly, see the "Listeners" section for more details on how twap is enabled by\nthe use of these hooks.'),(0,a.kt)("h2",{id:"precision-issues-with-price"},"Precision Issues With Price"),(0,a.kt)("p",null,"There are precision issues that we must be considerate of in our design."),(0,a.kt)("p",null,"Consider the balancer pool between ",(0,a.kt)("inlineCode",{parentName:"p"},"arb")," base unit and ",(0,a.kt)("inlineCode",{parentName:"p"},"uosmo"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'osmosisd q gamm pool 1011\npool:\n  \'@type\': /osmosis.gamm.v1beta1.Pool\n  address: osmo1pv6ffw8whyle2nyxhh8re44k4mu4smqd7fd66cu2y8gftw3473csxft8y5\n  future_pool_governor: 24h\n  id: "1011"\n  pool_assets:\n  - token:\n      amount: "101170077995723619690981"\n      denom: ibc/10E5E5B06D78FFBB61FD9F89209DEE5FD4446ED0550CBB8E3747DA79E10D9DC6\n    weight: "536870912000000"\n  - token:\n      amount: "218023341414"\n      denom: uosmo\n    weight: "536870912000000"\n  pool_params:\n    exit_fee: "0.000000000000000000"\n    smooth_weight_change_params: null\n    swap_fee: "0.002000000000000000"\n  total_shares:\n    amount: "18282469846754434906194"\n    denom: gamm/pool/1011\n  total_weight: "1073741824000000"\n')),(0,a.kt)("p",null,"Let's say we want to migrate this into a CL pool where ",(0,a.kt)("inlineCode",{parentName:"p"},"uosmo")," is the quote\nasset and ",(0,a.kt)("inlineCode",{parentName:"p"},"arb")," base unit is the base asset."),(0,a.kt)("p",null,"Note that quote asset is denom1 and base asset is denom0.\nWe want quote asset to be ",(0,a.kt)("inlineCode",{parentName:"p"},"uosmo")," so that limit orders on ticks\nhave tick spacing in terms of ",(0,a.kt)("inlineCode",{parentName:"p"},"uosmo")," as the quote."),(0,a.kt)("p",null,"Note:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"OSMO has precision of 6. 1 OSMO = 10**6 ",(0,a.kt)("inlineCode",{parentName:"li"},"uosmo")),(0,a.kt)("li",{parentName:"ul"},"ARB has precision of 18. 1 ARB = 10**18 ",(0,a.kt)("inlineCode",{parentName:"li"},"arb")," base unit")),(0,a.kt)("p",null,"Therefore, the true price of the pool is:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},">>> (218023341414 / 10**6)  / (101170077995723619690981 / 10**18)\n2.1550180224553714\n")),(0,a.kt)("p",null,"However, in our core logic it is represented as:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"218023341414 / 101170077995723619690981\n2.1550180224553714e-12\n")),(0,a.kt)("p",null,"or"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'osmosisd q gamm spot-price 1011 uosmo ibc/10E5E5B06D78FFBB61FD9F89209DEE5FD4446ED0550CBB8E3747DA79E10D9DC6\nspot_price: "0.000000000002155018"\n')),(0,a.kt)("p",null,"As a protocol, we need to accomodate prices that are very far apart.\nIn the example above, the difference between ",(0,a.kt)("inlineCode",{parentName:"p"},"10**6 and 10**18")),(0,a.kt)("p",null,"Most of the native precision is 10",(0,a.kt)("strong",{parentName:"p"},"6. However, most of the ETH\nprecision is 10"),"18."),(0,a.kt)("p",null,"This starts to matter for assets such as ",(0,a.kt)("inlineCode",{parentName:"p"},"upepe"),". That have\na precision of 18 and a very low price level relative to\nthe quote asset that has precision of 6 (e.g ",(0,a.kt)("inlineCode",{parentName:"p"},"uosmo")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"uusdc"),")."),(0,a.kt)("p",null,"The true price of PEPE in USDC terms is ",(0,a.kt)("inlineCode",{parentName:"p"},"0.0000009749"),"."),(0,a.kt)("p",null,'In the "on-chain representation", this would be:\n',(0,a.kt)("inlineCode",{parentName:"p"},"0.0000009749 * 10**6 / 10**18 = 9.749e-19")),(0,a.kt)("p",null,"Note that this is below the minimum precision of ",(0,a.kt)("inlineCode",{parentName:"p"},"sdk.Dec"),"."),(0,a.kt)("p",null,"Additionally, there is a problem with tick to sqrt price conversions\nwhere at small price levels, two sqrt prices can map to the same\ntick."),(0,a.kt)("p",null,"As a workaround, we have decided to limit min spot price to 10^-12\nand min tick to ",(0,a.kt)("inlineCode",{parentName:"p"},"-108000000"),". It has been shown at at price levels\nbelow 10^-12, this issue is most apparent. See this issue for details:\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/osmosis-labs/osmosis/issues/5550"},"https://github.com/osmosis-labs/osmosis/issues/5550")),(0,a.kt)("p",null,"Now, we have a problem that we cannot handle pairs where\nthe quote asset has a precision of 6 and the base asset has a\nprecision of 18."),(0,a.kt)("p",null,"Note that this is not a problem for pairs where the quote asset\nhas a precision of 18 and the base asset has a precision of 6.\nE.g. OSMO/DAI."),(0,a.kt)("h3",{id:"solution"},"Solution"),(0,a.kt)("p",null,"At launch, pool creation is permissioned. Therefore, we can\nensure correctness for the initial set of pools."),(0,a.kt)("p",null,"Long term, we will implement a wrapper contract around concentrated liquidity\nthat will handle the precision issues and scale the prices to all have a precision of at most 12."),(0,a.kt)("p",null,"The contract will have to handle truncation and rounding to determine\nhow to handle dust during this process. The truncated amount can be significant.\nThat being said, this problem is out of scope for this document."),(0,a.kt)("h2",{id:"terminology"},"Terminology"),(0,a.kt)("p",null,"We will use the following terms throughout the document and our codebase:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Tick")," - a unit that has a 1:1 mapping with price")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Bucket")," - an area between two initialized ticks.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Tick Range")," - a general term to describe a concept with lower and upper bound."),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Position is defined on a tick range."),(0,a.kt)("li",{parentName:"ul"},"Bucket is defined on a tick range."),(0,a.kt)("li",{parentName:"ul"},"A trader performs a swap over a tick range."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Tick Spacing")," - the distance between two ticks that can be initialized. This is\nwhat defines the minimum bucket size."))),(0,a.kt)("p",null,"Note that ticks are defined inside buckets. Assume tick spacing is 100. A liquidity provider\ncreates a position with amounts such that the current tick is 155 between ticks 100 and 200."),(0,a.kt)("p",null,"Note, that the current tick of 155 is defined inside the bucket over a range of 100 to 200."),(0,a.kt)("h2",{id:"external-sources"},"External Sources"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://uniswap.org/whitepaper-v3.pdf"},"Uniswap V3 Whitepaper")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://atiselsts.github.io/pdfs/uniswap-v3-liquidity-math.pdf"},"Technical Note on Liquidity Math"))))}d.isMDXComponent=!0}}]);