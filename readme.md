# Fastify Type-Provider Standard-Schema

A flexible Fastify type provider that works with **any** validation library implementing the [Standard Schema specification](https://github.com/standard-schema/standard-schema). Instead of being locked into a specific validation library, choose from multiple compatible options while maintaining full TypeScript type safety.

## Why use this?

- **Choose your preferred validation library** - Zod, Valibot, ArkType, Effect, or [any Standard Schema-compatible library](https://github.com/standard-schema/standard-schema?tab=readme-ov-file#what-schema-libraries-implement-the-spec)
- **Switch libraries easily** - Migrate between validation libraries without changing your Fastify setup
- **Maintain type safety** - Full TypeScript inference and compile-time type checking
- **Future-proof** - New libraries adopting Standard Schema work automatically

## Usage

```typescript
import {
    standardSchemaSerializerCompiler
    standardSchemaValidatorCompiler,
    type StandardSchemaTypeProvider
} from 'fastify-type-provider-standard-schema';

const server = fastify()
    .withTypeProvider<StandardSchemaTypeProvider>()
    .setSerializerCompiler(standardSchemaSerializerCompiler)
    .setValidatorCompiler(standardSchemaValidatorCompiler);

server.get('/route', {
    schema: {
        params: ... // your StandardSchema definition
    }
})
// ...
```
