---
title: Safe
proofedDate: 20240609
iterationBy: na
includedInSite: false
approvedBy: na
comment:
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

What is Safe?

The Safe Account functions as a proxy contract, which means it forwards requests to a singleton contract. This singleton contract holds all the essential logic required for the Safe to operate. Proxy contracts are advantageous because they are typically more cost-effective to deploy and manage on public blockchains and they allow for easier upgrades. The primary purpose of the Safe proxy contract is to oversee and maintain the Safe’s state.
The term "contract state" refers to the variables (or values) associated with a specific contract. Functions and contract code are usually stored and executed as bytecode within the Neon EVM, while variables are managed separately. These variables are the values that functions change when they run. For the Safe, the singleton contract provides the functions that adjust the state variables in the proxy. This singleton contract is also called the master copy of the Safe.


## Prerequisites

- NodeJS 16.x or newer

## How to integrate Web3Auth SDK

### Step 1: Connect your wallet

1.1 Go to the [login](https://safe.neonevm.org/welcome) page and connect your wallet.

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe1.png)

</div>

1.2 1.2 Select your wallet from the available options to get started

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe2.png)

</div>

1.3 Create new Safe account

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe3.png)

</div>

1.4 Set the signer wallets

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe4.png)

</div>


1.5 Review the filled information

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe5.png)

</div>

1.6 Wait for the transaction confirmation
Accept the transaction in your initial wallet

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe6.png)

</div>

1.7 After the confirmation your account will be created

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe7.png)

</div>

1.8 Welcome page
<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe8.png)

</div>

1.9 Welcome page
Here you can see the dashboard with the
- Total asset information
- Pending transactions
- Safe Apps
- Connect & Transact information

On the left part there are sections:
1. Home
2. Assets
3. Transactions
4. Address book
5. Apps
6. Settings

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/safe9.png)
