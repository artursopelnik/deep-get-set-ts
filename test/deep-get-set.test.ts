import { describe, expect, it } from "vitest";

import deep, { get, set } from '../src';

describe("deep-get-set", () => {
  it("default export", () => {
    const obj: Record<string, any> = {};
    expect(deep(obj, "foo.bar", "baz")).toBe("baz");
    expect(obj.foo.bar, "baz");
    expect(deep(obj, "foo.bar")).toBe("baz");
  });
  it("deep gets", () => {
    const obj = {
      foo: "bar",
      bar: {
        baz: {
          beep: "boop",
        },
      },
    };

    expect(get(obj, "foo")).toBe("bar");
    expect(get(obj, "bar.baz.beep")).toBe("boop");
    expect(get(obj, "bar.baz.beep.yep.nope")).toBe(undefined);
  });
  it("deep gets with array of paths", () => {
    const obj = {
      foo: "bar",
      bar: {
        baz: {
          beep: "boop",
        },
        "baz.beep": "blop",
      },
    };
    expect(get(obj, ["bar", "baz", "beep"])).toBe("boop");
    expect(get(obj, ["bar", "baz", "beep", "yep", "nope"])).toBe(undefined);
    expect(get(obj, ["bar", "baz.beep"])).toBe("blop");
  });
  it("deep sets", () => {
    const obj: Record<string, any> = {
      foo: "bar",
      bar: {
        baz: {
          beep: "boop",
        },
      },
    };
    expect(set(obj, "foo", "yep")).toBe("yep");
    expect(obj.foo, "yep");
    expect(set(obj, "bar.baz.beep", "nope")).toBe("nope");
    expect(obj.bar.baz.beep, "nope");
    expect(set(obj, "yep.nope", "p")).toBe("p");
    expect(obj.yep.nope).toBe("p");
  });
  it("deep sets, strict", () => {
    const obj: Record<string, any> = {};
    expect(() => set(obj, "yep.nope", "p", true)).toThrowError();
  });
  it("deep sets with array of paths", () => {
    const obj = {
      foo: "bar",
      bar: {
        baz: {
          beep: "boop",
        },
      },
    };

    expect(set(obj, "foo", "yep")).toBe("yep");
    expect(obj.foo, "yep");
    expect(set(obj, ["bar", "baz", "beep"], "nope")).toBe("nope");
    expect(obj.bar.baz.beep, "nope");
    expect(set(obj, ["bar", "baz.beep"], "nooope")).toBe("nooope");
    expect(obj.bar["baz.beep"], "nooope");
  });
  it("deep deletes", () => {
    const obj = {
      foo: "bar",
      bar: {
        baz: {
          beep: "boop",
        },
      },
    };

    expect(set(obj, "foo", undefined)).toBe(undefined);
    expect(obj.foo).toBeFalsy();
    expect(set(obj, "bar.baz", undefined)).toBe(undefined);
    expect(obj.bar.baz).toBeFalsy();
    expect(get(obj, "bar.baz.beep")).toBe(undefined);
  });
  it("no prototype pollution", () => {
    const obj = {};

    set(obj, ["__proto__", "a"], 1);
    set(obj, [["__proto__"], "b"], 2);
    set(obj, "constructor.prototype.c", 3);

    expect(globalThis.a, undefined);
    expect(globalThis.b, undefined);
    expect(globalThis.c, undefined);

    expect(get(obj, "__proto__.toString"), undefined);
    expect(get(obj, "constructor.prototype.toString"), undefined);
  });
});
