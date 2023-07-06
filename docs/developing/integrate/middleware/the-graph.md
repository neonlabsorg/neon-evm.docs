---
title: The Graph
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: original item https://medium.com/neon-labs/the-graph-on-neon-evm-enabling-efficient-on-chain-dapp-data-querying-d5c73e3c6bb1
---

*This page outlines the steps for creating a subgraph for The Graph*

<!-- Prerequisites -- what are they?! 

Truffle?
Docker compose?

-->


## Introduction

To extract, process, and store data from a dApp contract on Neon EVM using The Graph protocol, you must deploy a dedicated subgraph to a Graph node. 

:::info
Subgraphs map 1:1 with a dApp to provide Graph nodes with the information and logic needed to:
- Observe the blockchain for log events of smart contacts
- Translate the events into entities for storage

:::

This tutorial uses a simple solidity smart contract called Gravity.sol. You can find the truffle project files [here](https://github.com/neonlabsorg/examples/tree/main/the-graph-integration).

Lets take a look at the contract we will use, paying particular attention to the events that it emits. Next we will consider the subgraph that listens to these events.

## Gravity.sol overview

Gravity.sol is a smart contract that links a blockchain address with a path to an image. It allows users to set avatars to their Ethereum/Neon EVM address. Each of these avatars are known as Gravatars. Gravatars include information such as owner, displayName, and imageUrl. The relationship between Gravatars and specific blockchain addresses are stored in an array.

Within Gravity.sol there are four functions that allow users to create, update, and retrieve Gravatars:

- `createGravatar`: on creation, `NewGravatar` event is emitted
- `getGravatar`
- `updateGravatarName`: on update, `UpdatedGravatar` event is emitted
- `updateGravatarImage`: on update, `UpdatedGravatar` event is emitted


## Subgraph overview

We need to create a subgraph to source data from Gravity.sol that will constantly observe the blockchain using Neon RPCs for the `NewGravatar` and `UpdatedGravatar` events. When one of these events is detected, the Graph node will extract the event log data and begin to process the information using a WebAssembly script defined in the subgraph.

The script uses a GraphQL schema file in the subgraph to produce records, called entities, that represent metadata related to the recently created or updated Gravatar. These entities are stored on a database so they may be queried by API requests.

A subgraph is created using three main components: 
- Subgraph manifest
- GraphQL schema
- AssemblyScript mapping file

### Subgraph manifest

The subgraph manifest is defined by the subgraph.yaml file. The manifest defines the smart contract(s) the subgraph will index, what type of events the target smart contract(s) will emit, and how to convert event data into entities that the Graph Node processes and stores for querying.

The manifest contains the following key items (copied verbatim from the official Graph documentation):

    description: a human-readable description of what the subgraph is. This description is displayed by the Graph Explorer when the subgraph is deployed to the Hosted Service;
    repository: the URL of the repository where the subgraph manifest can be found. This is also displayed by The Graph Explorer;
    features: a list of all used feature names;
    dataSources.source: the address of the smart contract the subgraph sources, and the ABI of the smart contract to use. The address is optional; omitting it allows to index matching events from all contracts;
    dataSources.source.startBlock: the optional number of the block that the data source starts indexing from. In most cases, we suggest using the block in which the contract was created;
    dataSources.mapping.entities: the entities that the data source writes to the store. The schema for each entity is defined in the schema.graphql file;
    dataSources.mapping.abis: one or more named ABI files for the source contract as well as any other smart contracts that you interact with from within the mappings;
    dataSources.mapping.eventHandlers: lists the smart contract events this subgraph reacts to and the handlers in the mapping — ./src/mapping.ts in the example — that transform these events into entities in the store;
    dataSources.mapping.callHandlers: lists the smart contract functions this subgraph reacts to and handlers in the mapping that transform the inputs and outputs to function calls into entities in the store;
    dataSources.mapping.blockHandlers: lists the blocks this subgraph reacts to and handlers in the mapping to run when a block is appended to the chain. Without a filter, the block handler will be run every block. An optional call-filter can be provided by adding a filter field with kind: call to the handler. This will only run the handler if the block contains at least one call to the data source contract;

From the above manifest items, the dataSources.mapping.abis is particularly important. The ABI file is the JSON file created when a solidity contract is compiled. The ABI contains information on functions in the smart contract and types of events that will be emitted.

Two ways to gather ABI files for your subgraph manifest (on Neon EVM) are as follows:

    If you’re developing a subgraph for your own project, you will have the necessary ABI files when you compile your smart contracts.
    If you’re developing a subgraph for an existing public project, you will need to download the project’s smart contract(s) and compile them using truffle to retrieve the ABI files.

Not mentioned above is the dataSources.networking item. This item is important for deploying subgraphs on Neon EVM. In our example we have it set to “neonlabs.” The manifest file will pull the “neonlabs” network configurations from the Gravity.sol truffle project’s truffle.js file. The truffle.js file is used by truffle framework to deploy smart contracts to different networks. The truffle.js file in our example also contains the private keys for 3 local addresses that we will associate with Gravatars in our walkthrough.

See below for an image of the truffle.js file:

The subgraph for Gravity.sol only queries one smart contract but subgraphs can query from multiple smart contracts. If you want to query multiple smart contracts, add each contract to the dataSources array.

See the below subgraph.yaml file for our Gravity.sol example:
GraphQL Schema

The GraphQL Schema is defined by the schema.graphql file. The schema defines the type of information to be gathered from smart contract events and how to query the data using GraphQL. In the case of Gravity.sol, each time the Graph Node detects the NewGravatar and UpdatedGravatar events, an entity is created or updated according to the schema.graphql.

Take a look below at the GraphQL Schema for Gravity.sol:
AssemblyScript Mappings

The AssemblyScript Mapping file contains the logic used to convert event data into entities defined by the schema.graphql file. In our example the mapping file is called mapping.ts. The mapping.ts file is compiled into WebAssembly and uploaded to the Graph Node.

A function needs to be created in the mapping.ts file for each event handler defined in the subgraph.yaml file. In the case of our example, a function needs to be created for both the NewGravatar and UpdatedGravatar events. The functions need to accept a parameter called ‘event’ with a ‘type’ related to the event handled.

See the mapping.ts file for the Gravity.sol subgraph below:
Deploying a Subgraph

When you have finished creating the subgraph manifest, the subgraph’s GraphQL schema, and the AssemblyScript Mapping file, you’re ready to deploy the subgraph.

In our example with Gravity.sol, we need first to deploy our smart contract Step one is to navigate to our truffle project directory and run a local environment with command line using: docker-compose up -d

Step two, run the command to drop Neon tokens to the accounts in the local environment you wish to associate with Gravatars. These are the accounts we defined in the truffle.js file.

Step three, compile and deploy smart contract for Gravity.sol using truffle using the command below.

The above command will run the files in the migrations/ directory.

Add “Account address” shown in the output to the dataSources.source.address field in the subgraph.yaml manifest file.

The successful deployment of our Gravity.sol smart contract will also result in the creation of three Gravatars as defined in the 2_create_gravatars.js file of our truffle project:

Once our environment is set up and our Gravity.sol smart contract is deployed, we can launch our subgraph to our local Graph Node. To deploy the subgraph, we’ll use two scripts defined in our package.json file called “create-local” and “deploy-local.” Run them in sequence using command line as shown below:

Upon successful deployment we should see the following two links in command line under Queries (HTTP) and Subscriptions (WS):

The first link directs to a Graph QL web interface pointed at the local Graph node. Using this interface, we can query Neon EVM for the data of the three Gravatars created earlier.
Conclusion

As the Neon ecosystem expands, The Graph will play a crucial role in providing data accessibility. As such, Neon Labs will be running a Graph Node to support the availability of information on Neon EVM. Anyone will be able to create subgraphs for existing dApps or new dApps they’re developing to decentralize the ownership of on-chain data.

We hope you found this article helpful. For more details and additional guidance check out the official Graph documentation here.