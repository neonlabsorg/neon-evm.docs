---
title: Running a Proxy server
---

*This guide is for people who want to register with Neon EVM as a proxy operator for processing transactions on Solana. It is assumed these people have previous experience compiling Solana-based blockchain nodes or have worked as blockchain validators.*

## Introduction
Ethereum users have the opportunity to run their smart contract-based applications on Solana via Neon EVM. Smart contracts generate transactions in accordance with the Ethereum rules and submit them to Neon EVM. Since the structures of Ethereum and Solana transactions differ from each other, Neon EVM contains special proxy servers that are responsible for converting and executing transactions in Solana. These servers are configured and maintained by Neon EVM proxy operators.

This guide contains a list of the proxy operator’s duties, as well as instructions to ensure the successful operation of a proxy and the successful execution of transactions.

## Duties of a Proxy Operator
A proxy operator’s main task is to install software on a server to accept a transaction formed according to Ethereum rules, and to ensure its execution in Solana. This involves:
 * Configuring a proxy server to perform the following operations:
    * Receiving requests over Web3 API protocol.
    * Shaping responses using Web3 API protocol.
    * Converting transactions to the Solana format.
 * Connecting a proxy server to a Solana cluster RPC endpoint.
 * Successfully executing transactions.

> All operations related to the execution of transactions on Solana are performed by the software installed on your node.

## Installation Using Docker

After you have chosen the node (Neon EVM proxy) that meets the listed recommendations, you can start installing a proxy operator software on it.

### Run a Daemon

Make sure that you have a daemon running. If you see something like:

```bash
$ docker info

Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```

you need to run the daemon and PostgreSQL services first:

```bash
$ sudo systemctl start docker
$ sudo docker run --rm -ti --network=host -e POSTGRES_HOST=<localhost|postgres> -e POSTGRES_DB=<database> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> --name=postgres postgres:14.0
```

**The command line options:**
  * `--rm` — Delete a container when the command is completed.
  * `-ti` — Allocate a pseudo-TTY connected to the container’s stdin; creating an interactive bash shell in the container.
  * `--network host` — Use the host network.
  * `-e POSTGRES_HOST=<localhost|postgres>` — Specifies DB hosting; `localhost` is set by default and is recommended; the parameter can be skipped if you use PostgreSQL hosted locally.
  * `-e POSTGRES_DB=<database>` — Specifies the name of DB; `neon-db` is recommended.
  * `-e POSTGRES_USER=<username>` — Specifies a username of DB; `neon-proxy` is recommended.
  * `-e POSTGRES_PASSWORD=<password>` — Specifies a username's password; `neon-proxy-pass` is recommended.
  * `--name=postgres` — Specifies a version of PostgreSQL; `postgres:14.0` is recommended.

*Example:*
```bash
$ sudo docker run --rm -ti --network=host -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass --name=postgres postgres:14.0
```

### Start a Proxy in a Docker Container

Create and run a proxy container on the daemon.
When starting Docker, you need to set the *CONFIG* environment variable, which can take one of the following values: *local*, *devnet*, *testnet*.

```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=<database> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -v <path-to-keypair-file/id.json>:/root/.config/solana/id.json neonlabsorg/proxy:v0.5.1
```

**The command line options:**
  * `-e CONFIG=<network>` — Specifies a Solana network configuration; `CONFIG=devnet` is recommended.
  * `-v <path-to-keypair-file/id.json>:/root/.config/solana/id.json` — Specifies the path to the .JSON file where your keypair is stored and passes your private key to the container.
  * `neonlabsorg/proxy:v0.5.1` — The specific proxy image.

> The option `-v <path-to-keypair-file>` is only relevant for authorized operators. If you are not yet registered as an operator and are just about to become one, you do not need to specify this option.

This command line will automatically perform all the actions required to launch a Docker container and run a proxy.

*Example:*
```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=devnet -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.5.1
```

