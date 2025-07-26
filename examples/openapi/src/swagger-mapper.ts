import {
    defaultMapper,
    FastifySwaggerTransformValidationSchemaError,
} from "fastify-swagger-transform-validation-schema";
import z from "zod";

import type { ZodType } from "zod";

export function zodMapper(schema: unknown, propertyName: string) {
    return z.toJSONSchema(schema as ZodType);
}

export function mapperForBothZodAndArk(schema: unknown, propertyName: string) {
    for (const mapper of [defaultMapper, zodMapper]) {
        try {
            return mapper(schema, propertyName);
        } catch (e: unknown) {
            if (e instanceof FastifySwaggerTransformValidationSchemaError) continue;
        }
    }
    throw new Error("Do not know how to transform validation schema");
}
