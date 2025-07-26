import { type } from "arktype";
import fastify from "fastify";
import {
    standardSchemaValidatorCompiler,
    standardSchemaSerializerCompiler,
} from "fastify-type-provider-standard-schema";

import type { StandardSchemaTypeProvider } from "fastify-type-provider-standard-schema";

const server = fastify()
    .withTypeProvider<StandardSchemaTypeProvider>()
    .setSerializerCompiler(standardSchemaSerializerCompiler)
    .setValidatorCompiler(standardSchemaValidatorCompiler);

server.get(
    "/hello",
    {
        schema: {
            querystring: type({
                name: type("string").default("world"),
                "+": "delete",
            }),
        },
    },
    ({ query }) => {
        return { message: `Hello, ${query.name}!`, query };
    },
);

const x = await server.listen({ port: 3000 });
console.log(`${x}/hello`);
console.log(`${x}/hello?name=foo&extra=nope&extraextra=nopenope`);
