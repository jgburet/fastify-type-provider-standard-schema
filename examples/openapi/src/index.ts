import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastifyScalarUi from "@scalar/fastify-api-reference";
import { type } from "arktype";
import fastify from "fastify";
import { fastifySwaggerTransform } from "fastify-swagger-transform-validation-schema";
import {
    standardSchemaValidatorCompiler,
    standardSchemaSerializerCompiler,
} from "fastify-type-provider-standard-schema";

import { routesWithArktype, routesWithZod } from "./routes.js";
import { mapperForBothZodAndArk } from "./swagger-mapper.js";

import type { StandardSchemaTypeProvider } from "fastify-type-provider-standard-schema";

const server = fastify()
    .withTypeProvider<StandardSchemaTypeProvider>()
    .setSerializerCompiler(standardSchemaSerializerCompiler)
    .setValidatorCompiler(standardSchemaValidatorCompiler);

/* For convenience, use this type when defining routers (cf ./routes.ts),
so you don't have to specify again the type provider. */
export type FastifyInstance = typeof server;

/* Registering plugins... */
server
    .register(fastifySwagger, { transform: fastifySwaggerTransform(mapperForBothZodAndArk) })
    .register(fastifySwaggerUi, { routePrefix: "/swagger-ui" })
    .register(fastifyScalarUi, { routePrefix: "/scalar-ui" });

/* Registering routes... */
server
    .register(routesWithArktype, { prefix: "/arktype" })
    .register(routesWithZod, { prefix: "/zod" });

// Routes defined outside of a Fastify plugin are not documented by fastify-swagger.
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
console.log(`${x}/swagger-ui`);
console.log(`${x}/scalar-ui`);
