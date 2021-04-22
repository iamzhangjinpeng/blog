# Var,let,const,function

## var

1. 作用域:

   ```javascript
   // 全局作用域和函数作用域
   var a = 10; // 全局作用域
   console.log(a, window.a, window.a === a);
   
   function foo() {
     var a = 20; // 函数作用域
     var b = 30;
     console.log(a, window.a);
     console.log(b, window.b);
   }
   
   foo();
   /*
   10 10 true
   20 10
   30 undefined
   */
   ```

2. 变量提升

   ```javascript
   console.log(a); // error
   ```

   ```javascript
   console.log(window.a); // undefined
   ```

   ```javascript
   console.log(a); // undefined
   var a = 10;
   console.log(a); // 10
   /*
   var a;
   console.log(a); // undefined
   a = 10;
   console.log(a); // 10
   */
   ```

   ```javascript
   function foo() {
     console.log(a);
   }
   foo(); // error
   ```

   ```javascript
   function foo() {
     console.log(a);
     var a = 10;
     console.log(a);
   }
   /*
   function foo() {
     var a;
     console.log(a);
     a = 10;
     console.log(a);
   }
   */
   foo();
   /*
   undefined
   10
   */
   ```

3. 没有块作用域, 闭包

   ```javascript
   function foo() {
     var funcs = [];
     console.log(i);
     for (var i = 0; i < 3; i++) {
       funcs.push(function () {
         console.log("func", i);
       });
     }
     console.log(i);
     return funcs;
   }
   
   var xs = foo();
   xs.forEach(x => x());
   /*
   undefined
   3
   func 3
   func 3
   func 3
   */
   ```

   ```javascript
   // 闭包
   function foo() {
     var funcs = [];
     console.log(i);
     for (var i = 0; i < 3; i++) {
       funcs.push(
         (function (index) {
           return function () {
             console.log("func", index);
           };
         })(i)
       );
     }
     console.log(i);
     return funcs;
   }
   
   var xs = foo();
   xs.forEach(x => x());
   /*
   undefined
   3
   func 0
   func 1
   func 2
   */
   ```

## let

1. 作用域

   ```javascript
   /*
   块作用域, 由{}包括起来, if语句和for语句里面的{}也属于块级作用域
   for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域
   */
   let a = 10;
   {
     let a = 20;
     function foo() {
       let a = 30;
       if (true) {
         let a = 40;
         for (let a = 0; a < 3; a++) {
           let a = 50;
           console.log(a);
         }
         console.log(a);
       }
       console.log(a);
     }
     console.log(a);
   }
   foo();
   console.log(a);
   /*
   20
   50
   50
   50
   40
   30
   10
   */
   ```

2. 暂时性死区

   ```javascript
   console.log(a); // error
   let a = 10;
   console.log(a);
   ```

3. 不允许重复声明

4. ```javascript
   let a = 10;
   let a = 20; // error
   console.log(a);
   ```

## const

1. ```javascript
   /*
   数据不可变
   ES6 中做了严格的区分，使用 var 和 function 声明的全局变量依旧作为全局对象的属性，使用 let, const 命令声明的全局变量不属于全局对象的属性。
   
   除了let以外，ES6还引入了const 和 let 的作用域是一致的，不同的是 const 变量一旦被赋值，就不能再改变了，但是这并不意味着使用 const 声明的变量本身不可变，只是说它不可被再次赋值了，而且const 声明的变量必须经过初始化。
   
   注：复合类型const变量保存的是引用。因为复合类型（如数组和对象）的常量不指向数据，而是指向数据(heap)所在的地址(stack)，所以通过 const 声明的复合类型只能保证其地址引用不变，但不能保证其数据不变。所以将一个对象声明为常量必须非常小心。
   
   简单数据类型（数值，字符串，布尔值）：值保存在变量指向的那个内存地址，因此等同于常量。
   
   复合类型的数据（对象和数组）：变量指向的是内存地址，保存的是一个指针，const只能保存这个指针地址是固定的，至于他指向的数据结构是不是可变的，就完全不能控制了。
   */
   const a = 10;
   // a = 20; // error
   console.log(a); // 10
   
   const arr = [1, 2, 3];
   // arr = "aaaa"; // error
   console.log(arr); // [1, 2, 3]
   arr[1] = "aaa";
   console.log(arr); // [1, "aaa", 3]
   ```

2. ```javascript
   /*
   Object.freeze()
   freeze() 的功能顧名思義，就是「凍結」一個物件，用於防止物件新增屬性，或是防止原有的屬性被刪除。
   */
   const obj = {
     a: 10
   };
   Object.freeze(obj); // 使用 freeze 就不能修正了
   obj.a = 30;
   console.log(obj.a); // 10
   ```

## function

1. ```javascript
   /*
   全局作用域: 函数定义提升
   函数作用域: 函数定义提升
   */
   console.log(foo);
   function foo() {
     console.log(baz);
     function baz() {}
     console.log(baz);
   }
   console.log(foo);
   foo();
   /*
   f foo()
   f foo()
   f baz()
   f baz()
   */
   ```

2. ```javascript
   /*
   块作用域: 函数名向块外一直提升, 直到遇见函数作用域或者全局作用域,执行前为undefined, 没执行定义为undefined, 执行过后为函数定义
   */
   console.log("foo1", foo);
   {
     if (true) {
       function foo() {
         console.log("baz1", baz);
         console.log("bar1", bar);
         for (let i = 0; i < 1; i++) {
           if (true) {
             function baz() {}
           }
           if (false) {
             function bar() {}
           }
         }
         console.log("baz2", baz);
         console.log("bar2", bar);
       }
     }
   }
   console.log("foo2", foo);
   foo();
   /*
   foo1 undefined
   foo2 ƒ foo()
   baz1 undefined
   bar1 undefined
   baz2 ƒ baz()
   bar2 undefined
   */
   ```