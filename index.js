// 节流
function throttle(func, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    let ctx = this;
    let args = arguments;
    timer = setTimeout(function () {
      func.apply(ctx, ...args);
      timer = null;
    }, delay);
  };
}

function throttle2(func, delay) {
  let pre = 0;
  return function () {
    let now = new Date();
    if (now - pre > delay) {
      func.apply(this, arguments);
      pre = now;
    }
  };
}
