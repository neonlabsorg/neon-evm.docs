---
title: ERC-20 For SPL Mintable
proofedDate: 20240509
iterationBy: na
includedInSite: false
approvedBy: na
comments:
---

## Introduction

This page provides information on the ERC-20 for SPL Mintable interface contract, which grants access to deploy a new SPL Token on Solana and its corresponding ERC-20 standard interface.(https://eips.ethereum.org/EIPS/eip-20).

This standard allows Solana liquidity to be available to EVM bytecode contracts (Solidity, Vyper, etc.), i.e. this ERC-20 for SPL Mintable interface allows Ethereum wallets such as MetaMask to transact with the newly deployed SPL tokens and can be transferred between Neon EVM and Solana externally owned accounts.

| Location | ERC-20 for SPL Mintable Factory Contract address |
| :------- | :----------------------------------------------- |
| Devnet   | 0x...                                            |
| Mainnet  | 0x...                                            |

:::info

1. ERC-20 for SPL Mintable interface contracts also give access to mint the SPL Token by the token owner when deploying the SPL Token via this factory contract, in addition to getting access to the token data from Solana.
2. To be able to use an SPL token from a Solana account balance, it must be transferred to a Neon EVM account via [NeonPass](https://neonpass.live/).

:::

## Contracts

All the contracts can be found in the [official Github repository](https://github.com/neonlabsorg/neon-contracts/tree/main/ERC20ForSPL/contracts).

### ERC20ForSPLBackbone.sol

This contract serves as a backbone for ERC20ForSPLMintable smart contract. ERC20ForSPLBackbone contains the core logic for ERC20ForSPLMintable standard. The functions of this contracts are described [here](docs/developing/standards/erc20forspl.md)

### ERC20ForSPLMintable.sol

This contract serves as an interface to the new SPLToken to be deployed on Solana. Through this interface, Ethereum-like address on Neon EVM chain can apply changes on SPLToken account on Solana. This contract is used as a BeaconProxy implementation. The Beacon is defined and inherited from `ERC20ForSPLBackbone.sol` at storage slot 0.

**Functions:**

| initialize(string memory \_name, string memory \_symbol, string memory \_uri, uint8 \_decimals, address \_owner) |
| :--------------------------------------------------------------------------------------------------------------- |
| This public function is used by the OpenZeppelin's UUPS library that mimics the functionality of a constructor.  |

| findMintAccount() -> bytes32                                                   |
| :----------------------------------------------------------------------------- |
| This public function returns the Solana address of the newly minted SPL Token. |

| mint(address to, uint256 amount)                                   |
| :----------------------------------------------------------------- |
| This public function mints new SPL Token directly on Solana chain. |

| \_initialize(string memory \_name, string memory \_symbol, string memory \_uri, uint8 \_decimals) -> bytes32                             |
| :--------------------------------------------------------------------------------------------------------------------------------------- |
| This private function deploys the new SPL Token on Solana and sets up the metadata ( name & symbol ) in the Metaplex protocol on Solana. |

### ERC20ForSPLMintableFactory.sol

This contract serves as a factory to deploy SPL Token on Solana together with interface contract on Neon EVM. This contract is built with forked OpenZeppelin's UUPS standard and it is a Beacon contract.

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

| \_setImplementation(address newImplementation)                                  |
| :------------------------------------------------------------------------------ |
| This private function sets the implementation contract address for this beacon. |

| deploy(string memory \_name, string memory \_symbol, string memory \_uri, uint8 \_decimals) -> bytes32, address                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| This external function deploys a new ERC20ForSPLMintable's BeaconProxy instance and returns the SPL Token account address and the corresponding ERC-20 interface address. |

## Deployment of the contracts

### Deploying ERC20ForSPLMintable standard and the factory contract

The contracts `ERC20ForSPLBackbone.sol`, `ERC20ForSPLMintable.sol` and `ERC20ForSPLMintableFactory.sol` are deployed using this [deploy script](https://github.com/neonlabsorg/neon-contracts/blob/main/ERC20ForSPL/scripts/deployERC20ForSPLMintableFactory.js). The owner of these contracts is **Neon DAO** and only only Neon DAO has the rights to change/update the code if needed. The ERC-20 mintable token proxies that are deployed using the factory addresses (for Devnet and Mainnet) mentioned in this document are accepted to be included in the NeonPass.

### Deploying an ERC-20 for SPL Mintable interface contract using the deployed factory contract

To deploy an ERC-20 for SPL Mintable BeaconProxy instance, this [deploy script](https://github.com/neonlabsorg/neon-contracts/blob/main/ERC20ForSPL/scripts/deployERC20ForSPLMintableThruFactory.js) can be used with the following changes -

1. Add the ERC20ForSPLFactory address to `ERC20ForSPLFactoryAddress` variable.
2. Add your own token specifications to the `ERC20ForSPLFactoryInstance.deploy()` function.
