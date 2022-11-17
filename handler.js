function convertJson(originData, data) {
    const result = {};
    originData &&
      Object.entries(originData).forEach(([key, value]) => {
        if (typeof value === 'string' && /abc/.test(value)) {
          result[key] = convertString(value, data);
        } else if ({}.toString.call(value) === '[object Array]') {
          // 数组，遍历每个元素看下是否还有需要转换的
          result[key] = convertArray(value, data);
        } else if ({}.toString.call(value) === '[object Object]') {
          // json，递归看下里层是否还有需要转换的
          result[key] = convertJson(value, data);
        } else {
          result[key] = value;
        }
      });
    return result;
  }
  
  function convertString(originValue, data) {
    return '';
  }
  
  function convertArray(originValue, data) {
    return originValue.map((v) => {
      if (typeof v === 'string' && /abc/.test(v)) {
        return convertString(v, data);
      }
  
      if ({}.toString.call(v) === '[object Object]') {
        return convertJson(v, data);
      }
  
      if ({}.toString.call(v) === '[object Array]') {
        return convertArray(v, data);
      }
  
      return v;
    });
  }
  
  // 占位符变量替换成值
  function replaceParam(str, data) {
    const keys = str.match(/(?=<{{)?(\w+(?=\.)?)+(?=}})?/g);
  
    if (!keys) {
      return '';
    }
  
    // 丢掉第一个元素
    keys.shift();
  
    let result = data;
    keys.forEach((v) => {
      result = typeof result === 'object' && Object.keys(result).includes(v) ? result[v] : '';
    });
    return result;
  }