---
title: Ethereum JSON-RPC Compatibility
---

*The following tables present the full list of JSON-RPC methods. Each of them is in one of the states:*

|![done](img/done.ico)| — done|![in progress](img/inprogress.ico) | — in progress|![todo](img/todo.ico) | — to do|
|--|--|--|--|--|--|

## JSON-RPC Methods According to [Ethereum Client API](https://ethereum.org/en/developers/docs/apis/json-rpc/)


| Num | Method                                                                      | Description                                                                                                                                                   | Status                             |
|-----|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| 1   | [eth_getBlockByHash](https://playground.open-rpc.org/)                      | _Returns information about a block by hash_                                                                                                                   | ![done](img/done.ico)              |
| 2   | [eth_getBlockByNumber](https://playground.open-rpc.org/)                    | _Returns information about a block by number_                                                                                                                 | ![done](img/done.ico)              |
| 3   | [eth_getBlockTransactionCountByHash](https://playground.open-rpc.org/)      | _Returns the number of transactions in a block from a block matching the given block hash_                                                                    | ![done](img/done.ico)              |
| 4   | [eth_getBlockTransactionCountByNumber](https://playground.open-rpc.org/)    | _Returns the number of transactions in a block matching the given block number_                                                                               | ![done](img/done.ico)              |
| 5   | [eth_getUncleCountByBlockHash](https://playground.open-rpc.org/)            | _Returns the number of uncles in a block from a block matching the given block hash_                                                                          | ![todo](img/todo.ico)              |
| 6   | [eth_getUncleCountByBlockNumber](https://playground.open-rpc.org/)          | _Returns the number of uncles in a block from a block matching the given block number_                                                                        | ![todo](img/todo.ico)              |
| 7   | [eth_protocolVersion](https://playground.open-rpc.org/)                     | _Returns the current Ethereum protocol version_                                                                                                               | ![todo](img/todo.ico)              |
| 8   | [eth_chainId](https://playground.open-rpc.org/)                             | _Returns the chain ID of the current network_                                                                                                                 | ![done](img/done.ico)              |
| 9   | [eth_syncing](https://playground.open-rpc.org/)                             | _Returns an object with data about the sync status or false_                                                                                                  | ![done](img/done.ico)              |
| 10  | [eth_coinbase](https://playground.open-rpc.org/)                            | _Returns the client coinbase address_                                                                                                                         | ![todo](img/todo.ico)              |
| 11  | [eth_accounts](https://playground.open-rpc.org/)                            | _Returns a list of addresses owned by client_                                                                                                                 | ![done](img/done.ico)              |
| 12  | [eth_blockNumber](https://playground.open-rpc.org/)                         | _Returns the number of most recent block._                                                                                                                    | ![done](img/done.ico)              |
| 13  | [eth_call](https://playground.open-rpc.org/)                                | _Executes a new message call immediately without creating a transaction on the block chain_                                                                   | ![done](img/done.ico)              |
| 14  | [eth_estimateGas](https://playground.open-rpc.org/)                         | _Generates and returns an estimate of how much gas is necessary to allow the transaction to complete._                                                        | ![done](img/done.ico)              |
| 15  | [eth_gasPrice](https://playground.open-rpc.org/)                            | _Returns the current price per gas in wei_                                                                                                                    | ![done](img/done.ico)              |
| 16  | [eth_feeHistory](https://playground.open-rpc.org/)                          | _Returns fee history_                                                                                                                                         | ![todo](img/todo.ico)              |
| 17  | [eth_newFilter](https://playground.open-rpc.org/)                           | _Creates a filter object, based on filter options, to notify when the state changes (logs)_                                                                   | ![todo](img/todo.ico)              |
| 18  | [eth_newBlockFilter](https://playground.open-rpc.org/)                      | _Creates a filter in the node, to notify when a new block arrives_                                                                                            | ![todo](img/todo.ico)              |
| 19  | [eth_newPendingTransactionFilter](https://playground.open-rpc.org/)         | _Creates a filter in the node, to notify when new pending transactions arrive_                                                                                | ![in progress](img/inprogress.ico) |
| 20  | [eth_uninstallFilter](https://playground.open-rpc.org/)                     | _Uninstalls a filter with given id_                                                                                                                           | ![in progress](img/inprogress.ico) |
| 21  | [eth_getFilterChanges](https://playground.open-rpc.org/)                    | _Polling method for a filter, which returns an array of logs which occurred since last poll_                                                                  | ![todo](img/todo.ico)              |
| 22  | [eth_getFilterLogs](https://playground.open-rpc.org/)                       | _Returns an array of all logs matching filter with given id. Can compute the same results with an `eth_getLogs call`_                                         | ![todo](img/todo.ico)              |
| 23  | [eth_getLogs](https://playground.open-rpc.org/)                             | _Anytime a transaction is mined, we can see event logs for that transaction by making a request to eth_getLogs and then take actions based off those results_ | ![done](img/done.ico)              |
| 24  | [eth_mining](https://playground.open-rpc.org/)                              | _Returns whether the client is actively mining new blocks_                                                                                                    | ![done](img/done.ico)              |
| 25  | [eth_hashrate](https://playground.open-rpc.org/)                            | _Returns the number of hashes per second that the node is mining with_                                                                                        | ![done](img/done.ico)              |
| 26  | [eth_getWork](https://playground.open-rpc.org/)                             | _Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target")_                                                        | ![done](img/done.ico)              |
| 27  | [eth_submitWork](https://playground.open-rpc.org/)                          | _Used for submitting a proof-of-work solution_                                                                                                                | ![todo](img/todo.ico)              |
| 28  | [eth_submitHashrate](https://playground.open-rpc.org/)                      | _Used for submitting mining hashrate_                                                                                                                         | ![todo](img/todo.ico)              |
| 29  | [eth_sign](https://playground.open-rpc.org/)                                | _Returns an EIP-191 signature over the provided data._                                                                                                        | ![done](img/done.ico)              |
| 30  | [eth_signTransaction](https://playground.open-rpc.org/)                     | _Signs and submits a transaction_                                                                                                                             | ![done](img/done.ico)              |
| 31  | [eth_getBalance](https://playground.open-rpc.org/)                          | _Returns the balance of the account of given address_                                                                                                         | ![done](img/done.ico)              |
| 32  | [eth_getStorageAt](https://playground.open-rpc.org/)                        | _Returns the value from a storage position at a given address_                                                                                                | ![done](img/done.ico)              |
| 33  | [eth_getTransactionCount](https://playground.open-rpc.org/)                 | _Returns the number of transactions sent from an address_                                                                                                     | ![done](img/done.ico)              |
| 34  | [eth_getCode](https://playground.open-rpc.org/)                             | _Returns code at a given address_                                                                                                                             | ![done](img/done.ico)              |
| 35  | [eth_sendTransaction](https://playground.open-rpc.org/)                     | _Signs and submits a transaction_                                                                                                                             | ![done](img/done.ico)              |
| 36  | [eth_sendRawTransaction](https://playground.open-rpc.org/)                  | _Submits a raw transaction_                                                                                                                                   | ![done](img/done.ico)              |
| 37  | [eth_getTransactionByHash](https://playground.open-rpc.org/)                | _Returns the information about a transaction requested by transaction hash_                                                                                   | ![done](img/done.ico)              |
| 38  | [eth_getTransactionByBlockHashAndIndex](https://playground.open-rpc.org/)   | _Returns information about a transaction by block hash and transaction index position_                                                                        | ![done](img/done.ico)              |
| 39  | [eth_getTransactionByBlockNumberAndIndex](https://playground.open-rpc.org/) | _Returns information about a transaction by block number and transaction index position_                                                                      | ![done](img/done.ico)              |
| 40  | [eth_getTransactionReceipt](https://playground.open-rpc.org/)               | _Returns the receipt of a transaction by transaction hash_                                                                                                    | ![done](img/done.ico)              |


## JSON-RPC Methods According to [the Web3 Module API](https://openethereum.github.io/JSONRPC-web3-module)

| Num | Method                                                                                       | Description                                                            | Status                         |
|-----|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------|--------------------------------|
| 1   | [web3_clientVersion](https://openethereum.github.io/JSONRPC-web3-module#web3_clientversion)  | _Returns the current client version_                                   | ![done](img/done.ico)          |
| 2   | [web3_sha](https://openethereum.github.io/JSONRPC-web3-module#web3_sha3)                     | _Returns Keccak-256 (not the standardized SHA3-256) of the given data_ | ![done](img/done.ico)          |



## JSON-RPC Methods According to [the Net Module API](https://openethereum.github.io/JSONRPC-net-module)

| Num | Method                                                                           | Description                                                            | Status                         |
|-----|----------------------------------------------------------------------------------|------------------------------------------------------------------------|--------------------------------|
| 1   | [net_listening](https://openethereum.github.io/JSONRPC-net-module#net_listening) | _Returns true if client is actively listening for network connections_ | ![done](img/done.ico)          |
| 2   | [net_peerCount](https://openethereum.github.io/JSONRPC-net-module#net_peercount) | _Returns number of peers currenly connected to the client_             | ![done](img/done.ico)          |
| 3   | [net_version](https://openethereum.github.io/JSONRPC-net-module#net_version)     | _Returns the current network protocol version._                        | ![done](img/done.ico)          |
