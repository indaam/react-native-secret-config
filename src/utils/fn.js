/*
 * Function collection
 */

const FN = {};
FN.isEmpty = param => {
  try {
    let type = param.constructor.toString();
    if (type.indexOf('Object') > 0) {
      return Object.keys(param).length === 0;
    }
    if (type.indexOf('Array') > 0 || type.indexOf('String') > 0) {
      return param.length ? false : true;
    }
  } catch (e) {}

  return false;
};

FN.toJson = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
  return null;
};

FN.getLastArray = arr => {
  if (arr && arr.length) {
    return arr[arr.length - 1];
  }
};

FN.validateValue = val => {
  if (val === 'true') {
    return true;
  }
  if (val === 'false') {
    return false;
  }

  if (!/[^0-9]/g.test(val)) {
    return parseInt(val);
  }

  return val;
};

FN.getOptionParam = arg => {
  let option = {};
  arg.forEach(function(val, index, array) {
    if (val.indexOf('=') > 0) {
      val = val.split('=');
      option[val[0]] = FN.validateValue(val[1]);
    }
  });
  return option;
};

FN.updateObject = (from = {}, to = {}) => {
  Object.keys(to).forEach(function(key) {
    from[key] = to[key];
  });
  return from;
};

FN.replaceToSpace = function(str) {
  return str.replace(/(.)-(.)/g, function(a, b, c) {
    return b + ' ' + c;
  });
};

FN.filterData = function(data, key, regexStr) {
  const regex = new RegExp(regexStr, 'i');
  return data.filter(function(data) {
    if (!regex.test(data[key])) {
      return data;
    }
  });
};

module.exports = FN;
