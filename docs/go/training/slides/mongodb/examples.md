title: MongoDB 示例
speaker: Robin Cai

<slide />

# MongoDB 示例

Robin Cai

<slide />

## 批量生成一些数据以备测试用

```js
var genTags = function () {
    var tagTable = 'ABCDEFGHIJ';
    var tags = [];
    for (var i = 0; i < 3; i++) {
        var tag = tagTable[parseInt(Math.random() * 100) % 10];
        if (tags.indexOf(tag) >= 0)  {
            continue;
        }
        tags.push(tag);
    }
    return tags;
};

// 后接下一页幻灯片
```

<slide />

```js
// 接上一页幻灯片

for (var index = 1; index <= 10; index++) {
    var key = 10000 + index;
    var age = parseInt(Math.random() * 100);
    var doc = {
        name: 'Name_' + key,
        phone: '133123' + key,
        number: key + '',
        age: age,
        tags: genTags(),
        socials: [
            {
                channel: 'channel_id_1',
                channelName: 'channel_name_1',
                openId: 'open_id_1_' + key,
            },
        ],
        createdAt: new Date(),
    }
    db.member.insert(doc);
}
```

<slide />

## 增删改查操作

<slide />

### 查找-条件匹配符

- `$eq`， `$gt`， `$gte`， `$lt`， `$lte`， `$ne`， `$in`， `$nin`

<slide />

```js
// $gte 的使用
db.member.find({
    age: {
        $gte: 20,
    },
}, {
    age: 1,
});
```

<slide />

```js
// $gte 和 $lt 一同使用
db.member.find({
    age: {
        $gte: 20,
        $lt: 40,
    },
}, {
    age: 1,
});
```

<slide />

```js
// $in 的使用
db.member.find({
    age: {
        $in: [23, 24, 25, 26],
    },
}, {
    age: 1,
});
```

<slide />

### 查找-逻辑操作符

- `$or`, `$and`, `$not`, `$nor`

<slide />

```js
// $or 的使用
db.member.find({
    $or: [
        {
            age: {
                $gte: 40,
                $lt: 60,
            },
        }, {
            tags: 'A',
        },
    ],
}).pretty();
```

<slide />

```js
// $and 的使用
db.member.find({
    age: {
        $gte: 20,
        $lt: 60,
    },
    tags: 'B',
}).pretty();

db.member.find({
    $and: [
        {
            age: {
                $gte: 20,
                $lt: 60,
            },
        },{
            tags: 'B',
        },
    ],
}).pretty();
```

<slide />

```js
// 用 $elemMatch 匹配对象数组中的元素
db.member.find({
    socials: {
        $elemMatch: {
            channel: 'channel_id_1',
            openId: 'open_id_1_10002',
        },
    },
}).pretty();
```

<slide />

```js
// 用 $elemMatch 更新对象数组中的对应元素
db.member.update({
    socials: {
        $elemMatch: {
            channel: 'channel_id_2',
            openId: 'open_id_2_10002',
        },
    },
}, {
    $set: {
        'socials.$.openId': 'open_id_2_10002_x',
    },
});
```

<slide />

### 更新数据

```js
// $set 更新一个字段值
db.member.update({
    phone: '13312310001',
}, {
    $set: {
        name: '0001',
    },
});
```

<slide />

```js
// $push 在数组中增加一个元素
db.member.update({
    phone: '13312310001',
}, {
    $push: {
        tags: 'X',
    },
});
```

<slide />

```js
// $push 在对象数组中增加一个对象元素
db.member.update({
    phone: '13312310001',
}, {
    $push: {
        socials: {
            channel: 'channel_id_3',
            channelName: 'channel_name_3',
            openId: 'open_id_3_pushed',
        },
    },
});
```

<slide />

## 使用 JavaScript 脚本

- 用客户手机号按一定规则生成渠道唯一身份信息，并添加到 socials 中
- `{$gt: ''}` 可以有效排除掉文档中无 phone 字段、`phone: null`、`phone: ''` 这三种数据
- 注：视频在这里中有口误。`$gt` 是大于，说成了大于等于

<slide />

```js
var genMixPhone = function(phone) {
    var encryptKey = 'xxx';
    return hex_md5(phone + encryptKey);
};

var cursor = db.member.find({
    phone: {$gt: ''},
});
cursor.forEach(function(doc) {
    var mixPhone = genMixPhone(doc.phone);
    var newSocial = {
        channel: 'channel_id_3',
        channelName: 'channel_name_3',
        openId: mixPhone,
    };
    doc.socials.push(newSocial);
    db.member.save(doc);
});
```

<slide />

## aggregation 演示

```js
// stage 功能演示用例
db.member.aggregate([
    {$match: {age: {$gt: 30}}},
    {$project: {tags: 1, age: 1}},
    {$unwind: '$tags'},
    {$group: {
        _id: '$tags',
        sumAge: {$sum: '$age'},
        count: {$sum: 1},
        avgAge: {$avg: '$age'},
    }},
]);
```

<slide />

```js
// 按年龄段统计出身份信息
db.member.aggregate([
    {$project: {
        ageLevel: {$floor: {$divide: ['$age', 10]}},
        name: 1,
        phone: 1,
    }},
    {$group: {
        _id: '$ageLevel',
        phones: {$push: {
            phone: '$phone',
            memberId: '$_id',
            name: '$name',
        }},
    }},
    {$sort: {$_id: 1}},
]);
```
