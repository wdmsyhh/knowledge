title: Yii2 框架
speaker: Lorne Qi

<slide />

# Yii2

Lorne Qi

<slide />

## 认识 Yii2

- Yii2 是一个高性能，基于组件的 PHP 框架，用于快速开发现代 Web 应用程序

<slide />

## 目录结构和入口脚本

- 初级目录结构

    ```text
    ├── assets
    ├── commands
    ├── config
    ├── controllers
    ├── models
    ├── runtime
    ├── tests
    ├── vendor
    ├── views
    ├── web
    ├── LICENSE.md
    ├── README.md
    ├── yii
    └── yii.bat
    ```

<slide />

- 高级模板目录结构

    ```text
    ├── backend  // 后端应用程序，是一个独立的应用程序
    ├── common // 公共目录，每一个应用都可用
    ├── console // 控制台应用程序
    ├── environments // 环境相关的目录
    ├── frontend // 前端应用程序目录
    ├── tests // 测试
    ├── vendor // 这是 Composer 安装的其他程序的存放目录，包含 Yii 框架本身，也放在这个目录下面
    ├── composer.json
    ├── composer.lock
    ├── init
    ├── init.bat
    ├── LICENSE.md
    ├── README.md
    ├── yii
    └── yii.bat
    ```

<slide />

- 入口脚本

    ```text
    // 定义模式
    defined('YII_DEBUG') or define('YII_DEBUG', true);
    // 定义环境 dev，prod，test
    defined('YII_ENV') or define('YII_ENV', 'dev');
    // 这个是 composer 的类自动加载机制注册文件，引入这个文件后，可以使用 composer 的类自动加载功能
    require __DIR__ . '/../vendor/autoload.php';
    // 这是 Yii 的工具类文件，引入了这个类文件后，才能使用 Yii 的提供的各种工具， 才有 Yii::createObject()、Yii::$app 之类的东西可以使用
    require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';
    // 引入配置文件
    $config = require __DIR__ . '/../config/web.php';
    // 以 $config 为参数，实例化了一个 Application 对象，并调用他的 run() 函数。 这时，Yii 应用就跑起来了
    (new yii\web\Application($config))->run();
    ```

- 控制台入口脚本
    - yii 是一个使用 PHP 运行的脚本

<slide />

## 基本概念

### 属性

- 在 PHP 中类的成员变量也被称为属性，在 yii 中实现属性主要是通过 yii/base/BaseObject 这个类来实现属性的
- 在给不可访问属性赋值时，__set() 会被调用
- 读取不可访问属性的值时，__get() 会被调用
- 在 Yii2 中实现属性的步骤
    - 继承 yii/base/BaseObject 类
    - 声明一个用于保存该属性的私有成员变量
    - 提供 getter 或 setter 函数，或两者都提供，用于访问和修改上面提到的私有成员变量。 如果只提供了getter，那么该属性为只读属性，只提供了setter，则为只写

<slide />

### 事件

- 事件可以将自定义代码“注入”到现有代码中的特定执行点。 附加自定义代码到某个事件，当这个事件被触发时，这些代码就会自动执行
- Yii2 中与事件相关的两个类
    - yii\base\Component 事件是在这个类中引入的，需要使用事件时，要从 yii\base\Component 中继承
    - yii\base\Event 封装了与事件相关的数据，提供了一些函数供使用

        ```text
        class Event extends Object
        {
            public $name;               // 事件名
            public $sender;             // 事件发布者，通常是调用了 trigger() 的对象或类。
            public $handled = false;    // 是否终止事件的后续处理
            public $data;               // 事件相关数据
            private static $_events = [];
            public static function on($class, $name, $handler, $data = null,
                $append = true)
            {
                // 用于绑定事件 handler
            }
            public static function off($class, $name, $handler = null)
            {
                // 用于取消事件 handler 绑定
            }
            public static function hasHandlers($class, $name)
            {
                // 用于判断是否有相应的 handler 与事件对应
            }
            public static function trigger($class, $name, $event = null)
            {
                // 用于触发事件
            }
        }
        ```

<slide />

- 事件 handler
    - 事件处理器是一个 PHP 回调函数， 当它所附加到的事件被触发时它就会执行。可以使用以下回调函数之一

        ```text
        // 处理器是全局函数
        $foo->on(Foo::EVENT_HELLO, 'function_name');
        // 处理器是对象方法
        $foo->on(Foo::EVENT_HELLO, [$object, 'methodName']);
        // 处理器是静态类方法
        $foo->on(Foo::EVENT_HELLO, ['app\components\Bar', 'methodName']);
        // 处理器是匿名函数
        $foo->on(Foo::EVENT_HELLO, function ($event) {
        //事件处理逻辑
        });
        ```

