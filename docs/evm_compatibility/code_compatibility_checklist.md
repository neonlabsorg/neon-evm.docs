---
title: 'Code Compatibility Checklist'
proofedDate: na
iterationBy: HB
includedInSite: false
approvedBy: na
comments: na
---

## Introduction

This page details about the smart contract code compatibility factors that determines whether the smart contracts are fully compatible with Neon EVM or not.

## Smart contract compatibility factors

The following are the factors that determine the smart contract code compatibility with Neon EVM and the alternative solutions -

### Solidity Compiler version

If the contracts are not clean fork like Uniswap V2 or Aave V2 and the solidity compiler is very old i.e, < 0.8.x, it is always recommended to upgrade to latest stable solidity compiler version and re-run the tests.

### Usage of third party protocols

There shouldn't be any usage of third party protocols that are not currently supported on Neon EVM.

### Usage of `block.number` and `block.timestamp`

1. `block.timestamp` and `block.number` shouldn't be used as an array or mapping key. More details can be found [here](https://docs.neonevm.org/docs/evm_compatibility/overview#limitation-on-blocktimestamp--blocknumber-usage)

2. `block.timestamp` and `block.number` shouldn't be used as an argument in `create2`(Deterministic deployments) since deterministic addresses are calculated based on the arguments provided.

### Usage of non-reentrancy safe methods `transfer()` and `send()`

`transfer()` and `send()` are not considered as reentrancy safe methods in Neon EVM. This is described [here](https://docs.neonevm.org/docs/evm_compatibility/overview#reentrancy-safe-approaches). It is recommended to use `call()` as an alternative for native token transfers.

```sh
contract Vulnerable {
    function withdraw(uint256 amount) external {
        // This forwards 2300 gas, which may not be enough if the recipient
        // is a contract and gas costs change.
        msg.sender.transfer(amount);
    }
}

contract Fixed {
    function withdraw(uint256 amount) external {
        // This forwards all available gas. Be sure to check the return value!
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success, "Transfer failed.");
    }
}
```

### Usage of unsupported of OpCodes

There shouldn't be any usage of unsupported opcodes -

1. `gasleft()` or `gas()`
2. `block.coinbase`
3. `block.difficulty` / `block.prevrandao`
4. `block.gaslimit`
5. `block.basefee`

The details of the unsupported opcodes are described [here](https://docs.neonevm.org/docs/evm_compatibility/opcodes).

### Usage of `multicall` methods

The smart contracts having `multicall` methods that includes more than one address or migration methods to recreate state from another chain results in exceeding the 64 accounts limit. This situation can be avoided by calling these methods in batches.

### Emitting big events data

Smart contracts shouldn't emit big data through events such as array of bytes or strings or single bytes or string variable through a `multicall` method which eventually generates a big event log if there are a lot of multicall iterations.

If the data emitted by an event is too large, the transaction won't get reverted, but some of the event data won't be stored on-chain, causing some inconsistencies in the data stored.

## Support

Should you require further advice to help troubleshoot, create a ticket in the support-tickets channel in [Neon's Discord](https://discord.gg/neonevm).
