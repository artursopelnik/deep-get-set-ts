import { deep } from "./src";

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
