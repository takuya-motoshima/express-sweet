# Release Procedure for v4.0.0

express-sweet と express-sweet-generator の v4.0.0 リリース手順

---

## express-sweet のリリース手順

### 前提条件

- Node.js 18.20.8 インストール済み
- フィーチャーブランチが main にマージ済み
- ローカルで main ブランチの最新状態を取得済み (`git checkout main && git pull origin main`)
- express-sweet プロジェクトのルートディレクトリにいること

### 1. バージョンアップ

```bash
npm version 4.0.0 --no-git-tag-version
```

`--no-git-tag-version`: Git タグとコミットを自動作成しないオプション。後の手順でビルド成果物を含めてコミットするため、ここでは package.json のバージョンのみを更新する。

### 2. ドキュメント生成

```bash
npm run docs:build
```

新しいバージョン（4.0.0）が `docs/` 配下の TypeDoc ドキュメントに反映される

### 3. ビルド

```bash
npm run build
```

### 4. 変更をコミット

```bash
git add .
git commit -m "$(cat <<'EOF'
Release v4.0.0

Breaking Changes:
- Middleware architecture refactored from class-based to function-based
  All middleware components now follow Express.js naming conventions (2-word composition pattern)
- Upgraded from Express 4.21.2 to Express 5.2.1
- Requires Node.js 18.x or higher
- Route patterns with regex parameters no longer support /:param(\d+) syntax
  Use RegExp with named capture groups instead: /^\/(?<userId>\d+)$/

Middleware Name Changes:
- CORS → corsPolicy
- Environment → envLoader
- ErrorHandler → errorHandler
- Http → requestParser
- Local → localVars
- Router → routeMapper
- View → viewEngine
- Authentication → passportAuth
- Global → globalVars

Note: These are internal changes that do not affect the public API.
The mount() function handles all middleware automatically.

Express 5 Compatibility Updates:
- Added query parser: 'extended' setting in HTTP middleware to maintain Express 4 query parsing behavior
  Solves [Object: null prototype] issue with nested query objects
- Added multer().none() middleware to parse multipart/form-data requests without files

Dependencies:
- express: 4.21.2 → 5.2.1
- express-handlebars: 6.0.7 → 7.1.3
- Added builtin-modules: ^5.0.0 (devDependencies)
- Added body-parser: ^2.2.1

See CHANGELOG.md for full details.
EOF
)"
```

### 5. Git タグ作成とプッシュ

```bash
git tag v4.0.0
git push origin main
git push origin v4.0.0
```

### 6. npm にパブリッシュ

```bash
npm publish
```

### 7. リリース後の確認

1. **npm パッケージページ確認**
   - https://www.npmjs.com/package/express-sweet
   - バージョンが 4.0.0 になっているか
   - README が正しく表示されるか

2. **GitHub リリースページ確認**
   - https://github.com/takuya-motoshima/express-sweet/releases
   - タグ v4.0.0 が作成されているか

3. **TypeDoc ドキュメント確認**
   - https://takuya-motoshima.github.io/express-sweet/
   - バージョンが 4.0.0 になっているか

---

## express-sweet-generator のリリース手順

### 前提条件

- Node.js 18.20.8 インストール済み
- フィーチャーブランチが main にマージ済み
- ローカルで main ブランチの最新状態を取得済み (`git checkout main && git pull origin main`)
- express-sweet-generator プロジェクトのルートディレクトリにいること
- **express-sweet v4.0.0 が npm に公開済みであること**

### 1. バージョンアップ

```bash
npm version 4.0.0 --no-git-tag-version
```

`--no-git-tag-version`: Git タグとコミットを自動作成しないオプション。後の手順でコミットメッセージを手動で設定するため、ここでは package.json のバージョンのみを更新する。

### 2. 変更をコミット

```bash
git add .
git commit -m "$(cat <<'EOF'
Release v4.0.0

Breaking Changes:
- Updated express-sweet dependency from v3.0.1 to v4.0.0
  Includes middleware architecture refactoring (class-based to function-based)
  See express-sweet CHANGELOG for detailed breaking changes
- Generated applications now use Express 5.2.1
- Requires Node.js 18.x or higher

Template Updates:
- Updated route path patterns to Express 5 syntax in routes/api/users.js (CJS and ESM)
  Changed /:userId(\d+) to /^\/(?<userId>\d+)$/ using named capture groups
- Added file upload configuration (config/upload.js) for Multer middleware
- Added logging skip function to exclude /build/ and /upload/ static files from logs

Dependencies:
- express: 4.21.2 → 5.2.1
- express-sweet: 3.0.1 → 4.0.0
- express-handlebars: 6.0.7 → 7.1.3

Note: express-sweet v4.0.0 changes are internal and do not affect
standard usage through the mount() function.

See CHANGELOG.md for full details.
EOF
)"
```

### 3. Git タグ作成とプッシュ

```bash
git tag v4.0.0
git push origin main
git push origin v4.0.0
```

### 4. npm にパブリッシュ

```bash
npm publish
```

### 5. リリース後の確認

1. **npm パッケージページ確認**
   - https://www.npmjs.com/package/express-sweet-generator
   - バージョンが 4.0.0 になっているか
   - README が正しく表示されるか

2. **GitHub リリースページ確認**
   - https://github.com/takuya-motoshima/express-sweet-generator/releases
   - タグ v4.0.0 が作成されているか

---

## トラブルシューティング

### npm publish が失敗した場合

- npm にログインしているか確認: `npm whoami`
- ログインしていない場合: `npm login`
- バージョンが既に存在しないか確認

### Git タグを間違えた場合

```bash
# ローカルタグ削除
git tag -d v4.0.0

# リモートタグ削除（プッシュ済みの場合）
git push origin :refs/tags/v4.0.0
```

---

## 完了チェックリスト

すべての手順完了後の確認項目

- ✓ express-sweet v4.0.0 が npm に公開済み
- ✓ express-sweet-generator v4.0.0 が npm に公開済み
- ✓ 両プロジェクトの GitHub に v4.0.0 タグがプッシュ済み
- ✓ TypeDoc ドキュメントに新しいバージョンが表示済み
