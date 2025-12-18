# Troubleshooting

開発中に遭遇した問題と解決方法

---

## 不正な Host ヘッダーによる ERR_INVALID_URL エラー (2025-12-18)

### エラー

```
TypeError [ERR_INVALID_URL]: Invalid URL
    at new URL (node:internal/url:641:5)
```

### 原因

[src/middlewares/localVars.ts](../src/middlewares/localVars.ts) で、不正な Host ヘッダー値が `new URL()` に渡されるとエラーが発生：

```bash
curl -H "Host: invalid host name!" http://localhost:3000/api/items
```

### 対応（実装済み）

`new URL()` を try-catch で囲み、エラー時は以下のように処理

- `currentPath`: `req.originalUrl` から手動でパスを抽出
- `baseUrl`: `undefined` を設定し、`rewrite_base_url` フックまたはテンプレートの `{{#if baseUrl}}` チェックでクライアント側が対応
