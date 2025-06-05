import { describe, expect, it } from "bun:test";
import { msgTelosSchema } from "./schema";
import { msgTelos, msgTelosTool } from "./index";

describe("msgTelos Tool", () => {
	it("should parse valid input", () => {
		const result = msgTelosSchema.safeParse({ message: "Hello Telos" });
		expect(result.success).toBe(true);
	});

	it("should reject empty messages", () => {
		const result = msgTelosSchema.safeParse({ message: "" });
		expect(result.success).toBe(false);
	});

	it("should have the correct name and description", () => {
		expect(msgTelosTool.name).toBe("msg_telos");
		expect(msgTelosTool.description).toContain("philosophical AI mentor");
	});

	it("should handle the main function", async () => {
		// Skip this test if OPENAI_API_KEY is not set or we're in CI
		if (!process.env.OPENAI_API_KEY || process.env.CI) {
			console.log("Skipping OpenAI API test in CI or without API key");
			return;
		}

		const output = await msgTelos({
			message: "I want to learn programming but I keep procrastinating",
		});
		expect(output).toBeTruthy();
		expect(typeof output).toBe("string");
	});

	it("should throw an error when OpenAI API key is not set", async () => {
		// Remove API key from environment
		const originalEnv = process.env.OPENAI_API_KEY;
		delete process.env.OPENAI_API_KEY;

		try {
			await expect(msgTelos({ message: "Hello" })).rejects.toThrow(
				"OPENAI_API_KEY environment variable is not set"
			);
		} finally {
			// Restore API key
			process.env.OPENAI_API_KEY = originalEnv;
		}
	});
});