<slide />

- 事件处理器顺序
    - 一个事件可以附加多个事件处理器，当事件被触发，已附加的处理器将按附加次序依次调用
    - 如果某个处理器需要停止其后的处理器调用，可以设置 $event 参数的 yii\base\Event::$handled 属性为真

        ```text
        $eventTest->on(EventTest::EVENT_HELLO, function ($event) {
            // 停止后面的处理器调用
            $event->handled = true;
        });
        ```

    - 可以通过设置 on 方法传第四个参数 false，将处理器插入到处理器队列第一位，被首先调用

        ```text
        $eventTest->on(EventTest::EVENT_HELLO, function ($event) {
        // 这个处理器将被插入到处理器队列的第一位，首先被调用
        }, null, false);
        ```

<slide />

- 触发事件
    - 事件通过调用 yii\base\Component::trigger() 方法触发
- 移除事件处理器
    - 调用 yii\base\Component::off() 方法

        ```text
        // 处理器是全局函数
        $foo->off(Foo::EVENT_HELLO, 'function_name');
        // 处理器是对象方法
        $foo->off(Foo::EVENT_HELLO, [$object, 'methodName']);
        // 处理器是静态类方法
        $foo->off(Foo::EVENT_HELLO, ['app\components\Bar', 'methodName']);
        // 处理器是匿名函数
        $foo->off(Foo::EVENT_HELLO, $anonymousFunction);
        ```

<slide />

### 行为

- 基本概念
    - 行为可以在不修改现有类的情况下扩展类的功能，将行为绑定到一个类，可以使类具有行为本身所定义的属性和方法，就好像类本来就有这些属性和方法一样，而且不需要写一个新的类去继承或包含现有类
    - Yii 中的行为，是 yii\base\Behavior 类的实例， 只要将一个 Behavior 实例绑定到任意的 yii\base\Component 实例上， 这个 Component 就可以拥有该 Behavior 所定义的属性和方法了
    - 行为只能与 Component 类绑定，所以如果要使用行为，类就要继承 yii\base\Component

<slide />

- 绑定行为
    - 静态绑定
        - 重载 yii\base\Component::behaviors() 方法

            ```text
            namespace app\models;
            use yii\db\ActiveRecord;
            use app\Components\MyBehavior;
            class User extends ActiveRecord
            {
                public function behaviors()
                {
                    return [
                        // 匿名的行为，仅直接给出行为的类名称
                        MyBehavior::className(),
                        // 名为 myBehavior2 的行为，也是仅给出行为的类名称
                        'myBehavior2' => MyBehavior::className(),
                        // 匿名行为，给出了MyBehavior类的配置数组
                        [
                            'class' => MyBehavior::className(),
                            'prop1' => 'value1',
                            'prop3' => 'value3',
                        ],
                        // 名为 myBehavior4 的行为，也是给出了 MyBehavior 类的配置数组
                        'myBehavior4' => [
                            'class' => MyBehavior::className(),
                            'prop1' => 'value1',
                            'prop3' => 'value3',
                        ]
                    ];
                }
            }
            ```

        - 配置数组

            ```text
            [
                'as myBehavior2' => MyBehavior::className(),
                'as myBehavior3' => [
                    'class' => MyBehavior::className(),
                    'prop1' => 'value1',
                    'prop3' => 'value3',
                ],
            ]
            ```

    - 动态绑定
        - 通过调用 yii\base\Compoent::attachBehavior()

            ```text
            // 附加行为对象
            $component->attachBehavior('myBehavior1', new MyBehavior);
            // 附加行为类
            $component->attachBehavior('myBehavior2', MyBehavior::className());
            // 附加配置数组
            $component->attachBehavior('myBehavior3', [
                'class' => MyBehavior::className(),
                'prop1' => 'value1',
                'prop2' => 'value2',
            ]);
            ```

        - 通过调用 yii\base\Compoent::attachBehaviors()

            ```text
            $component->attachBehaviors([
                'myBehavior1' => new MyBehavior,  // 这是一个命名行为
                MyBehavior::className(),          // 这是一个匿名行为
            ]);
            ```

<slide />

- 移除行为

    ```text
    // 移除单个行为
    $component->detachBehavior('myBehavior1');
    // 移除全部行为
    $component->detachBehaviors();
    ```

