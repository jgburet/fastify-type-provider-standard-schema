import {
    defaultMapper,
    FastifySwaggerTransformValidationSchemaError,
} from "fastify-swagger-transform-validation-schema";
import z from "zod";

import type { JSONSchemaMapper } from "fastify-swagger-transform-validation-schema";
import type { ZodType } from "zod";

export function zodMapper(schema: Parameters<JSONSchemaMapper<ZodType>>[0]) {
    return z.toJSONSchema(schema) as ReturnType<JSONSchemaMapper<ZodType>>;
}

export function customMapper<T = unknown>(
    schema: Parameters<JSONSchemaMapper<T>>[0],
): ReturnType<JSONSchemaMapper<T>> {
    for (const mapper of [defaultMapper, zodMapper]) {
        try {
            // biome-ignore lint/suspicious/noExplicitAny: ouin ouin any
            return mapper(schema as any);
        } catch (e: unknown) {
            if (e instanceof FastifySwaggerTransformValidationSchemaError) continue;
        }
    }
    throw new Error("Do not know how to transform validation schema");
}
