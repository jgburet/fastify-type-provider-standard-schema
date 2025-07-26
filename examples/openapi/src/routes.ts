import { type } from "arktype";
import { z } from "zod";

import type { FastifyInstance } from "./index.js";

export async function routesWithArktype(server: FastifyInstance) {
    server.get(
        "/:id",
        {
            schema: {
                params: type({ id: "string" }),
                querystring: type({
                    "include?": "('profile'|'posts')",
                    "+": "delete",
                }),
                response: {
                    200: type({
                        id: "string",
                        name: "string",
                        email: "string",
                        "include?": "string",
                        "+": "delete",
                    }),
                },
            },
        },
        ({ params, query }) => {
            return {
                id: params.id,
                name: "John Doe",
                email: "john@example.com",
                // Ark does not let you pass undefined values here
                ...(query.include && { include: query.include }),
            };
        },
    );
}

export async function routesWithZod(server: FastifyInstance) {
    server.get(
        "/:id",
        {
            schema: {
                params: z.object({
                    id: z.string(),
                }),
                querystring: z.object({
                    include: z.enum(["profile", "posts"]).optional(),
                }),
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string(),
                        include: z.string().optional(),
                    }),
                },
            },
        },
        ({ params, query }) => {
            return {
                id: params.id,
                name: "John Doe",
                email: "john@example.com",
                include: query.include,
            };
        },
    );
}
