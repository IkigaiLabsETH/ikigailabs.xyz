# Backend Instructions

https://docs.mem0.ai/api-reference/memory/add-memories

https://docs.mem0.ai/api-reference/memory/get-memories

https://docs.mem0.ai/api-reference/memory/get-memory

https://docs.mem0.ai/api-reference/memory/update-memory

https://docs.mem0.ai/api-reference/memory/v2-search-memories

https://docs.mem0.ai/api-reference/overview


Ensure that every time you make a call with HumeAI, it creates memories and uses that context, we need to integrate the memory creation and retrieval into your existing HumeAI call logic. Here's a step-by-step guide to achieve this:

Step 1: Update the HumeAI Call Logic
Update the existing HumeAI call logic to include memory creation and retrieval.

Step 2: Create a Custom Hook
Create a custom hook to manage the memory creation and retrieval process.

Step 3: Integrate the Custom Hook
Use the custom hook in your components where HumeAI calls are made.

Summary
Updated the HumeAI call logic to create a memory and retrieve relevant memories to use as context.
Create a custom hook to manage the memory creation and retrieval process.
Integrate the custom hook into your component to handle HumeAI calls.

This setup ensures that every time you make a call with HumeAI, it creates memories and uses that context in the call.

---

const MemoryClient = require('mem0ai');

const client = new MemoryClient('your-api-key');

// Store user preference

const messages = [

    {"role": "user", "content": "Hi, I'm Alex. I'm a vegetarian and I'm allergic to nuts."},

    {"role": "assistant", "content": "Hello Alex! I've noted that you're a vegetarian and have a nut allergy."}

];

// Later, retrieve and use the preference

client.add(messages, { user_id: "alex" })

    .then(response => console.log(response))

    .catch(error => console.error(error));

// Output: Retrieved: The user has a nut allergy.

here's a concise overview of how to work with memories in Mem0.ai using JavaScript:

# Searching Memories:
const query = "What can I cook for dinner tonight?";
client.search(query, { user_id: "alex" })
    .then(results => console.log(results))
    .catch(error => console.error(error));

# Advanced Search with Filters:
const query = "What do you know about me?";
const filters = {
   "AND": [
      { "user_id": "alex" },
      { "agent_id": { "in": ["travel-assistant", "customer-support"] } }
   ]
};
client.search(query, { version: "v2", filters })
    .then(results => console.log(results))
    .catch(error => console.error(error));

# Retrieving All Memories:
client.getAll({ user_id: "alex" })
    .then(memories => console.log(memories))
    .catch(error => console.error(error));

# Adding and Updating Memories:
let messages = [{ role: "user", content: "I recently tried chicken and I loved it." }];
client.add(messages, { user_id: "alex" })
    .then(result => {
        messages.push({ role: 'user', content: 'I turned vegetarian now.' });
        return client.add(messages, { user_id: "alex" });
    })
    .then(result => console.log(result))
    .catch(error => console.error(error));

# Getting Memory History:
client.history(memoryId)
    .then(history => console.log(history))
    .catch(error => console.error(error));

These methods allow you to interact with Mem0.ai's memory system, enabling you to search, retrieve, add, and update memories for users or AI agents. The system supports custom filters, date ranges, and different output formats to suit various use cases.
