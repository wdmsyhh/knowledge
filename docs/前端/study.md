# Vue 学习

演示地址：[https://www.runoob.com/try/try.php?filename=vue2-hw](https://www.runoob.com/try/try.php?filename=vue2-hw)

## 数据与方法

```vue
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

使用 Object.freeze()，这会阻止修改现有的 property

- $watch 方法

```vue
<div id="app">
  <p>{{ foo }}</p>
  <button v-on:click="foo = 'Change'">Change it</button>
</div>

<script>
var data = { a : 1, foo : "aa"};
var vm = new Vue({
  el: '#app',
  data: data
})
vm.$watch('foo', function (newValue, oldValue) {
  console.log(newValue,oldValue)
})
</script>
```

## 生命周期

```vue
<div id="app">
  <p>{{ foo }}</p>
  <button v-on:click="foo = 'Change'">Change it</button>
</div>

<script>
var data = { a : 1, foo : "aa"};
var vm = new Vue({
  el: '#app',
  data: data,
    // 在实例初始化之后，数据规则（data observe)和event/watcher事件配置之前被调用。
    beforeCreate:function(){
        console.log('beforeCreate')
    },
    //  在实例创建完成后被立即调用
    // 在这一步，实例已完成以下配置，数据观测(data observer),属性和方法的运算，watcher/event事件回调。
    //  然而，挂载阶段还没开始，$el属性目前不可见。
    created:function(){
        console.log('created')
    },
    // 在挂载开始之前被调用，相关的渲染函数首次被调用
    beforeMount:function(){
        console.log('beforeMount')
    },
    // el被新创建的vm.$el替换，挂载成功
    mounted:function(){
        console.log('mounted')
    },
    //  数据更新时调用
    beforeUpdate:function(){
        console.log('beforeUpdate')
    },
    // 组件DOM已经更新，组件更新完毕
    updated:function(){
        console.log('updated')
    }
})
vm.$watch('foo', function (newValue, oldValue) {
  console.log(newValue,oldValue)
})
setTimeout(function(){
                vm.foo='change .....';
            },1000);
</script>
```

## Class 与 Style 绑定

```vue
<div id="app">
    <div
    class="test"
    v-bind:class="{ active: isActive, green: isGreen }"
    style="width: 200px; height: 200px; text-align: center; line-height: 200px;"
    >
    hi Vue
    </div>

    <div v-bind:style="{ color: color, fontSize: size, background: isRed ? '#00FF00' : '' }">
        hello
    </div>
</div>

<script>
var vm = new Vue({
el: '#app',
data: {
    isActive: true,
    isGreen: true,
    color: "#FF0000",
    size: '50px',
    isRed: true
}
})
</script>
<style>
.test{font-size: 40px;}
.green{color: #00FF00;}
.active{background: #FF0000}
</style>
```
