# Mysql

## sql语句记录。

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

- 查看建表语句

```sql
SHOW CREATE TABLE table_name;
```

- 查看表结构

```sql
DESCRIBE table_name;
# 或者：
SHOW COLUMNS FROM table_name;
```

- 删除字段

使用 ALTER TABLE 语句删除指定的字段。以下是删除 attr 字段的语法：
```sql
ALTER TABLE table_name DROP COLUMN attr;
```

- 添加字段

```sql
ALTER TABLE table_name ADD COLUMN new_column_name column_type;
```

- 修改字段类型

```sql
ALTER TABLE table_name MODIFY COLUMN column_name new_column_type;
```

- 删除整个表（包括表结构和数据）

```sql
DROP TABLE table_name;

DROP TABLE table_name1, table_name2;

# 在删除表之前，先检查表是否存在，避免错误操作。
DROP TABLE IF EXISTS users;
```

- 删除数据

```sql
DELETE FROM table_name WHERE id IN (1, 2);
```

- 清楚数据

`DELETE` 语句：

优点：可以逐行删除数据，触发触发器，支持事务。

缺点：性能较慢，特别是对于大表。

`TRUNCATE TABLE` 语句：

优点：速度快，不会逐行删除数据，不触发触发器，自动重置自增主键。

缺点：不支持事务回滚，不会触发触发器。

`DROP TABLE` 和重新创建表：

优点：完全重置表，简单粗暴。

缺点：需要重新创建表结构，可能会丢失表结构定义和索引。

```sql
DELETE FROM users;

TRUNCATE TABLE users;

DROP TABLE users;
```
