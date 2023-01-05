title: Swagger
speaker: Isaac Han

<slide />

# Vue.js

Isaac Han

# Swagger

## What Is Swagger

[Swagger Homepage](https://swagger.io/)

> Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.

## Why Swagger

- 统一、友好的接口文档
- 在线访问、实时更新
- 在线测试

## Get Started

1. `git clone https://github.com/swagger-api/swagger-ui.git`
1. `cd swagger-ui/dist`
1. `python -m SimpleHTTPServer`
1. Open http://localhost:8000/

## Sample

**注意：** 我们使用的是 Swagger 2.0，和 OpenAPI 3.0 有区别

```yml
swagger: "2.0"
info:
  title: Swagger 演示
  version: 1.0.0
host: staging-business-api.quncrm.com
basePath: /modules
schemes:
  - https
securityDefinitions:
  accountId:
    description: 租户唯一标识
    type: apiKey
    name: x-account-id
    in: header
  accessToken:
    description: 用户令牌
    type: apiKey
    name: x-access-token
    in: header
security:
  - accountId: []
  - accessToken: []
paths:
  /implcommon/languages:
    get:
      summary: 获取语言列表
      tags:
        - 语言
      responses:
        200:
          description: OK
          schema:
            $ref: '#/definitions/Language'
    post:
      summary: 新建语言
      tags:
        - 语言
      parameters:
        - in: body
          name: body
          schema:
            $ref: '#/definitions/LanguageRequest'
      responses:
        200:
          description: OK
          schema:
            $ref: '#/definitions/Language'
definitions:
  Language:
    type: object
    properties:
      id:
        type: string
      name:
        type: string
      code:
        type: integer
  LanguageRequest:
    type: object
    properties:
      name:
        type: string
      code:
        type: string
```

## Setup

- 在 VSCode 中安装扩展 `Swagger Viewer`
- 在 VSCode settings.json 中添加

  ```json
  "swaggerViewer.previewInBrowser": true,
  "yaml.schemas": {
    "http://json.schemastore.org/swagger-2.0": "**/api/*.yml",
  }
  ```

## YAML

[The Official YAML Web Site](https://yaml.org/)

> YAML is a human friendly data serialization standard for all programming languages.

### Sample

```yml
key: value

object:
  foo: bar

list:
  - foo
  - bar

object_list:
  - id: '5da9378d931f813371051426'
    name: 中文
    order: 1
  - id: '5da55e5175e82d0d101268e6'
    name: Français
    order: 2
```

## References

- [Swagger 2.0 文档](https://swagger.io/docs/specification/2-0/what-is-swagger/)
- [Swagger Editor Live Demo](https://editor.swagger.io/)
