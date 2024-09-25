Guide for CoinGecko's API v3.0.1 reference, focusing on the **Endpoint Overview**. 

---

# CoinGecko API v3.0.1 Documentation

Welcome to the CoinGecko API v3.0.1! This guide provides an overview of the key endpoints you can use to retrieve cryptocurrency and NFT data.

## API Base URL

The API is accessible via the following base URL:

```
https://api.coingecko.com/api/v3
```

All requests to the API must be made via `GET`.

### 1. Cryptocurrencies

The CoinGecko API offers a wide variety of cryptocurrency-related endpoints for retrieving information about coins, market data, exchange rates, and more.

#### Endpoints:

- **/coins/list**  
  Returns a list of all supported cryptocurrencies on CoinGecko, including their `id`, `symbol`, and `name`.
  
  Example:
  ```bash
  GET /coins/list
  ```

- **/coins/{id}**  
  Returns detailed information for a specific cryptocurrency by its `id`. You can include additional data by passing query parameters.
  
  Example:
  ```bash
  GET /coins/bitcoin
  ```

- **/coins/markets**  
  Retrieves the current price and market data (such as market cap, volume, and 24-hour change) for one or more cryptocurrencies.

  Query Parameters:
  - `vs_currency` (required): The target currency (e.g., `usd`, `eur`).
  - `ids`: A comma-separated list of coin IDs.

  Example:
  ```bash
  GET /coins/markets?vs_currency=usd&ids=bitcoin,ethereum
  ```

### 2. Market Data

Get aggregated data for the overall cryptocurrency market, including historical data, global data, and trending coins.

#### Endpoints:

- **/global**  
  Returns aggregated global cryptocurrency data, such as total market capitalization, 24h volume, and Bitcoin dominance.

  Example:
  ```bash
  GET /global
  ```

- **/search/trending**  
  Fetches the top 7 trending cryptocurrencies on CoinGecko based on search volume.

  Example:
  ```bash
  GET /search/trending
  ```

- **/simple/price**  
  Fetches the current price of one or multiple cryptocurrencies in various fiat currencies and BTC/ETH.

  Example:
  ```bash
  GET /simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur
  ```

### 3. NFT Data

The CoinGecko API also provides endpoints for retrieving information about NFTs and their markets.

#### Endpoints:

- **/nfts/list**  
  Returns a list of NFT collections available on CoinGecko.

  Example:
  ```bash
  GET /nfts/list
  ```

- **/nfts/{id}**  
  Retrieves detailed data for a specific NFT collection by its `id`.

  Example:
  ```bash
  GET /nfts/{id}
  ```

- **/nfts/{id}/transactions**  
  Returns transaction history for a specific NFT collection.

  Example:
  ```bash
  GET /nfts/{id}/transactions
  ```

### 4. Exchange Data

Retrieve information about exchanges and their supported coins or market tickers.

#### Endpoints:

- **/exchanges**  
  Get a list of supported cryptocurrency exchanges on CoinGecko.

  Example:
  ```bash
  GET /exchanges
  ```

- **/exchanges/{id}**  
  Fetch detailed information about a specific exchange.

  Example:
  ```bash
  GET /exchanges/binance
  ```

- **/exchanges/{id}/tickers**  
  Get the list of market tickers (trading pairs) on a particular exchange.

  Example:
  ```bash
  GET /exchanges/binance/tickers
  ```

### 5. Simple Token Price

This endpoint retrieves the current price of ERC-20/BEP-20 tokens in various currencies. 

#### Endpoint:

- **/simple/token_price/{id}**
  
  Example:
  ```bash
  GET /simple/token_price/ethereum?contract_addresses=0x...&vs_currencies=usd
  ```

### 6. Decentralized Finance (DeFi) Data

Access decentralized finance metrics like lending and borrowing rates, or fetch data for specific protocols.

#### Endpoints:

- **/derivatives**  
  Get a list of derivatives available on CoinGecko.
  
  Example:
  ```bash
  GET /derivatives
  ```

- **/finance_platforms**  
  Fetch financial data on decentralized finance platforms.
  
  Example:
  ```bash
  GET /finance_platforms
  ```

### 7. Miscellaneous

Additional utility endpoints that provide extra functionality.

#### Endpoints:

- **/ping**  
  Test if the API service is working. It returns a simple `gecko_says` message.
  
  Example:
  ```bash
  GET /ping
  ```

- **/events/countries**  
  Retrieve a list of supported countries for events.
  
  Example:
  ```bash
  GET /events/countries
  ```

### Authentication & Rate Limiting

- The CoinGecko API is **free** and does not require an API key for use.
- **Rate limits**: 100 requests/minute.