### CONFIG values
Each `CONFIG` value (devnet/testnet/local), by default, the corresponding variables are set:
  * `SOLANA_URL`
  * `NEON_CLI_TIMEOUT`
  * `CANCEL_TIMEOUT`
  * `POSTGRES_HOST`
  * `MINIMAL_GAS_PRICE`
  * `EVM_LOADER`
  * `NEON_TOKEN_MINT`

When you start Docker, you can override all these parameters by specifying different values for them on the command line. The table below shows default values for the following variables:

CONFIG | SOLANA_URL | NEON_CLI_TIMEOUT | CANCEL_TIMEOUT | POSTGRES_HOST | MINIMAL_GAS_PRICE
:-|:-|:-|:-|:-|:-
devnet | `https://api.devnet.solana.com` | 10 (s) | 60 (slot) | localhost | 1
testnet | `https://api.testnet.solana.com` | 15 (s) | 60 (slot) | localhost | 1
local | `http://localhost:8899` | 0,9 (s) | 10 (slot) | localhost | 0

#### SOLANA_URL
Specifies a Solana RPC endpoint that a proxy is connecting to. If you specify `CONFIG=local` and `SOLANA_URL=<your node URL>`, then the requests of a proxy will be sent to your node.

#### NEON_CLI_TIMEOUT
In Neon EVM, a transaction is run for emulation before execution to determine the accounts that will be involved in it. The `NEON_CLI_TIMEOUT` variable specifies the time (in seconds) required for a transaction to be executed.

The emulation execution time is affected by the following factors:
  * The geographical distance between a node and proxy.
  * The load of the node due to processing requests at the moment.

Setting the `NEON_CLI_TIMEOUT` time too short may not be sufficient to complete a transaction and pack it into a block. Therefore, `NEON_CLI_TIMEOUT` is set to the smallest value for `CONFIG = local`. Setting the `NEON_CLI_TIMEOUT` value too high may block other users from accessing this node.