<slide />

- 行为的内部原理

    ```text
    yii\base\Component::behaviors()
    yii\base\Component::ensureBehaviors()
    yii\base\Component::attachBehaviorInternal()
    yii\base\Behavior::attach()
    __set,__get,__call
    ```

<slide />

### 配置

- Yii2 的配置文件内容
    - 基本信息配置，主要指如 id、basePath 等这些应用的基本信息，主要是一些简单的字符串
    - components 配置，配置文件的主体
    - params 配置，主要是提供一些全局参数
- 组件配置的格式

    ```text
    [
        // 数组元素表示将要创建的对象的完整类名
        'class' => 'path\to\ClassName',
        // 表示指定为 propertyName 属性的初始值为 $propertyValue
        'propertyName' => 'propertyValue',
        // 表示将 $eventHandler 绑定到对象的 eventName 事件中
        'on eventName' => $eventHandler,
        // 表示用 $behaviorConfig 创建一个行为，并注入到对象中。 这里的 $behaviroConfig 也是一个配置项
        'as behaviorName' => $behaviorConfig,
    ]
    ```

<slide />

- 配置产生作用的原理
    - 入口脚本中 $application = new yii\web\Application($config)
    - yii\base\Component::__construct($config)
    - yii\base\Application::preInit() 预处理配置项
    - yii\base\Component::__construct()
    - yii\base\Object::__construct($config)
    - Yii::configure() 对对象进行配置
    - yii\di\ServiceLocator::setComponents() 设置组件
    - yii\di\ServiceLocator::set()
- 服务定位器
    - $_components 以 key-value 形式保存组件对象
    - $_definitions 以 key-value 形式保存组件定义
- 获取配置文件中配置的组件对象
    - 通过 Yii::$app->componentName 获取
    - 调用 yii\di\ServiceLocator::__get() 方法
    - 调用 yii\di\ServiceLocator::get() 方法
    - 调用 Yii::createObject() 方法
- 配置项的本质
    - 所有的配置项目最终都是在向 Application 这个 Service Locator 注册服务

<slide />

## MVC

- Model
    - 是代表业务数据、规则和逻辑的对象
    - 继承 yii\base\Model 实现
    - 主要方法
        - rules() 当模型接收到终端用户输入的数据， 数据应当满足某种规则(称为验证规则, 也称为业务规则)
        - attributes() 定义模型属性
        - fields() 来增加、删除、重命名和重定义字段，请求 api 返回的字段就是该方法中定义的字段
    - 配合数据库工作 yii\db\ActiveRecord
        - ActiveRecord 提供了一个面向对象的接口， 用以访问和操作数据库中的数据。ActiveRecord 类与数据库表关联， ActiveRecord 实例对应于该表的一行， ActiveRecord 实例的属性表示该行中特定列的值
        - ActiveRecord 及其父类提供了 findOne，findAll，updateOne 等方法

- View
    - 视图是 MVC 模式中的一部分，它是展示数据到终端用户的代码

- Controller
    - 是继承 yii\base\Controller 类的对象，负责处理请求和生成响应，控制器从应用主体接管控制后会分析请求数据并传送到模型，传送模型结果到视图，最后生成输出响应信息

<slide />

## 请求和响应

### 路由

- 默认路由

    ```text
    http://www.test.com/index.php?r=post/view&id=100
    ```

- 美化 url

    ```text
    http://www.test.com/post/view/100
    ```

- 路由规则

    ```text
    'rules' => [
        // 为路由指定了一个别名，以 post 的复数形式来表示 post/index 路由
        'posts' => 'post/index',
        // id 是命名参数，post/100 形式的URL，其实是 post/view&id=100
        'post/<id:\d+>' => 'post/view',
        // controller action 和 id 以命名参数形式出现
        '<controller:\w->/<id:\d+>/<action:(create|update|delete)>' => '<controller>/<action>',
        // 包含了 HTTP 方法限定，仅限于DELETE方法
        'DELETE <controller:\w+>/<id:\d+>' => '<controller>/delete',
    ]
    ```

<slide />

### Url 管理

