### Reference

#### ejs

- [medium article: Master EJS template engine with Node.js and Expressjs](https://medium.com/swlh/master-ejs-template-engine-with-node-js-and-expressjs-979cc22b69be)

#### typeorm

- すでにプロジェクトを作っている： `typeorm init --database [your-favorite-database]`
- want to create new project: `typeorm init --name MyProject --database [your-favorite-database]`
- `entity` を変更するとデータベースのテーブルも変更してしまう。レコードがあろうと entity を変更して実行するたびにデータベースのテーブルが変更されます。`ormconfig.json` の `synchronize` を `false` にする。（特に production）変わりに「Entity を作る → migration ファイルの生成 → migration ファイルの実行」という流れを行う。
- `ormconfig.json` is the default. if you want to switch bt dev and prod then use `ormconfig.js` and `export.default = ...`

# ts

- Property '…' has no initializer and is not definitely assigned in the constructor
  : https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
