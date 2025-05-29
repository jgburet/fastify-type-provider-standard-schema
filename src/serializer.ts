import {
    FastifyTypeProviderStandardSchemaError,
    FastifyTypeProviderStandardSchemaValidationError,
} from "./errors";
import { isThenable } from "./helpers";

import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { FastifySerializerCompiler } from "fastify/types/schema";

export type StandardSchemaSerializerCompilerOptions = Parameters<
    FastifySerializerCompiler<StandardSchemaV1>
>[0];
export type StandardSchemaSerializerCompilerReturnType = ReturnType<
    FastifySerializerCompiler<StandardSchemaV1>
>;
export function standardSchemaSerializerCompiler({
    schema,
}: StandardSchemaSerializerCompilerOptions): StandardSchemaSerializerCompilerReturnType {
    return (value: unknown) => {
        const out = schema["~standard"].validate(value);

        if (isThenable(out)) {
            throw new FastifyTypeProviderStandardSchemaError("Promise not supported");
        }

        if (out.issues) {
            throw new FastifyTypeProviderStandardSchemaValidationError(
                "Response value does not validate schema",
                { cause: out.issues },
            );
        }

        return JSON.stringify(out);
    };
}
