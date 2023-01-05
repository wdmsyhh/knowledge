title: Vue.js
speaker: Cooper Zhang

<slide />

# Vue.js

Cooper Zhang

<slide />

## 介绍

- 一套渐进式 JavaScript 框架
- 体积小
- 基于虚拟 DOM
- 声明式渲染

<slide />

## 安装

- 直接用 `<script>` 引入
- [CLI](https://cli.vuejs.org/)

<slide />

## 起步

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

```html
<div id="app">{{ message }}</div>
```

```js
const app = new Vue({
  el: '#app',
  data: { message: 'Hello Vue!' },
});
```

<slide />

## 数据与方法

当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```js
const data = { a: 1 };
const vm = new Vue({ data });

// 设置属性也会影响到原始数据
vm.a = 2; // data.a => 2

// ……反之亦然
data.a = 3; // vm.a => 3

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
});
```

<slide />

## 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- activated & deactivated
- beforeDestroy
- destroyed
- errorCaptured

<slide />

## 模板语法

### 文本插值

```html
<span>Message: {{ msg }}</span>
```

```html
<span v-once>Message: {{ msg }}</span>
```

### 特性

Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令

```html
<div v-bind:id="dynamicId"></div>
```

<slide />

### 使用 JavaScript 表达式

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{ message.split('').reverse().join('') }}
```

<slide />

### 指令

带有 v- 前缀的特殊特性。

```html
<p v-if="shouldShow">Now you see me.</p>
```

```html
<a v-bind:href="url">...</a>
```

```html
<a v-on:click="doSomething">...</a>
```

```html
<a v-bind:[attributeName]="url"> ... </a>
```

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

<slide />

### 指令的缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

<slide />

## 计算属性

```html
<div id="app">{{ message }}</div>
```

```js
const app = new Vue({
  el: '#app',
  data: {
    greeting: 'Good morning',
    name: 'Tom',
  },
  computed: {
    message() {
      return `${this.greeting}, ${this.name}.`;
    },
  },
});
```

- 计算属性缓存 vs 方法
- 计算属性 vs watch

<slide />

## Class 与 Style 绑定

### 绑定 HTML Class

```html
<div v-bind:class="{ active: isActive }"></div>
```

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

```html
<div v-bind:class="classObject"></div>
```

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

<slide />

### 绑定内联样式

```html
<div v-bind:style="{ color: activeColor }"></div>
```

```js
data: {
  activeColor: 'red',
}
```

<slide />

## 条件渲染

- v-if & v-else
- v-show
- v-if vs v-show
- v-if 与 v-for 共用

<slide />

## 列表渲染

- v-for 遍历一个数组

```html
<div v-for="(item, index) in items">
  {{index}} - {{ item.message }}
</div>
```

```js
data: {
  items: [
    { message: 'Foo' },
    { message: 'Bar' }
  ],
}
```

<slide />

- v-for 来遍历一个对象的属性

```html
<div v-for="(value, name, index) in object">
  {{ index }}.{{ name }}: {{ value }}
</div>
```

```js
data: {
  object: {
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  },
}
```

<slide />

- 唯一 key

  ```html
  <div v-for="item in items" v-bind:key="item.id">
    ...
  </div>
  ```

<slide />

- 数组更新

  Vue 将被侦听的数组的变异方法进行了包裹，会触发视图更新，包括：
    - push()
    - pop()
    - shift()
    - unshift()
    - splice()
    - sort()
    - reverse()

<slide />

- 替换数组

  相比之下，也有非变异方法，例如 filter()、concat() 和 slice() 。它们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组。

- 注意

  Vue 不能检测以下数组的变动：

    - 利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`。
    - 修改数组的长度时，例如：`vm.items.length = newLength`。

<slide />

## 事件处理

- 监听事件

  可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

  ```html
  <div id="app">
    <button v-on:click="onClickGreet('hello', $event)">Greet</button>
  </div>
  ```

  ```js
  var vm = new Vue({
    el: '#app',
    // 在 `methods` 对象中定义方法
    methods: {
      onClickGreet(message, event) {
        // do something...
      },
    },
  });
  ```

<slide />

- 事件修饰符
    - .stop
    - .prevent
    - .capture
    - .self
    - .once

```html
<a v-on:click.stop=""></a>
```

```html
<a v-on:click.stop.prevent=""></a>
```

<slide />

## 表单输入绑定

你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件。
- `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件。
- `select` 使用 `value` 属性和 `change` 事件。

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

<slide />

## 组件

组件是可复用的 Vue 实例。

- 全局注册

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data() {
    return {
      count: 0,
    };
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});
```

<slide />

- 局部注册

```js
const ComponentA = { /* ... */ };
const ComponentB = { /* ... */ };
const ComponentC = { /* ... */ };
```

```js
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB,
  },
});
```

<slide />

注意局部注册的组件在其子组件中不可用。

```js
const ComponentA = { /* ... */ };

const ComponentB = {
  components: { 'component-a': ComponentA },
  // ...
};
```

```js
import ComponentA from './ComponentA.vue';

export default {
  components: { 'component-a': ComponentA },
  // ...
}
```

<slide />

### Prop 基础

```js
Vue.component('button-counter', {
  props: ['name'],
  data() {
    return {
      count: 0,
    };
  },
  template: '<button v-on:click="count++">Hi {{ name }}. You clicked me {{ count }} times.</button>',
});
```

```html
<button-counter name="Tom"></button-counter>
```

<slide />

- Prop 类型

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise, // or any other constructor
}
```

- 传递静态或动态 Prop

```js
data: {
  name: 'Tom',
}
```

```html
<button-counter v-bind:name="name"></button-counter>
```

<slide />

- 自定义事件

```js
this.$emit('my-event', options);
```

```html
<my-component v-on:my-event="doSomething"></my-component>
```

<slide />

### 资源

- [Guide](https://cn.vuejs.org/v2/guide/)
- [Cookbook](https://cn.vuejs.org/v2/cookbook/index.html)
- [Vue CLI](https://cli.vuejs.org/)
- [Vue Router](https://router.vuejs.org/zh/)
