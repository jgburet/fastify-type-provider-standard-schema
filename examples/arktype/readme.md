# ArkType Example

This example demonstrates how to use `fastify-type-provider-standard-schema` with [ArkType](https://arktype.io/).

## What this example shows

- Setting up Fastify with StandardSchemaTypeProvider
- Using ArkType's unique string-based schema syntax
- Full TypeScript type inference from ArkType schemas
- Request validation and response serialization

## Running the Example

```bash
pnpm install
pnpm build
pnpm start
```

## Test the API

Once running, you can access:

### Hello Endpoint

```bash
curl http://localhost:3000/hello
curl http://localhost:3000/hello?name=ArkType
curl "http://localhost:3000/hello?name=ArkType&extra=value&more=data"
```

## Learn More

- [ArkType Documentation](https://arktype.io/docs)
- [ArkType GitHub](https://github.com/arktypeio/arktype)
- [Standard Schema Specification](https://github.com/standard-schema/standard-schema)
