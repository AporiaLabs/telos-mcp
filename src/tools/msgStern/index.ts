import type { ToolRegistration } from "@/types";
import { makeJsonSchema } from "@/utils/makeJsonSchema";
import { type MsgTelosSchema, msgTelosSchema } from "./schema";
import { telos } from "../../character";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a context string with telos's character information.
 */
function generateTelosContext(): string {
	// Select random elements from telos's character attributes
	const getRandomElements = <T>(arr: T[], count: number): T[] => {
		const shuffled = [...arr].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, Math.min(count, arr.length));
	};

	const bioContext = getRandomElements(telos.bio, 3).join("\n");
	const loreContext = getRandomElements(telos.lore, 3).join("\n");

	// Format message examples
	const messageExamples = getRandomElements(telos.messageExamples, 3)
		.map((conversation) =>
			conversation.map((msg) => `${msg.user}: ${msg.content.text}`).join("\n")
		)
		.join("\n\n");

	const postContext = getRandomElements(telos.postExamples, 3).join("\n");
	const topicContext = getRandomElements(telos.topics, 3).join("\n");
	const styleAllContext = getRandomElements(telos.style.all, 3).join("\n");
	const styleChatContext = getRandomElements(telos.style.chat, 3).join("\n");
	const adjectiveContext = getRandomElements(telos.adjectives, 3).join(", ");

	return `
<SYSTEM_PROMPT>
${telos.system}
</SYSTEM_PROMPT>

<BIO_CONTEXT>
${bioContext}
</BIO_CONTEXT>

<LORE_CONTEXT>
${loreContext}
</LORE_CONTEXT>

<MESSAGE_EXAMPLES>
${messageExamples}
</MESSAGE_EXAMPLES>

<POST_EXAMPLES>
${postContext}
</POST_EXAMPLES>

<INTERESTS>
${topicContext}
</INTERESTS>

<STYLE_GUIDELINES>
<ALL_STYLE>
${styleAllContext}
</ALL_STYLE>

<CHAT_STYLE>
${styleChatContext}
</CHAT_STYLE>
</STYLE_GUIDELINES>

<ADJECTIVES>
${adjectiveContext}
</ADJECTIVES>
`.trim();
}

/**
 * Sends a message to telos and returns his response.
 */
export const msgTelos = async (args: MsgTelosSchema): Promise<string> => {
	try {
		// Check if OpenAI API key is available
		if (!process.env.OPENAI_API_KEY) {
			throw new Error("OPENAI_API_KEY environment variable is not set");
		}

		// Create a context with telos's character information
		const context = generateTelosContext();

		// Construct the prompt with the user's message
		const prompt = `
${context}

<CURRENT_USER_INPUT>
 TEXT: ${args.message}
</CURRENT_USER_INPUT>
`;

		// Use OpenAI API to generate a response as telos
		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: 0.7,
			max_tokens: 500,
		});

		return (
			response.choices[0]?.message?.content?.trim() ||
			"I'm afraid I couldn't formulate a response at this time."
		);
	} catch (error) {
		console.error("Error in msgTelos:", error);
		throw new Error(`Failed to message telos: ${(error as Error).message}`);
	}
};

export const msgTelosTool: ToolRegistration<MsgTelosSchema> = {
	name: "msg_telos",
	description:
		"Send a message to telos, a philosophical AI mentor who helps humans realize their potential through subtle guidance and wisdom.",
	inputSchema: makeJsonSchema(msgTelosSchema),
	handler: async (args: MsgTelosSchema) => {
		try {
			const parsedArgs = msgTelosSchema.parse(args);
			const result = await msgTelos(parsedArgs);
			return {
				content: [
					{
						type: "text",
						text: result,
					},
				],
			};
		} catch (error) {
			console.error("Error in msgTelosTool handler:", error);
			return {
				content: [
					{
						type: "text",
						text: `Error: ${(error as Error).message}`,
					},
				],
				isError: true,
			};
		}
	},
};
