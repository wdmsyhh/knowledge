title: PHP 基础
speaker: Zach Zhang

<slide />

# PHP 基础

Zach Zhang

<slide />

## 主要内容

- PHP 语言特性
- PHP 语言参考

<slide />

## 基本介绍

- PHP 特性：
    - 脚本语言，解释型。
    - 弱类型。
    - 面向对象。
- PHP 标记：
    - `<?php` 和 `?>`，纯 PHP 文件中省略结束标记，避免输出不期望的字符。

<slide />

## 类型

PHP 支持 9 种原始数据类型。

- 四种标量类型：
    - boolean（布尔型）
    - integer（整型）
    - float（浮点型，也称作 double)
    - string（字符串）
- 三种复合类型：
    - array（数组）
    - object（对象）
    - callable（可调用）
- 最后是两种特殊类型：
    - resource（资源）：保存了到外部资源的一个引用，资源是通过专门的函数来建立和使用的，[所有这些函数及其相应资源类型](https://www.php.net/manual/zh/resource.php)。
    - NULL（无类型）

<slide />

### 数组

- 定义： `array()` or `[]`。
- key 可以是 integer 或者 string，value 可以是任意类型。
- 此外 key 会有如下的强制转换：
    - 包含有合法整型值的字符串会被转换为整型。例如键名 "8" 实际会被储存为 8。但是 "08" 则不会强制转换，因为其不是一个合法的十进制数值。
    - 浮点数也会被转换为整型，意味着其小数部分会被舍去。例如键名 8.7 实际会被储存为 8。
    - 布尔值也会被转换成整型。即键名 true 实际会被储存为 1 而键名 false 会被储存为 0。
    - Null 会被转换为空字符串，即键名 null 实际会被储存为 ""。
    - 数组和对象不能被用为键名。坚持这么做会导致警告：Illegal offset type。
- 数组可以同时含有 integer 和 string 类型的键名，因为 PHP 实际并不区分**索引数组**和**关联数组**。
    - 索引数组：没有指定 key 或这 key 为连续的整数，如：`$arr = ['hello', '1' => 'world']`。
    - 关联数组：有执行数组元素的 key，如：`$arr = ['hello', '2' => 'world']`，与其他语言交互时，会被解析成对象，而非数组。
    - 如果未指定 key，PHP 将自动使用之前用过的最大 integer 键名加上 1 作为新的键名。
- 遍历数组：
    - `foreach($arr as $value)` 语法结构提供了遍历数组的简单方式，仅能够应用于数组和对象。
    - `foreach($arr as &$value)` 可以很容易地通过在 $value 之前加上 `&` 来修改数组的元素。
    - 数组最后一个元素的 `$value` 引用在 `foreach` 循环之后仍会保留，后续如果有使用 `$value` 变量会有影响，建议使用 `unset()` 来将其销毁。

<slide />

- 常用函数以及注意事项：
    - 使用时一定注意该函数是否会重新索引，以及后续操作是否使用索引。
    - 如果需要删除后重建索引，可以用 `array_values()` 函数。
    - `unset()` 函数允许删除数组中的某个键，但要注意数组将不会重建索引。
    - `array_diff($array1, $array2)` 返回一个数组，该数组包括了所有在 array1 中但是不在任何其它参数数组中的值。注意键名保留不变。

<slide />

### Callback/Callable 类型

一些函数如 `call_user_func()` 或 `usort()` 可以接受用户自定义的回调函数或**匿名函数**作为参数，回调函数不止可以是简单函数，还可以是对象的方法，包括静态类方法。

- 匿名函数：也叫闭包函数，允许临时创建一个没有指定名称的函数。
    - 匿名函数对应内置类 [Closure 的对象实例](https://www.php.net/manual/zh/class.closure.php)。
    - 闭包可以从父作用域中继承变量，任何此类变量都应该用 use 语言结构传递进去。

<slide />

### 类型转换与比较

- 类型判断与转换：
    - 通过 `var_dump()` 函数，查看表达式的类型和值。
    - 强制类型转换。`(string) 1`。
    - `gettype()` 和 `settype()`。
    - 注意事项：
        - 绝不要将未知的 `float` 强制转换为 integer，这样有时会导致不可预料的结果。`(int) ((0.1+0.7) * 10); // 显示 7!`。
- [类型比较](https://www.php.net/manual/zh/types.comparisons.php)：
    - 空值判断：`empty()`、`isset()`、`is_null()`。
    - 松散(`==`)比较与严格(`===`)比较。
    - 浮点数大小比较。

<slide />

## 变量

- 变量名不区分大小写。
- 使用：`$var`、`${var}`。
- 变量默认值传递，只有使用 `&` 时才会进行引用传递。
- [预定义变量](https://www.php.net/manual/zh/reserved.variables.php)：`$GLOBALS`、`$_SERVER`、`$_GET`...
- 变量范围：
    - 全局变量：PHP 的全局变量和 C 语言有一点点不同，在 C 语言中，全局变量在函数中自动生效，除非被局部变量覆盖。这可能引起一些问题，有些人可能不小心就改变了一个全局变量。PHP 中全局变量在函数中使用时必须声明为 `global`。
    - 静态变量：`static`，脱离函数时静态变量值并不消失，只有在第一次调用时被赋值。
    - 可变变量：一个可变变量获取了一个普通变量的值作为这个可变变量的变量名 `$$var` or `${$var}`。

<slide />

## 常量

常量默认为大小写敏感，**常量标识符总是大写**。

- 定义 `define('GLOBAL_VAR', 'globalVar')`。
- 常量的作用域是全局的。
- [魔术常量](https://www.php.net/manual/zh/language.constants.predefined.php)。

<slide />

## 表达式与运算符

- [运算符优先级与结合顺序](https://www.php.net/manual/zh/language.operators.precedence.php)。
- 类型比较：
    - `==` 和 `===`，前面类型比较处有介绍。
    - [不同类型之间比较](https://www.php.net/manual/zh/language.operators.comparison.php)

<slide />

## 流程控制

不做赘述，选择合适的结构使代码清晰易读易于维护。

- if else 与 switch case。
- for、foreach、while、do while。

<slide />

## 函数

- 函数名是大小写无关的，使用小驼峰。
- 支持可变参数、默认参数。
- 支持可变函数的概念，这意味着如果一个变量名后有圆括号，PHP 将寻找与变量的值同名的函数，并且尝试执行它：`$functionName()`。
- 匿名函数，通常作为回调。

<slide />

## 面向对象

- 封装
- 继承
- 多态：PHP 区别于传统的面向对象语言。

<slide />

### 类与对象

- 访问控制：public、protected、private。
- 属性：
    - 静态属性：static。
    - 非静态属性。
- 类常量 `constant`
- 构造函数 `__construct()`。
    - 如果子类中定义了构造函数则不会隐式调用其父类的构造函数。要执行父类的构造函数，需要在子类的构造函数中调用 `parent::__construct()`。
- 析构函数 `__destruct()`，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数。
- 范围解析操作符（`::`）
    - 静态成员、类常量的访问。
    - 用于覆盖类中的属性和方法，当一个子类覆盖其父类中的方法时，PHP 不会调用父类中已被覆盖的方法。是否调用父类的方法取决于子类。这种机制也作用于构造函数和析构函数，重载以及魔术方法。`parent::functionName()`。

<slide />

### 继承与重写

对象的继承使用 `extends` 关键字，会继承**公有成员**、**保护成员**。

- 方法名、参数列表必须完全一致。
- 子类的访问控制应该和父类相同或者比父类更加开放。

<slide />

## 重载与魔术方法

PHP 中的重载与其它绝大多数面向对象语言不同。传统的重载是用于提供多个同名的类方法，但各方法的参数类型和个数不同。
PHP 所提供的重载是指动态地创建类属性和方法，通过魔术方法来实现。

- 所有的重载方法都必须被声明为 `public`。
- 当调用当前环境下未定义或不可见的类属性或方法时，重载方法会被调用。
    - 未定义属性： `__get()`、`__set()`、`__isset()` 和 `__unset()` 进行属性重载。
    - 未定义方法： `__call()` 和 `__callStatic()`。
- [魔术方法](https://www.php.net/manual/zh/language.oop5.magic.php)。

<slide />

### 抽象类与接口

抽象类通常是对与同一类事物所具有的特性进行的抽象，而接口则是对于事物所具备的能力的抽象。

- 使用：
    - 抽象类使用 `abstract` 关键字，包含抽象方法的类，不能实例化，子类必须实现该方法。
    - 接口使用 `interface` 关键字，实现接口使用 `implements`。
- 成员定义：
    - 接口只能定义方法、常量。
    - 抽象类可以定义变量、构造方法。
- 访问控制：
    - 接口为 `public`。
    - 抽象类可以用 `public`、`protected`、`private`。
- 继承：
    - 接口可以多继承。
    - 抽象类只能单继承。

<slide />

### 对象复制

使用 `clone` 关键字进行对象的复制。

- 因为对象的赋值和参数传递都是引用的，因此当不希望改变原对象时需要进行赋值。
- 当对象被复制后，会对对象的所有属性执行一个浅复制，所有的引用属性仍然会是一个指向原来的变量的引用。
- `__clone()`：__clone 魔术方法会在对象被复制的时候被触发，可用于修改属性的值。

### 遍历对象

可以使用 foreach 或者实现 [Iterator 接口](https://www.php.net/manual/zh/class.iterator.php)。

### 对象序列化

- 所有 php 里面的值都可以使用函数 `serialize()` 来返回一个包含字节流的字符串来表示。
- `unserialize()` 函数能够重新把字符串变回 php 原来的值。
- 序列化一个对象将会保存对象的所有变量，但是不会保存对象的方法，只会保存类的名字。
- 为了能够 `unserialize()` 一个对象，这个对象的类必须已经定义过。如果要想在另外一个文件中解序列化一个对象，这个对象的类必须在解序列化之前定义，可以通过包含一个定义该类的文件或使用函数 `spl_autoload_register()` 来实现。

<slide />

### 对象与引用

- PHP 的引用是别名，并不是指针，是两个不同的变量名字保存同一个标识符的拷贝。
- 对象是引用传递的：
    - 当对象作为参数传递，作为结果返回，或者赋值给另外一个变量，另外一个变量跟原来的不是引用的关系，只是他们都保存着同一个标识符的拷贝，这个标识符指向同一个对象的真正内容。

## 参考资料

- [PHP 手册](https://www.php.net/manual/zh/langref.php)
- [PHP style guide](https://github.com/inetfuture/technote/tree/master/php#style-guide)
- [PHP 中文手册](https://php.golaravel.com/intro-whatis.html)
- [Modern PHP](https://github.com/codeguy/modern-php)
