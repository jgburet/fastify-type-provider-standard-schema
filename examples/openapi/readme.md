# OpenAPI Integration Example

This example demonstrates the complete integration of `fastify-type-provider-standard-schema` with `fastify-swagger-transform-validation-schema` to generate OpenAPI documentation from multiple validation packages.

## What this example shows

- **Multi-package support**: Using both Zod and ArkType in the same application
- **OpenAPI generation**: Automatic OpenAPI 3.0 documentation from validation schemas
- **Multiple UIs**: Both Swagger UI and Scalar UI for API documentation
- **Custom mappers**: How to create mappers that support multiple validation packages
- **Type safety**: Full TypeScript inference across different schema packages

## Running the Example

```bash
pnpm install
pnpm build
pnpm start
```

## Explore the APIs

Once running, you can access:

### API Endpoints

#### Zod Routes
```bash
# Get user by ID
curl http://localhost:3000/zod/123
curl http://localhost:3000/zod/123?include=profile
```

#### ArkType Routes
```bash
# Get user by ID (ArkType validation)
curl http://localhost:3000/arktype/456
curl http://localhost:3000/arktype/456?include=posts
```

### Documentation UIs

- **Swagger UI**: http://localhost:3000/swagger-ui
- **Scalar UI**: http://localhost:3000/scalar-ui

## Troubleshooting

### Schemas not appearing in docs

Check the transform function is registered:
```typescript
server.register(fastifySwagger, {
    transform: fastifySwaggerTransform(yourMapper) // the mapper may be optional
});
```

Check your routes are defined within `.register`:
```typescript
server
    .register(myRoutes, { prefix: "/foo" })
```

### Mapper errors

Test your mapper independently:
```typescript
console.log(mapperForBothZodAndArk(mySchema, "body"));
// Should output valid JSON Schema
```

## Learn More

- [fastify-type-provider-standard-schema](../../readme.md)
- [fastify-swagger-transform-validation-schema](https://github.com/jgburet/fastify-swagger-transform-validation-schema)
- [@fastify/swagger Documentation](https://github.com/fastify/fastify-swagger)
