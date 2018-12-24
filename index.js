const privateObject = () => {
  const _this = {};

  const validateKey = key => {
    if (typeof key !== "string") {
      throw new Error("Key values must be of type string");
    } else if (!key.trim()) {
      throw new Error("Key values must not be an empty string");
    } else {
      return true;
    }
  };

  const get = key => {
    if (validateKey(key) && !_this[key])
      throw new Error(`${key} is not defined`);
    return factory(_this[key]);
  };

  const set = (key, value) => {
    if (validateKey(key) && _this[key])
      throw new Error(`${key} is already defined`);
    _this[key] = value;
  };

  const factory = originalObject => {
    let newObject = {};
    for (let key in originalObject) {
      if (
        originalObject[key] !== null &&
        typeof originalObject[key] === "object"
      ) {
        newObject[key] = factory(originalObject[key]);
      } else {
        newObject[key] = originalObject[key];
      }
    }
    return newObject;
  };

  return (key, value) => {
    if (key && value) {
      set(key, value);
    } else {
      return key ? get(key) : Object.keys(_this);
    }
  };
};

const safeSingletons = privateObject();

module.exports = safeSingletons;
