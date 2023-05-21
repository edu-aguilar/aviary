export function isObject(value: unknown): value is { [key: string]: unknown } {
  return value instanceof Object;
}
