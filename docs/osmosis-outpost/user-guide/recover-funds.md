---
sidebar_position: 2
sidebar_label: Recover funds
description: How to recover funds if the swap fails.
---

# How to recover funds

Even if the user interface allows to swap tokens with a very low effort, the 
swap process involves *several steps and actors*, like **IBC transactions**, 
**smart contract executions**. In such a context, it is reasonable that some
steps could fail. Obviously, even if any of the steps fail, the funds are not
lost. More specifically, *until the tokens are not swapped*, if any step fails,
the **tokens remains on your original wallet**; *once they are swapped*, if any
step fails, the **tokens are guarded by the smart contract**. In this case, you
can recover them in your recovery address *also through the user interface*.

### 1. Access the recovery screen

Assuming you have token to recover associated to the wallet you are currently 
using, to **recover** such tokens guarded by the smart contract, the fist step
is to *click on the "Recover Funds" button* available on the page (on the top 
left).

![Recover funds image](/img/user-guide/recover-funds/recover-funds.jpg "recover the funds")

### 2. Proceed with recover

At this point, you can see a list with the funds which needs to be recovered.
From this page, you can complete the recovery request by clicking on the 
"Recover Funds" button and confirm the transaction through your wallet. Now you
need to wait for the whole process to be completed (*transactions broadcasted* 
to the networks and *smart contract executed*) and... then you're done!

![Recover the tokens image](/img/user-guide/recover-funds/recover.jpg "recover the funds")
