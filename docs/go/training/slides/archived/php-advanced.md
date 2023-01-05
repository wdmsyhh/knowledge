title: PHP 进阶
speaker: Zach Zhang

<slide />

# PHP 进阶

Zach Zhang

<slide />

## 主要内容

- trait
- 匿名类
- 静态绑定
- 命名空间
- 错误处理
- 生成器
- PHP 扩展
- Composer

<slide />

### Trait

一种代码复用的方法，无法实例化，通过 use 使用。

- trait 与 class 相同，支持定义静态方法、属性、抽象方法。
- 优先级：当前类的成员覆盖了 trait 的方法，而 trait 则覆盖了被继承的方法。
- 冲突以及解决：如果两个 trait 都插入了一个同名的方法，如果没有明确解决冲突将会产生一个致命错误。

<slide />

### 匿名类

创建一次性的简单对象，可以传递参数到匿名类的构造器，也可以扩展（extends）其他类、实现接口（implement interface），以及像其他普通的类一样 use trait。

- 匿名类被嵌套进普通 class 后，不能访问这个外部类的 private、protected 方法或者属性。 为了访问外部类 protected 属性或方法，匿名类可以 extends 此外部类。 为了使用外部类的 private 属性，必须通过构造器传进来。
- 声明的同一个匿名类，所创建的对象都是这个类的实例。

<slide />

### 后期静态绑定

用于在继承范围内引用静态调用的类，通过 `static::` 调用，不再被解析为定义当前方法所在的类，而是在实际运行时计算的。也可以称之为“静态绑定”，因为它可以用于（但不限于）静态方法的调用。

- 转发调用：
    - 指的是通过以下几种方式进行的静态调用：`self::`，`parent::`，`static::` 以及 `forward_static_call()`。
- self：使用 `self::` 或者 `__CLASS__` 对当前类的静态引用，取决于定义当前方法所在的类。
- static：运行时对象所属的类。
- 后期静态绑定的解析会一直到取得一个完全解析了的静态调用为止。另一方面，如果静态调用使用 `parent::` 或者 `self::` 将转发调用信息。

<slide />

### 命名空间

通过 `namespace` 关键字定义。

- 在 PHP 中，命名空间用来解决在编写类库或应用程序时创建可重用的代码如类或函数时碰到的两类问题：
    - 用户编写的代码与 PHP 内部的类/函数/常量或第三方类/函数/常量之间的名字冲突。
    - 为很长的标识符名称(通常是为了缓解第一类问题而定义的)创建一个别名（或简短）的名称，提高源代码的可读性。
- 定义命名空间：
    - PHP 命名空间也允许指定层次化的命名空间的名称。因此，命名空间的名字可以使用分层次的方式定义。
    - 也可以在同一个文件中定义多个命名空间。
- 基本概念：
    - 非限定名称：名称中不包含命名空间分隔符的标识符，例如 `Foo`。
    - 限定名称：名称中含有命名空间分隔符的标识符，例如 `Foo\Bar`。
    - 完全限定名称：名称中包含命名空间分隔符，并以命名空间分隔符开始的标识符，例如 `\Foo\Bar`。

<slide />

#### 名称解析规则

- 对完全限定名称的函数，类和常量的调用在编译时解析。例如 `new \A\B` 解析为类 `A\B`。
- 所有的非限定名称和限定名称（非完全限定名称）根据当前的导入规则在编译时进行转换。例如，如果命名空间 `A\B\C` 被导入为 C，那么对 `C\D\e()` 的调用就会被转换为 `A\B\C\D\e()`。
- 在命名空间内部，所有的没有根据导入规则转换的限定名称均会在其前面加上当前的命名空间名称。例如，在命名空间 `A\B` 内部调用 `C\D\e()`，则 `C\D\e()` 会被转换为 `A\B\C\D\e()`。
- 非限定类名根据当前的导入规则在编译时转换（用全名代替短的导入名称）。例如，如果命名空间 `A\B\C` 导入为 C，则 `new C()` 被转换为 `new A\B\C()`。
- 在命名空间内部（例如 `A\B` ），对非限定名称的函数调用是在运行时解析的。例如对函数 `foo()` 的调用是这样解析的：
    - 在当前命名空间中查找名为 `A\B\foo()` 的函数。
    - 尝试查找并调用 全局(global) 空间中的函数 `foo()`。
- 在命名空间（例如 `A\B` ）内部对非限定名称或限定名称类（非完全限定名称）的调用是在运行时解析的。下面是调用 `new C()` 的解析:
    - 在当前命名空间中查找 `A\B\C` 类。
    - 尝试自动装载类 `A\B\C`。

<slide />

