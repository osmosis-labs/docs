Notional's Validator Infrastructure Guide
Revised: March 6, 2022


Purpose
This guide is for the numerous individuals and groups that have contacted me in the past few months to try to learn the validation craft. I genuinely think that it is possible for anyone who is sufficiently motivated to validate from almost any place, very reliably.

By the end of this guide, you will have constructed a system that can fit in less than one cubic meter and satisfies the best practices that we at notional have discovered along the way.  This means that your validator should exceed 99.9% uptime, have redundant Internet, and Require minimal service. This guide treats the validator as a closed system, which we will reduce in physical size and electrical consumption over the course of time.

History


Validating at home is how we started but that’s not what we are today. Originally, at Notional we had about 85% uptime and we were based in a very small 2.6 m wide apartment in a wonderful neighborhood with great hamburgers.

Our organization now occupies a four-story office building but the server infrastructure is being purpose built so that it can fit in a closet. In fact if we followed our original designs, which were flawed, we could have as many as 20-50 validators on a single machine and it would be bad because a failure in that one machine could lead to a cascading failure of all of the validators on that machine.

We are designing fixed purpose validators that are about the size of a raspberry pie and have the necessary disc band with to validate even an active chain like osmosis with confidence. It is my personal opinion that a full validation set up which includes machines for relaying and back up power has as well as Internet redundancy, should be able to fit in a closet, a small closet even, produced minimal noise, and be approximately as reliable as validating for the data center. But this is not a natural state of affairs. Data centers have extreme redundancy with respect to electricity and internet.

This guide will not help you to get data centigrade electricity, that is outside the scope of this guide.  With that said, we recently purchased a very nice UPS system that uses lead acid batteries and will provide us with 2 to 4 hours of back up power. In our location, we never have more than about 15 minutes of electricity loss.

Electricity

You need 500w or so for two validator’s. Please note that modern CPUs use more and less electricity dependent on load and so what you want to do is exaggerates this number, you want to say that you want two kilowatts.



That box there is our back up power system. It cost $1000 and it can deliver two kilowatts for two hours.

If your electricity goes out for longer than 15 minutes at a time, please get something larger. Our device is rated for 10 kVA and just like we have exaggerated our electrical load, we have also exaggerated how long we need to supply that load for, because we are attempting to build resilient systems here and you really don’t want your power to go out. If your power goes out for long periods of time, you are either going to need a big big battery like the Tesla power wall or Hey to actually purchase a gas generator. You will need to make that call on your own, and I do want to warn you: I have personally worked with gas generators before and I absolutely hate them and that is why I don’t own one.  Not only can it poison you, it can also make your electrical systems less reliable. 

Whenever possible I do recommend that you do your back up power from a battery. Again,for two hours of battery power, no matter what the load on your system is so if you have 500 watts of load, you want to look for a device that can deliver at least one kilowatt for two hours. There are many many types of these giant batteries, which are called uninterruptible power supplies and they are frankly not very expensive so, that is the section on electricity and here is a brief summary:

If your electricity goes out for longer than 15m at a time consider a gas generator
Keep in mind that these devices can kill you and lower your overall reliability if they are installed incorrectly.
Tesla power wall seems an attractive option
Always over spec your electricity
We have 10x our current load, for 2 hours
Your HVAC should not be on backup power 
Your Internet should be on back up power


Internet access
Our biggest financial mistake so far has been the purchase of three business grade Internet lines, which proved to be no better than residential grade lines, which we had the option of using but chose to get the fancy business grade lines.  In our case, and I suspect in many areas and from many providers, there is no difference.

You want a reliable 100 Mbps and that should be able to service 20+ chains.  At our office we have three 500 Mb lines. When they work correctly, we really only need one of them but they do not always work correctly and Vietnam has some undersea cable issues, and from a practical standpoint what that means is that we use a fancy router to prevent Internet downtime. Fancy does not mean expensive, however. Just go to Alibaba, and look for routers that have Intel CPU‘s and make sure that you get one that is compatible with open MPTCP router, and then the case of the ones with Intel CPU‘s, that’s pretty much all of them.

We currently have installed:

4 4g dongles with year long unlimited data plans purchased with cash.  The “with cash” part is a censorship avoidance mechanism.
Three 500 Mb per second fiber optic lines, at a cost about $1000 per month each, however it is our teams universal observation that we could have purchased internet at 1/10th the cost.  Don’t over-spend.
When the subscriptions expire, we will change these lines to the residential version, because neither has a service level agreement, and both go down at the same time for the same reasons and seem to deliver the same bandwith

We plan to install:

Starlink 
We have paid our deposit for a star link system and should receive it in the next year. This is especially attractive because it can consume back up power and even in the event of a grid failure, we will continue to sign


Internal network configuration

Unless you are incredibly confident about your Internet service provider, you will also want to have multiple connections. I usually advise people that they get as many different types of Internet as possible. You will then use openmptcprouter to bond the connections together.

Intel atom router
Openmptcprouter.org
A vps with at least 1gbps

You can put OMR on the router using a USB stick.

After that, you will want to install a different OMR distribution on a VPS or bare metal server of your choice. It is generally my recommendation that people contact their local data center and try to host there because that is only going to serve to aggregate the different Internet connections that you have. Currently, we have seven Internet connections and we aggregate all of them, if need be. In our case, this need only arises when there are problems with undersea cables.

