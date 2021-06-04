# flatten

```javascript
// 数组深层降维 flatten([1,2,[3, [4, [5, 6]]]]) 输出[1,2,3,4,5,6]
const flatten = arr =>
  arr.reduce((x, y) => {
    if (Array.isArray(y)) {
      x.push(...flatten(y));
    } else {
      x.push(y);
    }
    return x;
  }, []);
```

```javascript
// add(1)(2)(3)(4)()
const add = (...args) => {
  const res = [];
  const func = (...args2) => {
    if (args2.length) {
      res.push(...args2);
      return func;
    } else {
      return res.reduce((x, y) => x + y, 0);
    }
  };
  return func(...args);
};
```

```javascript
// add(1)(2)(3)(4)()
const add = (...args) => {
  const res = [];
  const func = (...args2) => {
    res.push(...args2);
    return args2.length ? func : res.reduce((x, y) => x + y, 0);
  };
  return func(...args);
};
```

