# Express 5 移行計画

Express Sweet を Express 4.21.2 から Express 5.2.1 へ移行

---

## 移行概要

**Express 5 リリース情報**
- リリース日: 2024年10月15日
- 必須要件: Node.js 18以上
- バージョン: 5.2.1

**このプロジェクトへの影響**
- すべての破壊的変更を確認済み → 該当なし
- `req.xhr` は Express 5 でも使用可能
- ミドルウェア実装は Express 5 互換
- Promise 自動処理の恩恵を受ける

**必要な対応**
1. `express.urlencoded` の `extended` オプションをデフォルト `false` → 明示的に `true` 設定
2. `query parser: 'extended'` 設定で nested query object サポート
3. `multer().none()` 追加で multipart/form-data サポート
4. `assert` → `with` 構文へ変更（rollup.config.js）

---

## 実施済み作業

### 依存パッケージ更新
- express: `4.21.2` → `5.2.1`
- @types/express: Express 5対応版
- builtin-modules: `^5.0.0` (devDependencies)
- express-handlebars: `7.1.3` のまま維持（v8 は Node.js 20+ 必須のため）

### コード修正
- `src/middlewares/Http.ts`: `query parser: 'extended'` 設定追加
- `src/middlewares/Http.ts`: `multer().none()` 追加
- `rollup.config.js`: `assert` → `with` 構文へ変更
- すべての破壊的変更を検索 → 該当コードなし

### テスト完了
- ビルドテスト成功
- 基本ルーティング、認証フロー、ファイルアップロード、ビューレンダリング、CORS、エラーハンドリング
- サンプルアプリケーション動作確認（CJS/ESM）

### ドキュメント更新
- CHANGELOG.md: v4.0.0 セクション追加
- README.md: Express 5 サポート、collapsible sections、Migration Guide
- docs-src/getting-started.md: Express 5 Support、Route Patterns with RegExp、Migration Guide
- express-sweet-generator: CHANGELOG.md、README.md、templates（regex pattern、logging skip）
- package.json: engines フィールド追加 `"node": ">=18.0.0"`

---

## リリース手順

### v4.0.0 リリース
- [ ] package.json バージョンを 4.0.0 に更新
- [ ] TypeDoc ドキュメント生成
- [ ] ビルド実行
- [ ] Git コミット
- [ ] Git タグ作成 (`v4.0.0`)
- [ ] GitHub プッシュ
- [ ] npm publish (express-sweet)
- [ ] npm publish (express-sweet-generator)

詳細手順は [release-procedure.md](release-procedure.md) 参照

---

## ユーザーへの影響

**破壊的変更**
- Node.js 18+ 必須
- ルートパターンで正規表現使用時は RegExp + named capture groups 必須

**非互換性なし**
- Express Sweet のデフォルト実装は影響なし
- `req.xhr` は Express 5 でも使用可能

**ロールバック**
- 問題発生時は npm で v3.x へダウングレード可能

---

## 参考資料

- [Express 5 Migration Guide（日本語）](https://expressjs.com/ja/guide/migrating-5.html)
- [Express 5 Changelog](https://github.com/expressjs/express/blob/5.0/History.md)