#### CANCEL_TIMEOUT
This parameter limits the time (in [slots](about/terminology.md#slot)) for blocking an account. If the blocking time for the account exceeds the time specified in this parameter, an attempt will be made to cancel the transaction that blocked this account.

#### MINIMAL_GAS_PRICE
This parameter sets the lowest possible gas price specified in a transaction.

#### EVM_LOADER
`CONFIG` defaults the following values for the variable `EVM_LOADER`:

CONFIG | EVM_LOADER
:-|:-
devnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU
testnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU
local | —

#### NEON_TOKEN_MINT
`CONFIG` defaults the following values for the variable `NEON_TOKEN_MINT`:

CONFIG | NEON_TOKEN_MINT
:-|:-
devnet | 89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g
testnet | 89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g
local | HPsV9Deocecw3GeZv1FkAPNCBRfuVyfw9MMwjwRe1xaU

## Prometheus metrics in Proxy

### Proxy Prometheus Metrics

| Metrics title              | units    | description                      |
|----------------------------|----------|----------------------------------|
| request_count              | count    | App Request Count                |
| request_latency_seconds    | ms       | Request latency                  |
| tx_total                   | tx count | Incoming TX Count                |
| tx_success_count           | tx count | Count Of Succeeded Txs           |
| tx_failed_count            | tx count | Count Of Failed Txs              |
| tx_in_progress             | tx count | Count Of Txs Currently Processed |
| operator_sol_balance       | Sols     | Operator Balance in Sol's        |
| operator_neon_balance      | Neons    | Operator Balance in Neon's       |
| usd_price_sol              | USD      | Sol Price USD                    |
| usd_price_neon             | USD      | Neon Price USD                   |
| gas_price                  | alans    | Gas Price                        |
| operator_fee               | Percent  | Operator Fee                     |

### Indexer Prometheus Metrics

| Metrics title            | units         | description                                                       |
|--------------------------|---------------|-------------------------------------------------------------------|
| tx_sol_spent             | lamports      | How many lamports being spend in Neon transaction per iteration   |
| tx_neon_income           | alans         | Neons payed for transaction                                       |
| tx_bpf_per_iteration     | bpf units     | How many BPF cycles was used in each iteration                    |
| tx_steps_per_iteration   | steps         | How many steps was used in each iteration                         |
| tx_count                 | tx count      | Count of Neon transactions were completed (independent on status) |
| tx_canceled              | tx count      | Count of Neon transactions were canceled                          |
| count_tx_count_by_type   | tx count      | Count of transactions by type(single\\iter\\iter w holder)        |
| count_sol_tx_per_neon_tx | tx count      | Count of solana txs within by type(single\\iter\\iter w holder)   |
| postgres_availability    | 1 or 0 status | Postgres availability                                             |
| solana_rpc_health        | 1 or 0 status | Solana Node status                                                |

### Prometheus formulas examples

#### Profit and Loss monitoring

```promql
sum (avg by (operator_sol_wallet) (operator_sol_balance) ) * avg by (app) (usd_price_sol) + sum (avg by (operator_neon_wallet) (operator_neon_balance) ) * avg by (app) (usd_price_neon))
```

#### Solana Node status

```promql
solana_rpc_health{job="indexer-monitor"}
```

#### PostgreSQL DB status

```promql
postgres_availability{job="indexer-monitor"}
```

### Prometheus configuration example

```yml
global:
  scrape_interval:     15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'proxy-monitor'
    metrics_path: '/'
    scrape_interval: 5s
    static_configs:
    - targets: ['proxy:8888']

  - job_name: 'indexer-monitor'
    metrics_path: '/'
    scrape_interval: 5s
    static_configs:
    - targets: ['indexer:8887']
```

## proxy-cli

### Example of execution

```shell
docker exec proxy ./proxy-cli.sh info
```

### Commands

| Command                 | Description                                                                                                                           |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| info                    | Print full accounts (Solana accounts and Neon accounts, their balance and private key \| Resource accounts and their balance) in JSON |

#### Output example

```shell
docker exec proxy ./proxy-cli.sh info | python3 -m json.tool
```

```json
{
   "accounts":[
      {
         "address":"BMp6gEnveANdvSvspESJUrNczuHz1GF5UQKjVLCkAZih",
         "balance":"8972.78394124",
         "storage":[
            {
               "address":"62MMKXigkapYUDBo1swJRZvyQjH37WPh8SRvpBD5WS4F",
               "status":"FINALIZED_STORAGE",
               "balance":"0.913152"
            }
         ],
         "holder":[
            {
               "address":"EYb7qSkqS4wSg4wxxawCYThDRMdRhe72W4KdMjAdNbbA",
               "status":"EMPTY",
               "balance":"0.913152"
            }
         ],
         "private":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,81,105,105,99,114,88,7,110,109,112,70,52,110,56,8,85,81,122,52,74,118,77,100,77,57,106,101,84,53,86,1,102,117,117,70,51,87,102,9,98,90,111,71,56,119,55,84,82,53,53,84,56,76,85,107,54,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
         "neon_address":"0xd1b27c35c47bd37398ad6ab642b1bf63aec0ca43",
         "neon_private":"0xa1b2c3d4e5f68dec7c7bc8c0ff17a12274ca46b6b05ec344b9203d2acb39f5be",
         "neon_balance":"0.07031774"
      }
   ],
   "total_balance":"78921.04414876",
   "resource_balance":"54.789120",
   "total_neon_balance":"0.71927982004647600"
}
```

| Command                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| info holder-accounts    | Print list of Holder accounts owned by operator     |

```shell
docker exec proxy ./proxy-cli.sh info holder-accounts
```

```shell
EYb7qSkqS4wSg4wxxawCYThDRMdRhe72W4KdMjAdNbbA
DEG7mDtzEVq4zUGxxajNCnRPLnumSDPQHGMMC4zyPz9h
DueRTJ7WvwA2csPoVeheiDnZPXfpVstSuSsffgF8baTE
2rJszXcUPuqJkpoW2ZgMRR7sLytSMDsGkecGAiBWqimD
```

| Command                 | Description                                              |
|-------------------------|----------------------------------------------------------|
| info storage-accounts   | Print list of Storage accounts owned by operator         |

```shell
docker exec proxy ./proxy-cli.sh info storage-accounts
```

```shell
7Jt1HpgrtaKadZgCvEPfAn2p55AJi6bovrH9byVVNNKh
BkBzYwk7dL8yYAaYxyeS9LrDBuW5vMinPf1WUWQTLMpK
9bw592nyQzmAR94JW9SgkN6baMoY1Y236RYgukFqHrov
2rJszXcUPuqJkpoW2ZgMRR7sLytSMDsGkecGAiBWqimD
```

| Command                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| info solana-private-key | Print list of Solana accounts and its private key   |

```shell
docker exec proxy ./proxy-cli.sh info solana-private-key
```

```shell
BMp6gEnveANdvSvspESJUrNczuHz1GF5UQKjVLCkAZih    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 99, 114, 88, 57, 110, 109, 112, 70, 52, 110, 56, 98, 85, 81, 122, 52, 74, 118, 77, 100, 77, 57, 106, 101, 84, 53, 86, 81, 102, 117, 117, 70, 51, 87, 102, 89, 98, 90, 111, 71, 56, 119, 55, 84, 82, 53, 53, 84, 56, 76, 85, 107, 54, 52, 50, 121, 110, 116, 68, 90, 121, 53, 121, 65, 54, 76, 86, 112, 109]
```

| Command                 | Description                                     |
|-------------------------|-------------------------------------------------|
| info neon-private-key   | Print list of Neon accounts and its private key |

```shell
docker exec proxy ./proxy-cli.sh info neon-private-key
```

```shell
0xd1b27c35c47bd37398ad6ab642b1bf63aec0ca43    0xa1b2c3d4e5f68dec7c7bc8c0ff17a12274ca46b6b05ec344b9203d2acb39f5be
```

| Command                 | Description                                                          |
|-------------------------|----------------------------------------------------------------------|
| info neon-address       | Print list of Neon accounts and their balances plus total balance    |

```shell
docker exec proxy ./proxy-cli.sh info neon-address
```

```shell
0xb1239ffe4a30d4ad678f42cd5e56ce13c0daf3e9    5.293965780000000000
0x910bc86b92aa1bda080648ae19216e7ebe8dc340    3.511933000000000000
0x181fe64831130575ec6ea6a1de0183464dc13f8f    5.461316080000000000
0xc6e5512efdb0c693c9a78755754f577e2fbb742d    5.969624380000078940
total_balance    49.943540400046476000
```

| Command                 | Description                                                                                |
|-------------------------|--------------------------------------------------------------------------------------------|
| info solana-accounts    | Print list of Solana accounts balances and Resource accounts balances plus total balance   |

```shell
docker exec proxy ./proxy-cli.sh info solana-accounts
```

```shell
BMp6gEnveANdvSvspESJUrNczuHz1GF5UQKjVLCkAZih    8,972.619517760
holder:
    EYb7qSkqS4wSg4wxxawCYThDRMdRhe72W4KdMjAdNbbA    0.913152000
    DEG7mDtzEVq4zUGxxajNCnRPLnumSDPQHGMMC4zyPz9h    0.913152000
storage:
    62MMKXigkapYUDBo1swJRZvyQjH37WPh8SRvpBD5WS4F    0.913152000
    BdX7H8cFVJwmmsRjZTYHSfaVVoRGijUkYT3T7FgrdejE    0.913152000
9kPRbbwKL5SYELF4cZqWWFmP88QkKys51DoaUBx8eK73    4,995.719095600
holder:
    BKLT27mXenjyeoKc7Fn8xkrezrNubuRdzbq19mmxW9vS    0.913152000
    Wup8BGZ1HiKPo7iw8owzCpgX5fnw2jVsk9gNLpi3Jtq    0.913152000
storage:
    5ky8gugmaB9YhVdgrfkwXxeqnQ2V8zEQ9jtxJKC4Ewg1    0.913152000
    HhMTo9nvqoiUMiXuDBUfSsbaxUdEicUxVzB7Sb5qZF5C    0.913152000
...
total_balance       78,913.573017880
resource_balance    54.789120000
```
