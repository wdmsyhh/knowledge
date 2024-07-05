# Mysql

## sql语句记录

- 添加新的 JSON 字段
如果你想在现有 JSON 文档中添加新的字段，可以使用 JSON_SET 函数。例如：

```sql
UPDATE order_goods
SET attr = JSON_SET(attr, '$.new_field', 'new_value')
WHERE goods_id = '12345';
```

- 删除 JSON 字段
你可以使用 JSON_REMOVE 函数来删除 JSON 字段。例如：

```sql
UPDATE order_goods
SET attr = JSON_REMOVE(attr, '$.details.size')
WHERE goods_id = '12345';
```

- 更新嵌套字段
假设你的 JSON 结构更加复杂，例如：

```json
{
  "details": {
    "color": "red",
    "size": "large"
  }
}
```
要更新嵌套字段 details.color，可以使用以下 SQL 语句：

```sql
UPDATE order_goods
SET attr = JSON_SET(attr, '$.details.color', 'blue')
WHERE goods_id = '12345';
```

- 更新json类型中的指定字段

```sql
UPDATE collect_goods
SET attr = JSON_SET(COALESCE(attr, '{}'), '$.prize_image', 'test/crm/collect/card/202407/1720171308777.png')
WHERE id = 100000;
```