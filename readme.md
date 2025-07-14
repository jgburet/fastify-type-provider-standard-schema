# Fastify Type-Provider Standard-Schema

A flexible Fastify type provider that works with **any** validation library implementing the [Standard Schema specification](https://github.com/standard-schema/standard-schema). Instead of being locked into a specific validation library, choose from multiple compatible options while maintaining full TypeScript type safety.

## Why use this?

- **Choose your preferred validation library** - Zod, Valibot, ArkType, Effect, or [any Standard Schema-compatible library](https://github.com/standard-schema/standard-schema?tab=readme-ov-file#what-schema-libraries-implement-the-spec)
- **Switch libraries easily** - Migrate between validation libraries without changing your Fastify setup
- **Maintain type safety** - Full TypeScript inference and compile-time type checking
- **Future-proof** - New libraries adopting Standard Schema work automatically

## Usage

```typescript
import fastify from "fastify";
import { z } from "zod";
import {
    standardSchemaValidatorCompiler,
    standardSchemaSerializerCompiler,
} from "fastify-type-provider-standard-schema";

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
        // Fully typed: request.params.id, request.query.include
        return {
            id: request.params.id,
            name: "John Doe",
            email: "john@example.com",
            include: request.query.include,
        };
    },
);
```

**Try it:** [http://localhost:3000/users/123](http://localhost:3000/users/123) or [http://localhost:3000/users/123?include=profile](http://localhost:3000/users/123?include=profile)

*Using Zod here, but works identically with Valibot, ArkType, Effect Schema, or any Standard Schema library - just swap the schema definitions.*

## Examples

Find complete examples using different Standard Schema libraries in the [examples](./examples) directory:

- [ArkType example](./examples/arktype) - Showcasing ArkType's unique syntax and features
- [OpenAPI integration](./examples/openapi) - Generate OpenAPI docs with fastify-swagger, fastify-swagger-ui, and Scalar UI.

## Going further...

Using [fastify-swagger](https://github.com/fastify/fastify-swagger) to document your routes? Check out [fastify-swagger-transform-validation-schema]() - it transforms validation schemas from various libraries into JSON Schema format for OpenAPI documentation.

See the [complete example](./examples/openapi) showing both packages working together.
