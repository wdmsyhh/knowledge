title: ECMAScript 进阶
speaker: Allen Li

<slide />

# ECMAScript 进阶

Allen Li

<slide />

## 主要内容

- Promise
- async 函数
- ES6 模块化

<slide />

## Promise

在 JavaScript 中，所有代码都是单线程执行的。导致 JavaScript 的所有网络操作，读取文件等都必须是异步执行。过多的异步回调嵌套很容易形成 **回调地狱**，在这种情况下 [Promise](http://es6.ruanyifeng.com/#docs/promise) 应运而生。

<slide />

### 介绍

Promise 对象有以下特点：

- 它的的状态不受外界影响，只能由自己的 `resolve` 和 `reject` 回调来改变。
- 并且一旦状态改变，就不会再变，任何时候都可以得到这个结果。
- 有三种状态，`pending`、`fulfilled`、`rejected`。
- Promise 新建后就会立即执行。

<slide />

### 举例

:::column {.vertical}

```js
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: { x: '', y: '' },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success (res) {
    console.log(res.data);
  }
});
```

----

```js
function request = (url, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url, //仅为示例，并非真实的接口地址
            data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success (res) {
                resolve(res.data)
            }
        })
    });
}

request('test.php', { x: '', y: '' }).then((res) => {
    console.log(res);
});
```

<slide />

### 进阶用法

- Promise.all：参数中的所有 Promise 对象都 fulfilled，包装实例才会变成 fulfilled。
- Promise.race：参数中任意一个状态改变，包装实例状态就会改变，返回值是率先改变的 Promise 的返回值。
- Promise.any：参数中任意一个 Promise 对象状态变成 fulfilled，包装实例状态就会变成 fulfilled。
- Promise.allSettled()：只有等到所有这些参数实例都返回结果，不管是 fulfilled 还是 rejected，包装实例才会结束。
- Promise.resolve：将现有对象转为 Promise 对象。
- Promise.reject：返回一个新的 Promise 实例，该实例的状态为 rejected。

<slide />

## async & await

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。async 函数本质上来讲就是自带执行器的 [Generator 函数](http://es6.ruanyifeng.com/#docs/generator)，它是 Generator 的语法糖，这点从 babel 编译的结果就可以看出。

```js
const asyncReadFile = async () => {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

<slide />

### 优点

- 内置执行器：Generator 函数的执行必须靠执行器，而async函数自带执行器。
- 更好的语义：比起星号和 `yield`，语义更清楚了。
- 更广的适用性：`yield` 命令后面只能是 `Thunk` 函数或 `Promise` 对象，`await` 命令后面，可以是 Promise 对象和原始类型的值。
- 返回值是 Promise。

<slide />

## 模块化

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。ES6 在语言标准的层面上，实现了模块功能。

```js
import { stat, exists, readFile } from 'fs';

var firstName = 'Allen';
var lastName = 'Li';

export { firstName, lastName };
```

<slide />

### 区别

- CommonJS 模块是运行时加载，ES6 模块是编译时加载，成为了 `tree shaking` 等优化方案的基础。
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

附：[示例](http://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)
