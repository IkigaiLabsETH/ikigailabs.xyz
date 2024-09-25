# Using the Exa TypeScript SDK

Learn how to integrate and use the Exa TypeScript SDK in your Next.js application to perform advanced searches, retrieve content, and find similar documents using Exa's powerful search API.

## Installation

Install the Exa SDK using your preferred package manager:

```bash
npm install exa-js
```

or

```bash
pnpm install exa-js
```

## Initialization

Create an Exa client by importing the SDK and instantiating it with your API key.

```typescript:lib/exaClient.ts
import Exa from 'exa-js';

export const exaClient = new Exa(process.env.EXA_API_KEY);
```

Ensure your Exa API key is stored securely, preferably in an environment variable.

## Performing a Search

Use the `search` method to perform a query and retrieve relevant results.

```typescript:modules/exa/useExaSearch.ts
import { exaClient } from '@/lib/exaClient';

export function useExaSearch() {
  async function search(query: string) {
    const result = await exaClient.search(query, {
      useAutoprompt: true,
      numResults: 5,
    });
    return result.results;
  }

  return { search };
}
```

## Retrieving Content with Search Results

To obtain full text or highlights along with search results, use the `searchAndContents` method.

```typescript:modules/exa/useExaSearch.ts
import { exaClient } from '@/lib/exaClient';

export function useExaSearchWithContents() {
  async function searchWithContents(query: string) {
    const result = await exaClient.searchAndContents(query, {
      text: true,
      highlights: true,
      numResults: 5,
    });
    return result.results;
  }

  return { searchWithContents };
}
```

## Finding Similar Documents

Find documents similar to a given URL using the `findSimilar` method.

```typescript:modules/exa/useExaFindSimilar.ts
import { exaClient } from '@/lib/exaClient';

export function useExaFindSimilar() {
  async function findSimilar(url: string) {
    const result = await exaClient.findSimilar(url, {
      numResults: 5,
      excludeSourceDomain: true,
    });
    return result.results;
  }

  return { findSimilar };
}
```

## Retrieving Document Contents

Use the `getContents` method to retrieve contents of documents based on their URLs or IDs.

```typescript:modules/exa/useExaGetContents.ts
import { exaClient } from '@/lib/exaClient';

export function useExaGetContents() {
  async function getContents(ids: string[]) {
    const contents = await exaClient.getContents(ids, {
      text: true,
      highlights: true,
    });
    return contents.results;
  }

  return { getContents };
}
```

## Example Component Usage

Implement a search feature in your React component.

```typescript:modules/exa/components/ExaSearchComponent.tsx
'use client';

import { useState } from 'react';
import { useExaSearch } from '@/modules/exa/useExaSearch';

export function ExaSearchComponent() {
  const { search } = useExaSearch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {
    const searchResults = await search(query);
    setResults(searchResults);
  }

  return (
    <div className="p-4">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-grow rounded"
          placeholder="Enter your search query"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      <ul className="mt-4">
        {results.map((result) => (
          <li key={result.id} className="mb-4">
            <a href={result.url} className="text-blue-600 underline">
              {result.title}
            </a>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Notes

- **Environment Variables**: Store your API key in an environment variable named `EXA_API_KEY`.
- **Error Handling**: Implement proper error handling using `try/catch` blocks as needed.
- **Asynchronous Operations**: Use `async/await` for handling asynchronous calls.
- **Client Components**: Remember to include `'use client';` at the top of files that use client-side features like `useState`.
- **Styling**: Use Tailwind CSS classes for styling components consistently.

## Conclusion

By integrating the Exa TypeScript SDK into your application, you can leverage powerful search capabilities to enhance your user experience. Customize the provided examples to suit your application's needs, and refer to the Exa SDK documentation for more advanced features.

## X DEMO

https://docs.exa.ai/reference/live-demo-twitterx-post-retrieval
