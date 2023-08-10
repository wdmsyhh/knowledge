# Mongodb

## 事务中不能进行表的创建工作

- 也就是说在事物中的操作前提是表提前存在，不然会有一下报错：

Cannot create namespace portal-tenants-shared.ec.storedValueAccount in multi-document transaction

## Aggregate 使用

- 统计订单总金额、订单总数、买家数

数据:

```json
/* 1 */
{
    "_id" : ObjectId("64b4e33d5bca2c187bc87620"),
    "memberId" : "a",
    "amount" : 10,
    "number" : "123"
}

/* 2 */
{
    "_id" : ObjectId("64b4e35e5bca2c187bc87633"),
    "memberId" : "a",
    "amount" : 5,
    "number" : "124"
}

/* 3 */
{
    "_id" : ObjectId("64b4e3825bca2c187bc8763b"),
    "memberId" : "b",
    "amount" : 15,
    "number" : "125"
}

/* 4 */
{
    "_id" : ObjectId("64b4e3905bca2c187bc8763f"),
    "memberId" : "b",
    "amount" : 20,
    "number" : "126"
}
```

统计脚本：

```shell
db.getCollection("order").aggregate([
{
    "$match": {}
},
{
    "$group": {
        "_id": "$memberId",
        "amount": {"$sum": "$amount"},
        "orderCount": {"$sum": 1},
     }
},
{
    "$group": {
        "_id": "",
        "memberCount": {"$sum": 1},
        "totalAmount": {"$sum": "$amount"},
        "totalOrderCount": {"$sum": "$orderCount"}
     }
}
])
```