- urlManager 组件

    ```text
    'urlManager' => [
        // 是否启用 url 美化功能
        'enablePrettyUrl' => true,
        // 是否启用严格解析，如启用，要求当前请求应至少匹配 1 个路由规则，否则认为是无效路由，仅在 enablePrettyUrl 启用后才有效。
        'enableStrictParsing' => true,
         // 指定是否在URL在保留入口脚本 index.php
        'showScriptName' => false,
        // 指定续接在URL后面的一个后缀，如 .html 之类的。仅在 enablePrettyUrl 启用时有效
        'suffix' => '.html'
        // 配置的路由规则
        'rules' => [
            'PUT api/<controller:[\w-]+>/<id:>' => '<controller>/update',
            'GET api/<controller:[\w-]+>/<id:[0-9]>' => '<controller>/view',
            'DELETE api/<controller:[\w-]+>/<id:>' => '<controller>/delete',
            'POST api/<controller:[\w-]+>' => '<controller>/create',
            'GET api/<controller:[\w-]+>s' => '<controller>/index',
            'api/<controller:[\w-]+>/<action:[\w-]+>' => '<controller>/<action>',
        ],
    ],
    ```

<slide />

### 请求(Request)和响应(Response)

- yii 一次完整的请求路径
    - yii\base\Application::run() 方法中统一获取请求
    - yii\web\Application::handleRequest() 处理请求
    - yii\web\Request::resolve() 解析请求
    - yii\web\UrlManager::parseRequest() 解析请求
    - yii\base\Module::runAction() 执行 action
    - yii\base\Module::createController() 创建对应 controller 实例
    - yii\base\Controller::runAction() 方法，执行 action
    - yii\base\Controller::createAction() 创建 action 实例
    - yii\base\InlineAction::runWithParams()  执行 controller 下对应的 actionMethod

<slide />

## Restful web 服务

- 使用美化的 url 实现对增删改查

    ```text
    http://www.test.com/post/create
    http://www.test.com/post/delete/1
    http://www.test.com/post/update/1
    http://www.test.com/post/index/1
    http://www.test.com/post/view/1
    ```

<slide />

- Yii 中实现 Restful 风格 api 的步骤
    1. 创建继承自 ActiveRecord 的 model 类
    1. 创建 controller 继承 yii\rest\ActiveController，设置 $modelClass 属性

        ```text
        namespace app\controllers;
        use yii\rest\ActiveController;
        class UserController extends ActiveController
        {
            public $modelClass = 'app\models\User';
        }
        ```

    1. 配置 URL 规则
    1. 启用 JSON 输入

        ```text
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ]
        ```

<slide />

## 服务定位器和 DI 容器

- 服务定位器和 DI 容器的关系
    - 在 Yii 中，服务定位器构建与 DI 容器之上
    - 在 BaseYii 中所有的属性和方法都是静态的，包括 DI 容器 $container，所以就形成了单例模式，所有的 Service Locator （Module 和 Application）都共用这个 DI 容器
- DI 容器的引入

    ```text
    require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';
    ```

<slide />

- Application 的本质
    - 继承结构

        ```text
        class Application extends \yii\base\Application
        abstract class Application extends Module
        class Module extends ServiceLocator
        ```

    - 所以在 Yii 中，Application 本质上是服务定位器 Service Locator

<slide />

- Yii 中实例创建方法
    - Yii::createObject()

        ```text
        public static function createObject($type, array $params = [])
        {
            // 字符串，代表一个类名、接口名、别名
            if (is_string($type)) {
                // 调用 DI 容器的 get() 来获取、创建实例
                return static::$container->get($type, $params);
            // 是个数组，代表配置数组，必须含有 class 元素
            } elseif (is_array($type) && isset($type['class'])) {
                $class = $type['class'];
                unset($type['class']);
                return static::$container->get($class, $params, $type);
            // 是个 PHP callable 则调用其返回一个具体实例
            } elseif (is_callable($type, true)) {
                return static::$container->invoke($type, $params);
            } elseif (is_array($type)) {
                throw new InvalidConfigException('Object configuration must be an array containing a "class" element.');
            }
            throw new InvalidConfigException('Unsupported configuration type');
        }
        ```

    - yii\di\Container::get()
- Yii中所有的实例（除了 Application，DI 容器自身等入口脚本中实例化的），都是通过 DI 容器来获取的

<slide />

## FAQ

### 如何安装 Composer？

```shell
sudo wget -qO /usr/local/bin/composer https://mirrors.aliyun.com/composer/composer.phar
sudo chmod 755 /usr/local/bin/composer
```

### 如何解决 Composer 安装 Yii2 慢？

```shell
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

### 如何安装 MongoDB 的 PHP driver？

```shell
sudo apt-get install php-mongodb
```

### 写了接口，Postman 为何调不通？

- 检查接口名，controller、action 名字是否拼错。
- 检查 URL 规则是否配置正确。
