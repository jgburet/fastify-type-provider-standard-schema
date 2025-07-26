# Fastify Type-Provider Standard-Schema

A flexible Fastify type provider that works with **any** validation package implementing the [Standard Schema specification](https://github.com/standard-schema/standard-schema). Instead of being locked into a specific validation package, choose from multiple compatible options while maintaining full TypeScript type safety.

## Why use this?

- **Choose your preferred validation package** - Zod, Valibot, ArkType, Effect, or [any Standard Schema-compatible package](https://github.com/standard-schema/standard-schema?tab=readme-ov-file#what-schema-packages-implement-the-spec)
- **Switch packages easily** - Migrate between validation packages without changing your Fastify setup
- **Maintain type safety** - Full TypeScript inference and compile-time type checking
- **Future-proof** - New packages adopting Standard Schema work automatically

## Installation

```bash
npm install fastify-type-provider-standard-schema
# or
pnpm add fastify-type-provider-standard-schema
```

You'll also need a Standard Schema compatible validation package:

```bash
# Choose one or more:
npm install zod
npm install arktype
npm install valibot
npm install @effect/schema
```

## Usage

```typescript
import fastify from "fastify";
import {
    standardSchemaValidatorCompiler,
    standardSchemaSerializerCompiler,
} from "fastify-type-provider-standard-schema";
import { z } from "zod";

import type { StandardSchemaTypeProvider } from "fastify-type-provider-standard-schema";

const server = fastify()
    .withTypeProvider<StandardSchemaTypeProvider>()
    .setValidatorCompiler(standardSchemaValidatorCompiler)
    .setSerializerCompiler(standardSchemaSerializerCompiler);

server.get(
    "/users/:id",
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
    async (request, reply) => {
        // Fully typed: request.params.id, request.query.include, and return
        return {
            id: request.params.id,
            name: "John Doe",
            email: "john@example.com",
            include: request.query.include,
        };
    },
);

await server.listen({ port: 3000 });
```

**Try it:** [http://localhost:3000/users/123](http://localhost:3000/users/123) or [http://localhost:3000/users/123?include=profile](http://localhost:3000/users/123?include=profile)

*Using Zod here, but works identically with Valibot, ArkType, Effect Schema, or any Standard Schema package - just swap the schema definitions.*

## Examples

Find complete examples using different Standard Schema packages in the [examples](./examples) directory:

- [ArkType example](./examples/arktype) - Showcasing ArkType's unique syntax and features
- [OpenAPI integration](./examples/openapi) - Generate OpenAPI docs with fastify-swagger, fastify-swagger-ui, and Scalar UI, and two different validation packages.

## Going further...

Using [fastify-swagger](https://github.com/fastify/fastify-swagger) to document your routes? Check out [fastify-swagger-transform-validation-schema](https://github.com/jgburet/fastify-swagger-transform-validation-schema) - it transforms validation schemas from various packages into JSON Schema format for OpenAPI documentation.

See the [complete example](./examples/openapi) showing both packages working together.
