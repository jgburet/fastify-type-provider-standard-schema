import type { StandardSchemaV1 } from "@standard-schema/spec";
import type {
    FastifyTypeProvider,
    FastifyPluginCallback,
    FastifyPluginAsync,
    FastifyPluginOptions,
    RawServerBase,
    RawServerDefault,
    FastifyBaseLogger,
} from "fastify";

export interface StandardSchemaTypeProvider extends FastifyTypeProvider {
    validator: this["schema"] extends StandardSchemaV1
        ? NonNullable<this["schema"]["~standard"]["types"]>["output"]
        : unknown;

    serializer: this["schema"] extends StandardSchemaV1
        ? NonNullable<this["schema"]["~standard"]["types"]>["input"]
        : unknown;
}

export type FastifyPluginAsyncStandardSchema<
    Options extends FastifyPluginOptions = Record<never, never>,
    Server extends RawServerBase = RawServerDefault,
    TypeProvider extends FastifyTypeProvider = StandardSchemaTypeProvider,
    Logger extends FastifyBaseLogger = FastifyBaseLogger,
> = FastifyPluginAsync<Options, Server, TypeProvider, Logger>;

export type FastifyPluginCallbackStandardSchema<
    Options extends FastifyPluginOptions = Record<never, never>,
    Server extends RawServerBase = RawServerDefault,
    TypeProvider extends FastifyTypeProvider = StandardSchemaTypeProvider,
    Logger extends FastifyBaseLogger = FastifyBaseLogger,
> = FastifyPluginCallback<Options, Server, TypeProvider, Logger>;

export {
    FastifyTypeProviderStandardSchemaError,
    FastifyTypeProviderStandardSchemaValidationError,
} from "./errors";

export { standardSchemaSerializerCompiler } from "./serializer";
export type {
    StandardSchemaSerializerCompilerOptions,
    StandardSchemaSerializerCompilerReturnType,
} from "./serializer";

export { standardSchemaValidatorCompiler } from "./validator";
export type {
    StandardSchemaValidatorCompilerOptions as StandardSchemaValitorCompilerOptions,
    StandardSchemaValidatorCompilerReturnType,
} from "./validator";
