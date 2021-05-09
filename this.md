# this

## 四种绑定

1. 默认绑定

   ```javascript
   function sayHi(){
       console.log('Hello,', this.name);
   }
   var name = 'YvetteLau';
   sayHi();
   ```

2. 隐式绑定

   ```javascript
   var person = {
       name: 'YvetteLau',
       sayHi: function sayHi(){
           console.log('Hello,', this.name);
       }
   }
   person.sayHi();
   ```

3. 显式绑定

   ```javascript
   function sayHi(){
       console.log('Hello,', this.name);
   }
   var person = {
       name: 'YvetteLau',
       sayHi: sayHi
   }
   var name = 'Wiliam';
   var Hi = person.sayHi;
   Hi.call(person); 
   ```

4. new 绑定

   ```javascript
   function sayHi(name){
       this.name = name;
   }
   var Hi = new sayHi('Yevtte');
   console.log('Hello,', Hi.name);
   ```

## 优先级

new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

## 原理

思考在内存中的数据接口, 考虑当时的运行环境, 确定this指向.

参考 [JavaScript 的 this 原理 - 阮一峰](https://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

