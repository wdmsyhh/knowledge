# ES

- 在 Elasticsearch 中，要查询某个字段是否存在于字符串数组中，你可以使用 terms 查询，结合 bool 查询和 must 条件来实现。

以下是一个示例查询的结构：

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "terms": {
            "your_field_name": ["value1", "value2", "value3"]
          }
        }
      ]
    }
  }
}
```