Normally we are on one 500mbps line.  This is best in terms of speed.  If there are issues, the aggregator comes into play.  While we have had difficulty with various aspects of our network operations, we have always been able to solve our problems with aggregation and the only reason that we recently moved offsite was the Covid virus. We are currently moving all of our systems back to our site in Hanoi.

Network summary

A single fast 4g dongle is sufficient for validation of a single chain
Fiber is best
Cable and adsl ought to be fine, too

Computing hardware

This is the spec of Notional’s osmosis validator.  It has consistently been the fastest validator on the osmosis network.  

The configuration above has worked out so well that I recommend you just copy it. I don’t recommend any modifications to this, except possibly to use a faster disk, with the stern warning that in our experience these Samsung drives are very reliable. None of our Samsung drives have failed.  The CPU above is nvme 5.0 compatible but as of now no nvme 5.0 drives have come to market.

We have had failures with nvme products from seagate and western digital.

We will soon test an Intel P5800x.

NB: the 1.6tb Intel P5800x cost us just shy of $5000 and I do not recommend using one in “my first validator”.  You can run an osmosis validator with no issues on just about any pcie 4.0 or 5.0 four lane nvme drive.

You do not need to use an anti static bracelet when building the validator.

Cost
Because of regional price differences, cost is almost certain to vary, but in order to get started with a reliable setup, here is the cost breakdown, with hardware tailored to Osmosis.

One time costs:
$1000 - computer
$1000 - backup power
$200 - Intel atom openmptcp router
$200 - four 4g dongles


Monthly costs:
$200 - internet: four 4g dongles
$200 - internet: fiber 
$100 - hosting: aggregation

All told this amounts to about $2900.

Please note that scaling this across additional chains is less expensive than the initial setup.  I recommend one separate computer per chain.

Income
Validator income can be calculated like:

(total inflation distributed to validators daily)*(votepower)*(commission) = daily income

Your mileage will vary by:
Price of coin
VotePower
Inflation parameters 

Software

I recommend anarchy Linux, which is an arch distribution that has an installer. I find it to be extremely reliable. 

I do not recommend using Ubuntu, it does not ship up-to-date software packages. If you use ubuntu, you will very likely have problems with out of date software and I will be both unable and unwilling to help.

After installing anarchy Linux, bringing your system up is relatively simple. Make sure that you choose the server installation, because you will not Need a graphical user interface on your validator.  In the notional-labs/notional repository, we have a standup script that works with arch and installs all of the software that you might need to run and monitor your validator. It is in the infrastructure folder and it’s called standup.bash.

OK so if you have gotten this far, you have a fast and reliable computer, reliable electricity, and multiple Internet lines.

You are ready to replace Osmo team red.



See the red ones?  You will replace them.  Yesterday, March 5, 53 osmosis validators did not complete the epoch block on the schedule.



delegators can reduce epoch time to less than 200 seconds by delegating only to validators in the left-hand white colored region.


I do not think that it will prove to be terribly difficult for you to offer better services and join the active set.

Most of the time Notional does not use sentry node architecture. In general, I do not recommend that others use it either. However, it is not super harmful. What it does is it adds a single half of latency between you and other places and it also makes your validator reliant on the uptime of additional machines that you do not have the same level of control over. You should choose whether or not you would like to use sentries, and I want to note that in my experience sentries create additional risk, add costs, and increase the complexity of a validating system with little clear benefit.

When your validator isn’t on a network that you personally built, under your total control, it may make sense to use sentries. Some blockchain teams also specifically request the use of sentries and our policy at notional is to defer to blockchain dev teams provided that they do not wish to take actions that can harm end users.

It is, for example, possible to configure your node so that it only makes outgoing connections, or use proxies to redirect its traffic.  We have done both at Notional and run validators like this:

100 outbound p2p connections
Private peers with other validators over a software network

You will lose all of the performance benefits of your validator if your sentry nodes are slower than your validator.  Equal spec sentries add very little delay to time sensitive events like osmosis daily epoch.  Lower spec sentries will slow down your validator, and this is specifically a cause of difficulty for the majority of osmo team red.  They are running slow sentry nodes.


Secrets

Each validator has exactly two secrets that you must not lose:

priv-validator.json for infrastructure
Validators sign blocks with this key
seed phrase for chain transactions
The seed phrase is an entropic seed that can be used to create limitless addresses. It is used to generate a private key, which yields a public key, which yeilds an address

You must protect both of these. The key file can be backed up onto an encrypted USB device.  The seed phrase should be handled per your personal preferences.

priv_validator_key.json == block signatures
seed phrase == signing tx to interact with the chain like sending money 


Ethics

As a Validator, pretty much the only time that you must not be transparent with your delegator‘s and the wider user community is when there is a security problem with the chain. When there is a security problem, you should only speak with the developers about that.

At all other times, I recommend that you practice radical transparency and accountability, meaning that if you experience a failure in any of your systems, you announce that failure to the community and describe its mitigation.  This is a practice that has enabled Notional to improve rapidly because it forces us to communicate with users and consider how to ensure that issues do not re-occur.

If you screw up, just say so.
