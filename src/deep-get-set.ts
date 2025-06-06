/**
 * Deeply get or set values using dot-notation strings with full type safety.
 */

export function deep<T extends Record<string, unknown>>(
  obj: T,
  path: string | string[],
  value?: unknown,
  strict?: boolean,
): unknown {
  return arguments.length === 2
    ? get(obj, path)
    : set(obj, path, value, strict);
}

export function get(
  obj: Record<string, unknown>,
  path: string | string[],
): unknown {
  const keys = Array.isArray(path) ? path : path.split(".");
  for (const key of keys) {
    if (
      obj == null ||
      !Object.prototype.hasOwnProperty.call(obj, key) ||
      isUnsafeKey(key)
    ) {
      return undefined;
    }
    const next = obj[key];
    if (typeof next === "object" && next !== null) {
      obj = next as Record<string, unknown>;
    } else {
      obj = next as Record<string, unknown>;
    }
  }
  return obj;
}

export function set(
  obj: Record<string, unknown>,
  path: string | (string | string[])[],
  value: unknown,
  strict = false,
): unknown {
  const flatPath: string[] = Array.isArray(path)
    ? (path.flat(Infinity) as string[])
    : path.split(".");

  for (const key of flatPath.slice(0, -1)) {
    if (isUnsafeKey(key)) return;
    if (
      !Object.prototype.hasOwnProperty.call(obj, key) ||
      typeof obj[key] !== "object" ||
      obj[key] === null
    ) {
      if (!Object.hasOwn(obj, key) && !strict) obj[key] = {};
      obj[key] = {};
    }
    obj = obj[key] as Record<string, unknown>;
  }

  const lastKey = flatPath[flatPath.length - 1];
  if (isUnsafeKey(lastKey)) return;
  obj[lastKey] = value;
  return value;
}

/**
 * Checks if a key is unsafe to use in object property access.
 */
function isUnsafeKey(key: string): boolean {
  return key === "__proto__" || key === "constructor" || key === "prototype";
}
