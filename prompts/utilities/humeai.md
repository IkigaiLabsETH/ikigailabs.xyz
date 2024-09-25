# Adding APIs to Hume

## 1. Create API Route

First, let's create a new API route in the `/app/api` directory:

```typescript:app/api/hume/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Implement GET logic here
  return NextResponse.json({ message: 'Hume API GET endpoint' });
}

export async function POST(request: Request) {
  // Implement POST logic here
  const body = await request.json();
  return NextResponse.json({ message: 'Hume API POST endpoint', receivedData: body });
}
```

This creates a basic API route with GET and POST methods.

## 2. Implement API Logic

Now, let's add some actual Hume-specific logic. We'll use Axios for HTTP requests:

```typescript:app/api/hume/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const HUME_API_URL = process.env.HUME_API_URL;
const HUME_API_KEY = process.env.HUME_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data } = body;

    const response = await axios.post(
      `${HUME_API_URL}/analyze`,
      { data },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': HUME_API_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error calling Hume API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

## 3. Add Environment Variables

Add the following to your `.env.local` file:

```
HUME_API_URL=https://api.hume.ai/v1
HUME_API_KEY=your_hume_api_key_here
```

## 4. Create a Custom Hook

Let's create a custom hook to interact with our new API:

```typescript:hooks/use-hume-analysis.ts
import { useState } from 'react';
import axios from 'axios';

interface HumeAnalysisResult {
  // Define the structure of Hume's analysis result
}

export function useHumeAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HumeAnalysisResult | null>(null);

  async function analyzeData(data: any) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/hume', { data });
      setResult(response.data);
    } catch (err) {
      setError('An error occurred while analyzing the data');
      console.error('Error in useHumeAnalysis:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return { analyzeData, isLoading, error, result };
}
```

## 5. Use the Hook in a Component

Now, let's use our custom hook in a component:

```typescript:components/hume-analysis.tsx
'use client';

import { useState } from 'react';
import { useHumeAnalysis } from '@/hooks/use-hume-analysis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HumeAnalysis() {
  const [inputData, setInputData] = useState('');
  const { analyzeData, isLoading, error, result } = useHumeAnalysis();

  const handleAnalysis = () => {
    analyzeData(inputData);
  };

  return (
    <div className="space-y-4">
      <Input
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data to analyze"
      />
      <Button onClick={handleAnalysis} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div>
          <h2 className="text-xl font-bold">Analysis Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

## 6. Add the Component to a Page

Finally, let's add our new component to a page:

```typescript:app/hume-analysis/page.tsx
import { HumeAnalysis } from '@/components/hume-analysis';

export default function HumeAnalysisPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Hume Analysis</h1>
      <HumeAnalysis />
    </div>
  );
}
```

This setup follows the project guidelines by:

1. Using TypeScript throughout.
2. Following the Next.js App Router structure.
3. Implementing API routes in the `/app/api` directory.
4. Using Axios for HTTP requests.
5. Creating a custom hook for data fetching and state management.
6. Using Shadcn UI components (Button, Input).
7. Implementing error handling and loading states.
8. Using environment variables for API configuration.
9. Following the project's naming conventions and file structure.
