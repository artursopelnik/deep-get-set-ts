# DeepGetSetTS

**Deeply get or set values in objects using dot-notation strings — with full type safety.**

## ✨ Features

- ✅ Access and modify deeply nested values using dot-notation **or path arrays**
- 🔒 Fully **type-safe** thanks to advanced TypeScript typing
- 🧩 Works with **objects**, **arrays**, and **records**
- 🛡️ Handles **undefined paths** gracefully
- 🚨 Optional **strict mode** for initializing missing paths
- 🌀 Smart **merging** of nested structures
- ⚡ High-performance, **zero dependencies**, 706 Bytes (minified)
- 📦 Written in **pure TypeScript**
- 🧠 Merged output preserves **correct typings**

## 📌 Example

```js
import { deep } from "deep-get-set-ts";

const obj = {
  foo: {
    bar: "baz",
    "foo.baz": "qux",
  },
};

// Get
console.log(deep(obj, "foo.bar"));
// => "bar"

// Get with array
console.log(deep(obj, ["foo", "foo.baz"]));
// => "qux"

// Set
deep(obj, "foo.bar", "hello");
console.log(obj.foo.bar);
// => "hello"

// Set with array
deep(obj, ["foo", "foo.baz"], "goodbye");
console.log(obj.foo["foo.baz"]);
// => "goodbye"
```

## API

### deep(object, path[, value], strict)

Where `path` is a dot-notation string `foo.bar` or an array of strings.

- If `value` is passed it will be set on the path.
- Set `strict = true` if you want non-existent paths to be initialized.
- If you want to unset (or delete), pass `undefined` as the `value`.

## Installation

### npm

```sh
# Install with npm
npm install deep-get-set-ts

# Install with pnpm
pnpm add deep-get-set-ts

# Install with yarn
yarn add deep-get-set-ts

# Install with bun
bun add deep-get-set-ts
```

### npm

```sh
# Install with npm
npm install deep-get-set-ts

# Install with pnpm
pnpm add deep-get-set-ts

# Install with yarn
yarn add deep-get-set-ts

# Install with bun
bun add deep-get-set-ts
```

## Note

There's a dozen modules like this on [npm](https://npmjs.org).
This is a fork from [@juliangruber's](https://github.com/juliangruber) [deep-access](https://github.com/juliangruber/deep-access) module, with a big portion of code directly copied from here: https://github.com/substack/js-traverse/blob/master/index.js#L11-L18.

Similar modules:

- https://github.com/deoxxa/dotty (this one I like because it uses recursion)
- https://github.com/Ntran013/dot-access (pretty much the same as this)
- https://github.com/substack/js-traverse (much more complex and useful)

## License

MIT
