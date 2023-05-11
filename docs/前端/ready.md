# Vue

[Vue 官网](https://v2.cn.vuejs.org/v2/guide)

演示地址：https://www.runoob.com/try/try.php?filename=vue2-hw

## Vue 实例

  - 创建一个 Vue 实例
  - 数据于方法
    ```html
    <div id="app">
        <p>{{ a }}</p>
    </div>

    <script>
        var data = { a : 1 }; // 对象形式的变量
        var vm = new Vue({
        el: '#app',
        data: data // 赋值给 data 属性
        })
        data.a = "new" // 或者 vm.a = "new"; vm.$data.a = "new value"
    </script>
    ```
  - 实例生命周期钩子
  - 生命周期图

## 模板语法

- 插值
  - 文本
  - 原始 HTML
  - Attribute
  - 使用 JavaScript 表达式
- 指令
  - 参数
  - 动态参数
  - 修饰符
- 缩写
  - v-bind 缩写
  - v-on 缩写

## 计算属性和侦听器

  - 计算属性
    - 基础例子
    - 计算属性缓存 vs 方法
    - 计算属性 vs 侦听属性
    - 计算属性的 setter
  - 侦听器
