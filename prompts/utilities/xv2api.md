
This structure covers the primary aspects of API documentation, including how to authenticate, the key endpoints (with parameters and examples), and error handling.
---

# X v2 API Documentation

## Overview

The **X v2 API** allows developers to interact with Twitter's core functionality, enabling retrieval of public tweets, user information, and trends. The Basic tier provides essential access to commonly used endpoints for developers starting with the API.

**Base URL:**  
All requests to the X v2 API should be sent to the base URL:  
```
https://api.twitter.com/2
```

## Authorization

Before accessing any of the API endpoints, you need to authenticate using OAuth 2.0 Bearer Tokens.

### Obtaining a Bearer Token
To access the X API, you’ll need to create an app in the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) and generate API keys and tokens.

1. Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/products/basic).
2. Create or select an existing project and app.
3. Navigate to the **Keys and Tokens** tab.
4. Generate your API key and Bearer token.
   
### Bearer Token Authorization Example:
```bash
curl -H "Authorization: Bearer YOUR_BEARER_TOKEN" "https://api.twitter.com/2/tweets"
```

## Endpoints

### 1. Get Tweet by ID

**Endpoint:**  
`GET /tweets/:id`

Retrieve detailed information about a specific tweet using its unique Tweet ID.

#### Request:
```bash
GET https://api.twitter.com/2/tweets/:id
```

#### Parameters:
- `id` (required): The unique ID of the tweet.

#### Example Request:
```bash
curl -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  "https://api.twitter.com/2/tweets/1453489038376136711"
```

#### Response:
```json
{
    "data": {
        "id": "1453489038376136711",
        "text": "Hello World!"
    }
}
```

### 2. Search Tweets (Recent Search)

**Endpoint:**  
`GET /tweets/search/recent`

Retrieve recent tweets based on a search query. This endpoint allows you to search for public tweets from the last seven days.

#### Request:
```bash
GET https://api.twitter.com/2/tweets/search/recent
```

#### Parameters:
- `query` (required): The search query string.
- `max_results` (optional): The maximum number of results to return (default is 10, max is 100).
- `start_time` (optional): Starting timestamp for the search window (ISO 8601 format).
- `end_time` (optional): Ending timestamp for the search window (ISO 8601 format).

#### Example Request:
```bash
curl -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  "https://api.twitter.com/2/tweets/search/recent?query=web3"
```

#### Response:
```json
{
  "data": [
    {
      "id": "1453489038376136711",
      "text": "Web3 is revolutionizing digital ownership."
    },
    {
      "id": "1453489038376136722",
      "text": "Exploring the world of decentralized finance #web3"
    }
  ]
}
```

### 3. Get User by Username

**Endpoint:**  
`GET /users/by/username/:username`

Retrieve detailed information about a specific Twitter user using their username.

#### Request:
```bash
GET https://api.twitter.com/2/users/by/username/:username
```

#### Parameters:
- `username` (required): The Twitter handle of the user (without the "@" symbol).

#### Example Request:
```bash
curl -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  "https://api.twitter.com/2/users/by/username/jack"
```

#### Response:
```json
{
  "data": {
    "id": "12",
    "name": "jack",
    "username": "jack"
  }
}
```

### 4. Get User Tweets

**Endpoint:**  
`GET /users/:id/tweets`

Retrieve tweets posted by a specific user.

#### Request:
```bash
GET https://api.twitter.com/2/users/:id/tweets
```

#### Parameters:
- `id` (required): The unique ID of the user.
- `max_results` (optional): The maximum number of tweets to return (default is 10, max is 100).

#### Example Request:
```bash
curl -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  "https://api.twitter.com/2/users/12/tweets?max_results=5"
```

#### Response:
```json
{
  "data": [
    {
      "id": "1453489038376136711",
      "text": "Just setting up my Twitter."
    },
    {
      "id": "1453489038376136722",
      "text": "Building something cool."
    }
  ]
}
```

## Rate Limits

- Basic tier rate limits vary by endpoint. Common limits include **500 requests per day** for user-related data and **180 requests per 15-minute window** for search-related requests.
- Always check the headers of your API responses for rate limit information:
  - `x-rate-limit-limit`: Maximum number of requests.
  - `x-rate-limit-remaining`: Number of requests remaining.
  - `x-rate-limit-reset`: Time when the rate limit resets.

## Error Handling

If your request is not successful, the API will return an error response. The most common error codes are:

- **400**: Bad Request (e.g., invalid parameters).
- **401**: Unauthorized (invalid Bearer token).
- **403**: Forbidden (access to the resource is denied).
- **429**: Too Many Requests (rate limit exceeded).

Example error response for invalid Bearer token:
```json
{
  "title": "Unauthorized",
  "detail": "Request requires authentication.",
  "type": "https://api.twitter.com/2/problems/authentication",
  "status": 401
}
```

---

https://developer.twitter.com/en/portal/products
