# OpenAI API Reference: Introduction

Welcome to OpenAI's API! This document introduces you to the API, provides guidelines on how to make requests, and highlights key concepts for working with the OpenAI platform.

## Overview

The OpenAI API allows developers to leverage powerful language models (such as GPT-4) for a variety of natural language processing tasks. Whether you're building chatbots, performing text analysis, generating code, or creating content, the API provides robust capabilities.

### Core Features:

- **Text Generation**: Generate coherent and contextually appropriate text.
- **Code Generation**: Write and debug code snippets.
- **Embeddings**: Use embeddings for tasks like search, clustering, or recommendations.
- **Fine-Tuning**: Customize models by training them on your data.

The API is flexible and can be applied to various use cases like customer support, content generation, data extraction, and more.

## API Access and Authentication

To use the OpenAI API, you'll need an API key, which you can obtain by signing up at the OpenAI [platform](https://platform.openai.com/). After logging in, you can generate an API key under the **API Keys** section in your dashboard.

**Authentication**:
- All API requests must include your secret API key in the `Authorization` header.
- Example:
  ```bash
  Authorization: Bearer YOUR_API_KEY
  ```

## Making API Requests

### Endpoint

All API requests are made to the following base URL:
```
https://api.openai.com/v1
```

### Example Request

Here’s an example of a request using `curl` to generate a text completion:
```bash
curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "gpt-4",
    "prompt": "Translate the following English text to French: \'OpenAI is amazing.\'",
    "max_tokens": 60
  }'
```

### Example Response

A successful request returns a `JSON` object containing the completion result:
```json
{
  "id": "cmpl-5kjkF",
  "object": "text_completion",
  "created": 1635230400,
  "model": "gpt-4",
  "choices": [
    {
      "text": "OpenAI est incroyable.",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 7,
    "total_tokens": 15
  }
}
```

### Parameters

- **model**: The model you wish to use (e.g., `gpt-4`, `gpt-3.5-turbo`).
- **prompt**: The input text for the model. It can be a question, instruction, or unfinished sentence.
- **max_tokens**: The maximum number of tokens to generate.
- **temperature**: Controls randomness in the output. Higher values like `0.8` make the output more random, while lower values like `0.2` make it more focused and deterministic.
- **top_p**: Controls diversity via nucleus sampling. `top_p=0.5` means only the top 50% probability mass is considered.
- **stop**: Up to 4 sequences where the API will stop generating further tokens.

### Response Object

- **id**: The unique ID for the generated text completion.
- **object**: The type of response, e.g., `text_completion`.
- **created**: The timestamp for when the completion was created.
- **model**: The model used to generate the completion.
- **choices**: A list of potential completions with text, indices, and the reason for completion (e.g., `stop`).
- **usage**: Information about token usage, showing how many tokens were consumed.

## Rate Limits and Pricing

Each user has a rate limit, which defines the number of API calls allowed within a certain time window. Check your usage and limits in the OpenAI dashboard.

- **Pricing**: The cost is based on the number of tokens processed by the model. You can find detailed pricing [here](https://platform.openai.com/pricing).

### Tokens

The API uses tokens as units of processing text. A token can be as short as one character or as long as one word. For example:
- "ChatGPT is awesome!" has 6 tokens.

The total tokens processed in an API call include both the tokens in the prompt and the tokens generated in the completion.

## Models

OpenAI offers several models with varying capabilities and costs. Below are the primary models:

- **GPT-4**: The most advanced language model, designed for complex tasks and nuanced understanding.
- **GPT-3.5**: A powerful, general-purpose language model suitable for a variety of tasks.
- **Embeddings models**: Use these to convert text into vector representations for search, clustering, or recommendation tasks.
- **Fine-tuned models**: Create custom versions of the models based on your own data.

## Error Handling

The API will return appropriate HTTP status codes to signal errors. For example:

- **400 Bad Request**: The request was invalid (e.g., missing required parameters).
- **401 Unauthorized**: API key is missing or invalid.
- **429 Too Many Requests**: You've hit your rate limit.
- **500 Server Error**: An internal server error occurred. Try again later.

You can programmatically handle these responses by checking the status code in the API response.

### Example of Error Handling

```json
{
  "error": {
    "message": "You exceeded your current quota, please check your plan and billing details.",
    "type": "invalid_request_error",
    "param": null,
    "code": "quota_exceeded"
  }
}
```

## Additional Resources

- [API Reference](https://platform.openai.com/docs/api-reference)
- [Examples](https://platform.openai.com/examples)
- [Community](https://community.openai.com/)
- [Pricing](https://platform.openai.com/pricing)
  
---

This is a general overview of OpenAI’s API v3.0.1. You can find more detailed information on the official [API documentation](https://platform.openai.com/docs/api-reference).

---

https://docs.mem0.ai/features/openai_compatibility

https://docs.mem0.ai/components/embedders/models/openai

---

https://openrouter.ai/models/openai/o1-preview-2024-09-12/api

https://openrouter.ai/docs/requests 

## Requirements

You will need an OpenAI API key.

Get one [here](https://platform.openai.com/api-keys).

As of September 13th, 2024, you will need to be an organization with Tier 5 access to use o1 models.

We hope to see o1 models available to all users soon, and we'll be ready for you!

### Using o1 models via OpenRouter

If you have an [OpenRouter](https://openrouter.ai/) account, create an API key and add the following to `.env.local`:

```
OPENAI_API_KEY=<openrouter api key>
OPENAI_BASE_URL=https://openrouter.ai/api/v1
```
