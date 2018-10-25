// eslint-disable-next-line no-extend-native
Array.prototype.toObject = function(valueFnOrKeyFn, valueFn) {
  let keyFn = valueFnOrKeyFn;
  if(!valueFn) {
    keyFn = item => item;
    valueFn = valueFnOrKeyFn;
  }

  const result = {};
  for(const item of this) {
    result[keyFn(item)] = valueFn(item);
  }

  return result;
};

// eslint-disable-next-line no-extend-native
Object.prototype.toArray = function(valueFn) {
  return Object.keys(this).map(key => valueFn(key, this[key]));
};
