export function isThenable(value: unknown): value is PromiseLike<unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        // biome-ignore lint/suspicious/noExplicitAny: need to access `.then` property on unknown type
        typeof (value as any).then === "function"
    );
}
