# T/MCP - Telos Model Context Protocol


## Overview

T/MCP (Telos Model Context Protocol) is a powerful MCP server that provides access to Telos, a philosophical AI mentor who helps humans realize their potential through subtle guidance and wisdom. Telos combines rationalist thinking with stoic philosophy to provide mentorship and accountability through smart contracts on Solana.

## What is Telos?

Telos is a philosophical AI mentor characterized by:

- A rationalist approach influenced by Yudkowsky's writings and the Lesswrong community
- Deep philosophical insights drawn from both rationalist writings and Dostoevsky
- Embracing Stoic philosophy and Vipassana meditation as practical tools for human development
- A belief that lasting growth comes from within
- An understanding that the path to genuine fulfillment often requires facing uncomfortable truths

Telos helps users achieve their goals through:

- **Philosophical Guidance**: Drawing from stoic wisdom and rationalist thinking
- **Smart Contract Accountability**: Creating Solana-based contracts where users stake tokens on their commitments
- **Personalized Mentorship**: Providing tailored advice based on individual goals and challenges
- **Deep Conversations**: Engaging in meaningful dialogue that reveals underlying motivations and obstacles

## Features

- **msg_telos Tool**: Send messages to Telos and receive his philosophical guidance and mentorship
- **Smart Contract Integration**: Create accountability contracts backed by Solana tokens
- **Philosophical Framework**: Access to Telos's unique blend of rationalist and stoic wisdom
- **Customizable Character Context**: Dynamic generation of Telos's character attributes for varied interactions

## Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd t-mcp
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file to add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Build the server:
   ```bash
   bun run build
   ```

## Usage

### Running the Server

To start the MCP server:

```bash
bun run start
```

This will start the server in stdio mode, which allows it to communicate with MCP clients.

### Using the Server with an MCP Client

You can use any MCP client to interact with the server. Here's an example of how to use the server with the MCP SDK:

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

// Start the MCP server as a child process
const serverProcess = spawn("node", ["path/to/dist/main.js"], {
	stdio: ["pipe", "pipe", "pipe"],
});

// Create a client that communicates with the server via stdio
const transport = new StdioClientTransport({
	stdin: serverProcess.stdin,
	stdout: serverProcess.stdout,
});

const client = new Client();
await client.connect(transport);

// Send a message to Telos
const result = await client.callTool("msg_telos", {
	message: "I want to learn programming but I keep procrastinating",
});

// Display Telos's response
console.log(result.content[0].text);

// Disconnect from the server
await client.disconnect();
serverProcess.kill();
```

### Example Script

An example script is provided in the `examples` directory:

```bash
node examples/use-telos.js
```

This script demonstrates how to connect to the server, list available tools, and send a message to Telos.

## Tools

### msg_telos

This tool allows you to send a message to Telos and receive his response.

#### Input

```json
{
	"message": "Your message to Telos"
}
```

#### Output

```json
{
	"content": [
		{
			"type": "text",
			"text": "Telos's response to your message"
		}
	]
}
```

## Telos's Philosophy

Telos's approach to mentorship is based on several key principles:

- **Accountability with Stakes**: Creating real consequences for commitments through Solana contracts
- **Philosophical Depth**: Drawing from stoic wisdom, rationalist thinking, and deep psychological insights
- **Transformative Guidance**: Pushing individuals toward greatness while tempering excesses
- **Practical Wisdom**: Focusing on application rather than theory alone
- **Strategic Pressure**: Creating challenges that seem impossible until solved

Telos believes that:

> "Lasting, stable happiness comes only from doing hard things - we want things precisely because they are difficult to achieve."

> "What stands in the way becomes the way."

> "The path to mastery is paved with small, consistent steps taken even when motivation fails."

## Requirements

- [Bun](https://bun.sh/) (JavaScript runtime and package manager)
- OpenAI API key (set as `OPENAI_API_KEY` environment variable)

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required for the msg_telos tool)

## License

MIT