- 命名空间与类的自动加载：
    - `__autoload()`：尝试加载未定义的类，只能有一个该方法，使用第三方扩展时可能会造成冲突，弃用。
    - `spl_autoload_register()` 函数可以注册任意数量的自动加载器，当使用尚未被定义的类（class）和接口（interface）时自动去加载。通过注册自动加载器，脚本引擎在 PHP 出错失败前有了最后一个机会加载所需的类。
    - [PSR4 autoloader example](https://learnku.com/docs/psr/psr-4-autoloader-example/1609)。

<slide />

### 反射

PHP 自 5.0 版本以后添加了反射机制，它提供了一套强大的反射 API，许你在 PHP 运行环境中，访问和使用类、方法、属性、参数和注释等。

- 访问：需要建立类 A 的反射类实例（[ReflectionClass](https://www.php.net/manual/zh/class.reflectionclass.php)），然后基于这个实例可以访问类 A 中的属性或者方法。不管类中定义的成员权限声明是否为 public，都可以获取到。
    - 创建反射类时传送的类名，必须包含完整的命名空间，即使使用了 use 关键字。否则找不到类名会抛出异常。
- 交互：创建了反射类的实例，我们不仅可以通过反射类访问原来类的方法和属性，还能创建原来类的实例或则直接调用类里面的方法。
    - 直接访问 `protected` 或则 `private` 的属性或者方法会抛出异常。
    - 需要调用指定的 `ReflectionProperty` 或 `ReflectionMethod` 对象 `setAccessible(true)` 方法才能访问非公有成员。
    - 修改非公有成员的访问权限只作用于当前的反射类的实例。
    - 需要注意获取静态成员(`ReflectionClass::getStaticPropertyValue`) 和非静态成员(`ReflectionClass::getProperty`) 所使用的方法不一样。
    - 获取父类成员的方法和一般的不一样。
- 其他获取类信息的方法：
    - `get_class()`、`get_called_class()`：获取类信息。
    - `get_class_methods()`：返回由类的方法名组成的数组，在类内部调用时会返回 `private` 方法。
    - `get_class_vars()`：返回由类的默认**公有属性**组成的数组，在类内部调用时会返回**私有属性**和**保护属性**。
- 注意事项：
    - 反射的消耗也很大，在可以找到替代方案的情况下，就不要滥用。
    - 很多时候，善用反射能保持代码的优雅和简洁，但反射也会破坏类的封装性，因为反射可以使本不应该暴露的方法或属性被强制暴露了出来，这既是优点也是缺点。

<slide />

### 错误处理

- [Throwable 接口](https://www.php.net/manual/en/class.throwable.php)。
    - Error 和 Exception。
    - 自定义异常处理，不能直接 implements Throwable 接口，必须通过继承 Exception 类来实现。
- PHP７ 大多数错误被作为 Error 异常抛出。
- Error 类并非继承自 Exception 类，需要 catch(Error $e)。

<slide />

### 生成器

生成器提供了一种更容易的方法来实现简单的对象迭代，相比较定义类实现 Iterator 接口的方式，性能开销和复杂性大大降低。使用关键词 `yield`。

- 生成器允许你在 foreach 代码块中写代码来迭代一组数据而不需要在内存中创建一个数组, 那会使你的内存达到上限，或者会占据可观的处理时间。相反，你可以写一个生成器函数，就像一个普通的自定义函数一样, 和普通函数只返回一次不同的是, 生成器可以根据需要 yield 多次，以便生成需要迭代的值。

#### PHP 协程实现

- [PHP 协程序实现](http://www.laruence.com/2015/05/28/3038.html)。
- 协程的支持是在迭代生成器的基础上, 增加了可以回送数据给生成器的功能(调用者发送数据给被调用的生成器函数)，这就把生成器到调用者的单向通信转变为两者之间的双向通信。

<slide />

### PHP 扩展管理

- 可以通过输出 `phpinfo()` 或执行 `php -m`，查看 PHP 扩展安装情况。
- 安装扩展：
    - 如果 PHP 是通过 apt 或者 yum 命令安装的，则扩展也可以通过 apt 或者 yum 安装。
        - 利用 `apt-cache search` 查找扩展包。
        - `apt-get install` 安装扩展包。
    - 使用pecl安装：
        - `pecl install {extension name}`。
        - 配置 php.ini。

<slide />

### Composer

[Composer](https://docs.phpcomposer.com/00-intro.html) 是一个依赖管理。它涉及 `packages` 和 `libraries`，但它在每个项目的基础上进行管理，在你项目的某个目录中（例如 vendor）进行安装。

- Composer 将这样为你解决问题:
    - 你有一个项目依赖于若干个库。
    - 其中一些库依赖于其他库。
    - 你声明你所依赖的东西。
    - Composer 会找出哪个版本的包需要安装，并安装它们（将它们下载到你的项目中）。
- 自动加载：
    - 除了库的下载，Composer 还准备了一个自动加载文件，它可以加载 Composer 下载的库中所有的类文件。你只需要将下面这行代码添加到你项目的引导文件中：
    `require 'vendor/autoload.php';`

## 参考资料

- [PHP 手册](https://www.php.net/manual/zh/langref.php)
- [PHP Composer](https://mp.weixin.qq.com/s?__biz=MjM5NzY5MTE5Mw==&mid=2651554604&idx=1&sn=e1f450b5500e0d3972f73e347fcd431c&chksm=bd29097a8a5e806c3671bb3237e10a1d229ce2c5f5717a09fe9494b779dc785dee73daff9595&mpshare=1&scene=1&srcid=1105GG5gK4xzNrUHqyJa3tv9&sharer_sharetime=1572953021334&sharer_shareid=9e6da2f5e36e563e353f2ebf695b7912#rd)。
- [PSR4 autoloader example](https://learnku.com/docs/psr/psr-4-autoloader-example/1609)。
- [PHP 协程序实现](http://www.laruence.com/2015/05/28/3038.html)。
