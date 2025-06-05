import type { ToolRegistration } from "@/types";
import { msgTelosTool } from "./msgTelos";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
	return [
		{
			...msgTelosTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => msgTelosTool.handler(args),
		},
	];
};
