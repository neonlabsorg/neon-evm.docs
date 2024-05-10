---
title: ERC-20 For SPL
proofedDate: 20240507
iterationBy: na
includedInSite: false
approvedBy: na
comments:
---

## Introduction

This page provides information on the ERC-20 for SPL interface contract, which grants access to Solana's native tokens, which are registered in the SPL token contract, via the ERC-20 standard interface.(https://eips.ethereum.org/EIPS/eip-20). It allows you to deploy the standard on Neon EVM for an already existing SPLToken on Solana.

This standard allows Solana liquidity to be available to EVM bytecode contracts (Solidity, Vyper, etc.), i.e. this ERC-20 for SPL interface allows Ethereum wallets such as MetaMask to transact with SPL tokens and can be transferred between Neon EVM and Solana externally owned accounts.

| Location | ERC-20 for SPL Factory Contract address |
| :------- | :-------------------------------------- |
| Devnet   | 0x...                                   |
| Mainnet  | 0x...                                   |

:::info

1. ERC-20 for SPL interface contracts can only access the SPL token data but can't give access to mint the SPL Token.
2. To be able to use an SPL token from a Solana account balance, it must be transferred to a Neon EVM account via [NeonPass](https://neonpass.live/).

:::

## Contracts

All the contracts can be found in the [official Github repository](https://github.com/neonlabsorg/neon-contracts/tree/main/ERC20ForSPL/contracts).

### ERC20ForSPLBackbone.sol

This contract serves as a backbone for ERC20ForSPL smart contract. ERC20ForSPLBackbone contains the core logic for the ERC20ForSPL standard.

This standard interacts with the following 2 predefined smart contracts on the Neon EVM chain:

- `ISPLToken(0xFf00000000000000000000000000000000000004)` - A factory protocol on Solana where all of the Solana's SPL tokens are being deployed.
- `IMetaplex(0xff00000000000000000000000000000000000005)` - A set of protocols which allows deployers to attach metadata to their deployed tokens on Solana.

**Functions:**

| name() -> string                                                                                 |
| :----------------------------------------------------------------------------------------------- |
| This public function returns the name of the SPL Token which is stored in the Metaplex protocol. |

| symbol() -> string                                                                                 |
| :------------------------------------------------------------------------------------------------- |
| This public function returns the symbol of the SPL Token which is stored in the Metaplex protocol. |

| uri() -> string                                                                                 |
| :---------------------------------------------------------------------------------------------- |
| This public function returns the URI of the SPL Token which is stored in the Metaplex protocol. |

| decimals() -> uint8                                         |
| :---------------------------------------------------------- |
| This public function returns the decimals of the SPL Token. |

| totalSupply() -> uint256                                        |
| :-------------------------------------------------------------- |
| This public function returns the total supply of the SPL Token. |

| balanceOf(address who) -> uint256                                                                                                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| This public function returns the SPL Token balance of an address. Unlike typical ERC20, the balances of ERC20ForSPL are directly stored on Solana. |

| allowance(address owner, address spender) -> uint256                         |
| :--------------------------------------------------------------------------- |
| This public function returns the allowances made to Ethereum-like addresses. |

| \_salt(address account) -> bytes32                                                    |
| :------------------------------------------------------------------------------------ |
| This internal function converts an address to uint and then converts uint to bytes32. |

| solanaAccount(address account) -> bytes32                                                         |
| :------------------------------------------------------------------------------------------------ |
| This public function returns the Solana-like address which is bound to the Ethereum-like address. |

| getAccountDelegateData(address who) -> bytes32, uint64                                                   |
| :------------------------------------------------------------------------------------------------------- |
| This public function returns the address of the delegated account and the delegated amount of the token. |

| approve(address spender, uint256 amount) -> bool                           |
| :------------------------------------------------------------------------- |
| This public function returns the boolean value for ERC20's approve method. |

| transfer(address to, uint256 amount) -> bool                                |
| :-------------------------------------------------------------------------- |
| This public function returns the boolean value for ERC20's transfer method. |

| transferFrom(address from, address to, uint256 amount) -> bool                  |
| :------------------------------------------------------------------------------ |
| This public function returns the boolean value for ERC20's transferFrom method. |

| burn(uint256 amount) -> bool                                            |
| :---------------------------------------------------------------------- |
| This public function returns the boolean value for ERC20's burn method. |

| burnFrom(address from, uint256 amount) -> bool                              |
| :-------------------------------------------------------------------------- |
| This public function returns the boolean value for ERC20's burnFrom method. |

| approveSolana(bytes32 spender, uint64 amount) -> bool                                                                                     |
| :---------------------------------------------------------------------------------------------------------------------------------------- |
| This public function returns the boolean value for making approval to a Solana-like address. These records are stored directly on Solana. |

| transferSolana(bytes32 to, uint64 amount) -> bool                                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------------- |
| This public function returns the boolean value for making transfers directly to Solana-like addresses. Balances are stored directly on Solana. |

| claim(bytes32 from, uint64 amount) -> bool                                             |
| :------------------------------------------------------------------------------------- |
| This external function returns the boolean value after calling the `claimTo` function. |

| claimTo(bytes32 from, address to, uint64 amount) -> bool                                                 |
| :------------------------------------------------------------------------------------------------------- |
| This public function returns the boolean value after initiating `transferWithSeed` instuction on Solana. |

| \_approve(address owner, address spender, uint256 amount)              |
| :--------------------------------------------------------------------- |
| This internal function stores records inside the \_allowances mapping. |

| \_spendAllowance(address owner, address spender, uint256 amount)     |
| :------------------------------------------------------------------- |
| This internal function updates the \_allowances mapping on spending. |

| \_burn(address from, uint256 amount)                               |
| :----------------------------------------------------------------- |
| This internal function burns an amount of the SPL Token on Solana. |

| \_transfer(address from, address to, uint256 amount)                   |
| :--------------------------------------------------------------------- |
| This internal function transfers an amount of the SPL Token on Solana. |

### ERC20ForSPL.sol

This contract serves as an interface contract of already deployed SPL Token on Solana. Through this interface Ethereum-like address on Neon EVM chain can apply changes on SPL Token account on Solana. This contract is used as a BeaconProxy implementation. The Beacon is defined and inherited from `ERC20ForSPLBackbone.sol` at storage slot 0.

**Functions:**

| initialize(bytes32 \_tokenMint)                                                                                 |
| :-------------------------------------------------------------------------------------------------------------- |
| This public function is used by the OpenZeppelin's UUPS library that mimics the functionality of a constructor. |

### ERC20ForSPLFactory.sol

This contract serves as a factory to deploy interface contracts of already deployed SPL Token on Solana. This contract is built with forked OpenZeppelin's UUPS standard and it is a Beacon contract.

**Functions:**

| initialize(address implementation\_)                                                                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This public function is used by the OpenZeppelin's BeaconProxy lib that mimics the functionality of a constructor. The function parameter is the address of the BeaconProxy initial implementation |

| implementation() -> address                                      |
| :--------------------------------------------------------------- |
| This public function returns the current implementation address. |

| upgradeTo(address newImplementation)                                      |
| :------------------------------------------------------------------------ |
| This public virtual function upgrades the beacon to a new implementation. |

| addAlreadyExistingERC20ForSPL(bytes32[] memory tokenMints, address[] memory alreadyExistingTokens)                                     |
| :------------------------------------------------------------------------------------------------------------------------------------- |
| This external function adds the token mint addresses and corresponding ERC-20 addresses to the `tokens` array and `tokensData` mapping |

| \_setImplementation(address newImplementation)                                  |
| :------------------------------------------------------------------------------ |
| This private function sets the implementation contract address for this beacon. |

| deploy(bytes32 tokenMint) -> address                                                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------- |
| This external function deploys a new ERC20ForSPL's BeaconProxy instance and returns the ERC-20 interface address for the SPL Token. |
