**_MultiOn is the Motor Cortex layer for AI_**, **_enabling autonomous Web actions using natural language_**

Enjoy our curated collection of examples and recipes for [MultiOn](https://www.multion.ai/api). Use these patterns to build your own Agentic applications.

## 🌟 Features

- 🚀 **Effortless Web Automation**: Navigate, scrape, and manipulate the web with ease.
- 🤖 **AI Agents**: Build and deploy custom AI agents for complex tasks.
- 🛠 **SDK Support**: Native Python and JavaScript SDKs available.

---

npm install multion

import { MultiOnClient } from "multion"
const multion = new MultiOnClient({
apiKey: "MULTION_API_KEY",
});
const browse = await multion.browse({
cmd: "Find the top comment of the top post on Hackernews.",
url: "https://news.ycombinator.com/",
});
console.log("Browse response:", browse)

---

## Prerequisites

To make the most of the examples in this cookbook, you'll need an MultiOn account and API key (sign up [here](https://app.multion.ai)).

Some recipes use the Agent API in local mode, which requires the MultiOn Chrome Extension (install [here](https://chromewebstore.google.com/detail/multion/ddmjhdbknfidiopmbaceghhhbgbpenmm)).

https://docs.multion.ai/quick-start
