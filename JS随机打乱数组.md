# JS 随机打乱数组

## 方法一

```javascript
arr.sort(() => 0.5 - Math.random());
```

## 方法二

```javascript
let getRandomInt = (min, max) =>
  Math.floor(Math.random() * (min + max + 1)) + min;

let getRandomInt2 = (min, max) =>
  parseInt(Math.random() * (min + max + 1), 10) + min;

function randomArr(arr) {
  let l = arr.length;
  for (let i = 0; i < l; i++) {
    let j = getRandomInt(0, l - 1);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
```

