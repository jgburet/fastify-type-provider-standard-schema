import {
    FastifyTypeProviderStandardSchemaError,
    FastifyTypeProviderStandardSchemaValidationError,
} from "./errors";
import { isThenable } from "./helpers";

import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { FastifySchemaCompiler } from "fastify";

export type StandardSchemaValidatorCompilerOptions = Parameters<
    FastifySchemaCompiler<StandardSchemaV1>
>[0];
export type StandardSchemaValidatorCompilerReturnType = ReturnType<
    FastifySchemaCompiler<StandardSchemaV1>
>;
export function standardSchemaValidatorCompiler({
    schema,
}: StandardSchemaValidatorCompilerOptions): StandardSchemaValidatorCompilerReturnType {
    return (value: unknown) => {
        const out = schema["~standard"].validate(value);

        if (isThenable(out)) {
            throw new FastifyTypeProviderStandardSchemaError("Promise not supported");
        }

        if (out.issues) {
            return {
                error: new FastifyTypeProviderStandardSchemaValidationError(
                    out.issues.at(0)?.message,
                    {
                        cause: out.issues,
                    },
                ),
            };
        }

        return { value: out.value };
    };
}
