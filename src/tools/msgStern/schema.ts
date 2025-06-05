import { z } from "zod";

export const msgTelosSchema = z.object({
	message: z
		.string()
		.min(1, "Message is required")
		.describe("The message to send to Telos"),
});

export type MsgTelosSchema = z.infer<typeof msgTelosSchema>;
