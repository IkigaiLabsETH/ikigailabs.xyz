Dune’s realtime APIs makes building multi-chain application seemless. We’ve worked hard to offer incredible multichain support (25+ networks in a single call) with one the industry’s lowest latencies. While these APIs are in beta they power several of the best teams building crypto.

The available APIs are:

Token Balances: Access accurate and fast real time balances of the native and ERC20 tokens of accounts on EVM blockchains.

https://docs.dune.com/developer-apis/balance

https://docs.dune.com/developer-apis/balance-chains

Transactions: Access transactions for accounts in real time across EVM blockchains.

https://docs.dune.com/developer-apis/transactions

https://docs.dune.com/developer-apis/transactions-chains
​
Getting started
In order to get started, all you need is an API key. See here how to generate one. The API key should always be sent in the header x-dune-api-key.

https://docs.dune.com/api-reference/overview/authentication#generate-an-api-key

---

yarn add @duneanalytics/client-sdk

Currently this client only supports the execution based endpoints, and not Query Endpoints or uploads. Here is an example query:

import { QueryParameter, DuneClient } from "@duneanalytics/client-sdk";
const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 1215383;
const params = {
query_parameters = [
QueryParameter.text("TextField", "Plain Text"),
QueryParameter.number("NumberField", 3.1415926535),
QueryParameter.date("DateField", "2022-05-04 00:00:00"),
QueryParameter.enum("ListField", "Option 1"),
]
};

client
.runQuery(queryID, params)
.then((executionResult) => console.log(executionResult.result?.rows));

---

example https://github.com/duneanalytics/ts-dune-client/blob/main/src/api/client.ts

example https://docs.dune.com/api-reference/markets/endpoint/marketplace_marketshare

example https://docs.dune.com/api-reference/evm/endpoint/contracts
