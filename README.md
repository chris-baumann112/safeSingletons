# safeSingletons
Safely use singletons in NodeJS

## Directions
safeSingletons is easy to use. Simply require the package in any file that needs access to a singleton.

```js
const safeSingletons = require('safesingletons');

console.log(safeSingletons()); // Calling safesingletons without arguments returns an array of current singleton keys

safeSingletons('test', {foo : 'bar'}); // Passing a key value pair will set a singleton instance if one does not already exist for the given key

console.log(safeSingletons('test')); // Passing a known key will return a deep copy of a singleton instance. The actual singleton instance will never mutate
```

