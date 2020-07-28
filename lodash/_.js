const _ = {
  clamp(num, lowBound, upBound) {
    return Math.min(Math.max(num, lowBound), upBound);
  },
  inRange(num, start, end) {
    if (!end) {
      end = start;
      start = 0;
    }
    if (start > end) {
      [start, end] = [end, start];
    }
    return num >= start && num < end;
  },
  words(str) {
    return str.split(' ');
  },
  pad(str, len) {
    if (str.length >= len) {
      return str;
    } else {
      str_len = str.length;
      diff = len - str_len;
      return (
        ' '.repeat(Math.floor(diff / 2)) +
        str +
        ' '.repeat(diff - Math.floor(diff / 2))
      );
    }
  },
  has(obj, key) {
    return obj.hasOwnProperty(key);
  },
  invert(obj) {
    let new_obj = {};
    for (var key in obj) {
      new_obj[obj[key]] = key;
    }
    return new_obj;
  },
  findKey(obj, predicate_func) {
    for (var key in obj) {
      return predicate_func(obj[key]) ? key : undefined;
    }
  },
  drop(arr, num) {
    return !num ? arr.slice(1) : arr.slice(num);
  },
  dropWhile(array, predicate) {
    i = 0;
    while (predicate(array[i], i, array)) {
      i++;
      break;
    }
    return array.splice(i + 1);
  },
  chunk(array, size = 1) {
    newArr = [];
    for (let i = 0; i < array.length; i += size) {
      let arrayChunk = array.slice(i, i + size);
      newArr.push(arrayChunk);
    }
    return newArr;
  },
};

module.exports = _;
